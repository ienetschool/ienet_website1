import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  ChevronUp,
  ChevronDown,
  Download,
  Trash2,
  Edit,
  Eye,
  MoreHorizontal,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date' | 'number';
  filterOptions?: Array<{ value: string; label: string }>;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  endpoint: string;
  columns: Column[];
  title?: string;
  searchable?: boolean;
  exportable?: boolean;
  batchActions?: boolean;
  rowActions?: Array<{
    label: string;
    icon?: React.ComponentType<any>;
    onClick: (row: any) => void;
    variant?: 'default' | 'destructive';
  }>;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
}

interface DataTableResponse {
  data: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function DataTable({
  endpoint,
  columns,
  title,
  searchable = true,
  exportable = false,
  batchActions = false,
  rowActions = [],
  onEdit,
  onDelete,
  onView
}: DataTableProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Build query parameters
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    
    if (search) params.set('search', search);
    if (sortColumn) {
      params.set('sort', sortColumn);
      params.set('dir', sortDirection);
    }
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.set(`filters[${key}]`, value);
      }
    });
    
    return params.toString();
  }, [page, limit, search, sortColumn, sortDirection, filters]);

  // Fetch data
  const { data: response, isLoading, error, refetch } = useQuery<DataTableResponse>({
    queryKey: [endpoint, queryParams],
    queryFn: () => apiRequest('GET', `${endpoint}?${queryParams}`),
    keepPreviousData: true,
  });

  // Export mutation
  const exportMutation = useMutation({
    mutationFn: (format: 'csv' | 'excel' | 'json') => 
      apiRequest('GET', `${endpoint}/export?${queryParams}&format=${format}`),
    onSuccess: (data, format) => {
      // Create download link
      const blob = new Blob([data], { 
        type: format === 'json' ? 'application/json' : 'text/csv' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `export_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: `Data exported as ${format.toUpperCase()}`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive",
      });
    }
  });

  // Batch delete mutation
  const batchDeleteMutation = useMutation({
    mutationFn: (ids: string[]) => 
      apiRequest('DELETE', `${endpoint}/batch`, { ids }),
    onSuccess: () => {
      setSelectedRows(new Set());
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      toast({
        title: "Success",
        description: "Selected items deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete selected items",
        variant: "destructive",
      });
    }
  });

  const handleSort = (columnKey: string) => {
    if (!columns.find(col => col.key === columnKey)?.sortable) return;
    
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
    setPage(1);
  };

  const handleFilter = (columnKey: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSelectRow = (rowId: string) => {
    setSelectedRows(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(rowId)) {
        newSelection.delete(rowId);
      } else {
        newSelection.add(rowId);
      }
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (!response?.data) return;
    
    if (selectedRows.size === response.data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(response.data.map(row => row.id)));
    }
  };

  const renderCell = (column: Column, row: any) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    // Default rendering based on value type
    if (typeof value === 'boolean') {
      return <Badge variant={value ? 'default' : 'secondary'}>{value ? 'Yes' : 'No'}</Badge>;
    }
    
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    
    if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
      return new Date(value).toLocaleDateString();
    }
    
    return value?.toString() || '';
  };

  const renderRowActions = (row: any) => {
    const actions = [];
    
    if (onView) actions.push({ label: 'View', icon: Eye, onClick: () => onView(row) });
    if (onEdit) actions.push({ label: 'Edit', icon: Edit, onClick: () => onEdit(row) });
    if (onDelete) actions.push({ 
      label: 'Delete', 
      icon: Trash2, 
      onClick: () => onDelete(row),
      variant: 'destructive' as const
    });
    
    actions.push(...rowActions);
    
    if (actions.length === 0) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => action.onClick(row)}
              className={action.variant === 'destructive' ? 'text-red-600' : ''}
            >
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load data. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            {title}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              className="ml-2"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {batchActions && selectedRows.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => batchDeleteMutation.mutate(Array.from(selectedRows))}
                disabled={batchDeleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedRows.size})
              </Button>
            )}
            
            {exportable && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => exportMutation.mutate('csv')}>
                    Export CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportMutation.mutate('excel')}>
                    Export Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => exportMutation.mutate('json')}>
                    Export JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          {searchable && (
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          )}
          
          {columns.filter(col => col.filterable).map(column => (
            <div key={column.key} className="min-w-[150px]">
              {column.filterType === 'select' && column.filterOptions ? (
                <Select
                  value={filters[column.key] || ''}
                  onValueChange={(value) => handleFilter(column.key, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Filter ${column.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All {column.label}</SelectItem>
                    {column.filterOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  placeholder={`Filter ${column.label}`}
                  value={filters[column.key] || ''}
                  onChange={(e) => handleFilter(column.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {batchActions && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={response?.data && selectedRows.size === response.data.length}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                )}
                
                {columns.map(column => (
                  <TableHead 
                    key={column.key}
                    className={column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.label}</span>
                      {column.sortable && sortColumn === column.key && (
                        sortDirection === 'asc' ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                ))}
                
                {(rowActions.length > 0 || onView || onEdit || onDelete) && (
                  <TableHead className="w-12">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }, (_, i) => (
                  <TableRow key={i}>
                    {batchActions && <TableCell><div className="h-4 bg-gray-200 animate-pulse rounded" /></TableCell>}
                    {columns.map(column => (
                      <TableCell key={column.key}>
                        <div className="h-4 bg-gray-200 animate-pulse rounded" />
                      </TableCell>
                    ))}
                    <TableCell><div className="h-4 bg-gray-200 animate-pulse rounded" /></TableCell>
                  </TableRow>
                ))
              ) : response?.data?.length ? (
                response.data.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-50">
                    {batchActions && (
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.has(row.id)}
                          onCheckedChange={() => handleSelectRow(row.id)}
                          aria-label={`Select row ${row.id}`}
                        />
                      </TableCell>
                    )}
                    
                    {columns.map(column => (
                      <TableCell key={column.key}>
                        {renderCell(column, row)}
                      </TableCell>
                    ))}
                    
                    {(rowActions.length > 0 || onView || onEdit || onDelete) && (
                      <TableCell>
                        {renderRowActions(row)}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={columns.length + (batchActions ? 1 : 0) + 1} 
                    className="text-center py-8 text-gray-500"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {response && response.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, response.total)} of {response.total} results
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={limit.toString()} onValueChange={(value) => setLimit(parseInt(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm">
                Page {page} of {response.totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.min(response.totalPages, page + 1))}
                disabled={page >= response.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default DataTable;