// components/StatusToggle.tsx
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useUpdateArchieveStatus } from '@/hooks/product.hooks';
import { ArchieveStatus } from '@/types/product.types';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

interface StatusToggleProps {
  productId: string;
  currentStatus: string
}

export const StatusToggle = ({ 
  productId, 
  currentStatus
}: StatusToggleProps) => {
  const { isPending, mutate } = useUpdateArchieveStatus();
  const isArchived = currentStatus === ArchieveStatus.Archieve;

  const toggleStatus = () => {
    if (!productId) return;
    
    mutate({
      archieve: !isArchived,
      productId: productId,
    });
  };

  return (
     <div className="flex items-center gap-3">
      <Switch
        id={`archive-switch-${productId}`}
        checked={!isArchived}
        onCheckedChange={toggleStatus}
        disabled={isPending}
      />
      <Label htmlFor={`archive-switch-${productId}`} className="flex items-center gap-2">
        {isPending ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <Badge
            variant="outline"
            className={
              isArchived
                ? "bg-gray-200 text-gray-800"
                : "bg-green-100 text-green-800"
            }
          >
            {isArchived ? "Archived" : "Active"}
          </Badge>
        )}
      </Label>
    </div>
  );
};