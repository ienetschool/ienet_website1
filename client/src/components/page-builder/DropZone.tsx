import { useDrop } from "react-dnd";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onDrop: (item: any, index: number) => void;
  index: number;
  className?: string;
  children?: React.ReactNode;
}

export function DropZone({ onDrop, index, className, children }: DropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ['component', 'element'],
    drop: (item: any) => {
      onDrop(item, index);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        "transition-all duration-200",
        {
          "border-blue-400 bg-blue-50 dark:bg-blue-900/20": isOver && canDrop,
          "border-gray-200": !isOver,
        },
        className
      )}
      data-testid={`drop-zone-${index}`}
    >
      {children}
    </div>
  );
}