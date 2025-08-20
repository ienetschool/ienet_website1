import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  User,
  Building,
  MessageCircle,
  Download,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt?: string;
}

function EnquiryDetails({ enquiry, onClose }: { enquiry: Enquiry; onClose: () => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(enquiry.status);

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      apiRequest('PATCH', `/api/enquiries/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/enquiries'] });
      toast({
        title: "Success",
        description: "Enquiry status updated successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update enquiry status",
        variant: "destructive",
      });
    },
  });

  const handleStatusUpdate = () => {
    updateStatusMutation.mutate({ id: enquiry.id, status });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-lg">{enquiry.name}</h3>
          <div className="space-y-2 mt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="w-4 h-4 mr-2" />
              {enquiry.email}
            </div>
            {enquiry.phone && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                {enquiry.phone}
              </div>
            )}
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(enquiry.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="text-right">
          <Badge variant={enquiry.status === 'new' ? 'destructive' : 'default'}>
            {enquiry.status}
          </Badge>
          {enquiry.serviceInterest && (
            <div className="mt-2">
              <Badge variant="outline">{enquiry.serviceInterest}</Badge>
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Message</h4>
        <div className="bg-muted p-3 rounded-md text-sm">
          {enquiry.message}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleStatusUpdate} 
            disabled={updateStatusMutation.isPending}
            size="sm"
          >
            {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
          </Button>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export function EnquiriesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const { toast } = useToast();

  const { data: enquiries, isLoading } = useQuery<Enquiry[]>({
    queryKey: ['/api/enquiries'],
  });

  const exportEnquiriesMutation = useMutation({
    mutationFn: () => apiRequest('GET', '/api/dashboard/export/leads'),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Enquiries exported successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to export enquiries",
        variant: "destructive",
      });
    },
  });

  const filteredEnquiries = enquiries?.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusBadge = (status: string) => {
    const variants = {
      new: "destructive",
      contacted: "secondary", 
      qualified: "default",
      closed: "outline",
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enquiries Management</h2>
          <p className="text-muted-foreground">Manage customer enquiries and leads</p>
        </div>
        <Button
          data-testid="button-export-enquiries"
          onClick={() => exportEnquiriesMutation.mutate()}
          disabled={exportEnquiriesMutation.isPending}
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enquiries</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enquiries?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enquiries?.filter(e => e.status === 'new').length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enquiries?.filter(e => ['contacted', 'qualified'].includes(e.status)).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enquiries?.filter(e => e.status === 'closed').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              All Enquiries ({filteredEnquiries.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  data-testid="input-search-enquiries"
                  placeholder="Search enquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredEnquiries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Service Interest</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium">{enquiry.name}</TableCell>
                    <TableCell>{enquiry.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{enquiry.serviceInterest || 'General'}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                    <TableCell>
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            data-testid={`button-view-enquiry-${enquiry.id}`}
                            onClick={() => setSelectedEnquiry(enquiry)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Enquiry Details</DialogTitle>
                            <DialogDescription>
                              View and manage this customer enquiry
                            </DialogDescription>
                          </DialogHeader>
                          {selectedEnquiry && (
                            <EnquiryDetails 
                              enquiry={selectedEnquiry} 
                              onClose={() => setSelectedEnquiry(null)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No enquiries found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? 'No enquiries match your search criteria.' 
                  : 'No customer enquiries yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}