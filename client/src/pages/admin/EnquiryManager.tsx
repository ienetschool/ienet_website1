import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Building, Eye } from "lucide-react";

export default function EnquiryManager() {
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: enquiries, isLoading } = useQuery({
    queryKey: ['/api/admin/enquiries', statusFilter === 'all' ? undefined : statusFilter],
    queryFn: () => {
      const url = statusFilter === 'all' ? '/api/admin/enquiries' : `/api/admin/enquiries?status=${statusFilter}`;
      return fetch(url, { credentials: 'include' }).then(res => res.json());
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PUT", `/api/admin/enquiries/${id}`, { 
        status,
        respondedAt: status === 'contacted' ? new Date() : undefined 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/enquiries'] });
      toast({ title: "Enquiry status updated successfully!" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Failed to update enquiry status",
        variant: "destructive",
      });
    },
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'qualified':
        return 'outline';
      case 'closed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const filteredEnquiries = enquiries || [];
  const newEnquiries = enquiries?.filter((e: any) => e.status === 'new') || [];
  const contactedEnquiries = enquiries?.filter((e: any) => e.status === 'contacted') || [];
  const qualifiedEnquiries = enquiries?.filter((e: any) => e.status === 'qualified') || [];
  const closedEnquiries = enquiries?.filter((e: any) => e.status === 'closed') || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{newEnquiries.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">New</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{contactedEnquiries.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contacted</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{qualifiedEnquiries.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Qualified</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">{closedEnquiries.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Closed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enquiries List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Customer Enquiries</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading enquiries...</p>
          ) : (
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All ({filteredEnquiries.length})</TabsTrigger>
                <TabsTrigger value="new">New ({newEnquiries.length})</TabsTrigger>
                <TabsTrigger value="contacted">Contacted ({contactedEnquiries.length})</TabsTrigger>
                <TabsTrigger value="qualified">Qualified ({qualifiedEnquiries.length})</TabsTrigger>
                <TabsTrigger value="closed">Closed ({closedEnquiries.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <EnquiryList 
                  enquiries={filteredEnquiries} 
                  onSelect={setSelectedEnquiry}
                  onUpdateStatus={updateStatusMutation.mutate}
                  isUpdating={updateStatusMutation.isPending}
                />
              </TabsContent>
              <TabsContent value="new">
                <EnquiryList 
                  enquiries={newEnquiries} 
                  onSelect={setSelectedEnquiry}
                  onUpdateStatus={updateStatusMutation.mutate}
                  isUpdating={updateStatusMutation.isPending}
                />
              </TabsContent>
              <TabsContent value="contacted">
                <EnquiryList 
                  enquiries={contactedEnquiries} 
                  onSelect={setSelectedEnquiry}
                  onUpdateStatus={updateStatusMutation.mutate}
                  isUpdating={updateStatusMutation.isPending}
                />
              </TabsContent>
              <TabsContent value="qualified">
                <EnquiryList 
                  enquiries={qualifiedEnquiries} 
                  onSelect={setSelectedEnquiry}
                  onUpdateStatus={updateStatusMutation.mutate}
                  isUpdating={updateStatusMutation.isPending}
                />
              </TabsContent>
              <TabsContent value="closed">
                <EnquiryList 
                  enquiries={closedEnquiries} 
                  onSelect={setSelectedEnquiry}
                  onUpdateStatus={updateStatusMutation.mutate}
                  isUpdating={updateStatusMutation.isPending}
                />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {/* Enquiry Detail Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={() => setSelectedEnquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Contact Information</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-500" />
                      <span className="text-sm">{selectedEnquiry.email}</span>
                    </div>
                    {selectedEnquiry.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone size={16} className="text-gray-500" />
                        <span className="text-sm">{selectedEnquiry.phone}</span>
                      </div>
                    )}
                    {selectedEnquiry.company && (
                      <div className="flex items-center space-x-2">
                        <Building size={16} className="text-gray-500" />
                        <span className="text-sm">{selectedEnquiry.company}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Project Details</h4>
                  <div className="space-y-1">
                    <div>
                      <span className="text-sm font-medium">Service: </span>
                      <span className="text-sm">{selectedEnquiry.serviceInterest}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Budget: </span>
                      <span className="text-sm">{selectedEnquiry.budgetRange}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Submitted: </span>
                      <span className="text-sm">{new Date(selectedEnquiry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h4 className="font-semibold mb-2">Message</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm">{selectedEnquiry.message}</p>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={getStatusBadgeVariant(selectedEnquiry.status)}>
                    {selectedEnquiry.status}
                  </Badge>
                </div>
                <Select 
                  value={selectedEnquiry.status} 
                  onValueChange={(status) => {
                    updateStatusMutation.mutate({ id: selectedEnquiry.id, status });
                    setSelectedEnquiry({ ...selectedEnquiry, status });
                  }}
                >
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
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EnquiryList({ 
  enquiries, 
  onSelect, 
  onUpdateStatus, 
  isUpdating 
}: { 
  enquiries: any[]; 
  onSelect: (enquiry: any) => void;
  onUpdateStatus: (params: { id: number; status: string }) => void;
  isUpdating: boolean;
}) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'qualified':
        return 'outline';
      case 'closed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (enquiries.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400 py-8">
        No enquiries found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {enquiries.map((enquiry: any) => (
        <div key={enquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold">{enquiry.name}</h3>
              <Badge variant={getStatusBadgeVariant(enquiry.status)}>
                {enquiry.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{enquiry.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {enquiry.serviceInterest} • {enquiry.budgetRange}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(enquiry.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => onSelect(enquiry)}>
              <Eye size={16} />
            </Button>
            <Select 
              value={enquiry.status} 
              onValueChange={(status) => onUpdateStatus({ id: enquiry.id, status })}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
}
