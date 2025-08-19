import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={i === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(i)}
            data-testid={`pagination-page-${i}`}
            className="w-9 h-9"
          >
            {i}
          </Button>
        );
      }
    } else {
      // Show first page
      pages.push(
        <Button
          key={1}
          variant={1 === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(1)}
          data-testid="pagination-page-1"
          className="w-9 h-9"
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        pages.push(
          <div key="start-ellipsis" className="flex items-center justify-center w-9 h-9">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        );
      }

      // Show current page and neighbors
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <Button
            key={i}
            variant={i === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(i)}
            data-testid={`pagination-page-${i}`}
            className="w-9 h-9"
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <div key="end-ellipsis" className="flex items-center justify-center w-9 h-9">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        );
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(
          <Button
            key={totalPages}
            variant={totalPages === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(totalPages)}
            data-testid={`pagination-page-${totalPages}`}
            className="w-9 h-9"
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-between space-x-2", className)}>
      <div className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          data-testid="pagination-previous"
          className="h-9"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        <div className="flex items-center space-x-1">
          {renderPageNumbers()}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          data-testid="pagination-next"
          className="h-9"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// Hook for pagination logic
export function usePagination<T>(
  data: T[] | undefined,
  itemsPerPage: number = 10
) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex) || [];
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data?.length]);
  
  return {
    currentPage,
    totalPages,
    totalItems,
    paginatedData,
    goToPage,
    itemsPerPage
  };
}