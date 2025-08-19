import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit3, Settings, Eye } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

interface EditButtonProps {
  onEditToggle?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function EditButton({ onEditToggle, position = 'bottom-right' }: EditButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  const isAdmin = isAuthenticated && ((user as any)?.role === 'admin' || (user as any)?.email === 'admin@ienet.com');

  if (!isAdmin) return null;

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 flex flex-col-reverse gap-2`}>
      {isExpanded && (
        <div className="flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-2 duration-200">
          <Button
            size="sm"
            variant="secondary"
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
            onClick={() => {
              window.open('/dashboard/page-builder', '_blank');
              setIsExpanded(false);
            }}
            title="Open Page Builder"
          >
            <Settings className="w-4 h-4 mr-2" />
            Page Builder
          </Button>
          
          {onEditToggle && (
            <Button
              size="sm"
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              onClick={() => {
                onEditToggle();
                setIsExpanded(false);
              }}
              title="Toggle Live Editor"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Live Edit
            </Button>
          )}
          
          <Button
            size="sm"
            variant="secondary"
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
            onClick={() => {
              window.open('/dashboard', '_blank');
              setIsExpanded(false);
            }}
            title="Open Dashboard"
          >
            <Eye className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>
      )}
      
      <Button
        size="lg"
        className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg rounded-full w-14 h-14 p-0"
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Close admin tools' : 'Open admin tools'}
      >
        <Edit3 className={`w-6 h-6 transition-transform duration-200 ${isExpanded ? 'rotate-45' : ''}`} />
      </Button>
    </div>
  );
}

export default EditButton;