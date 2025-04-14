
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  };
  className?: string;
  children?: React.ReactNode;
}

export const PageHeader = ({
  title,
  description,
  action,
  className,
  children,
}: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center md:justify-between mb-6", className)}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-4">
        {children}
        {action && (
          <Button 
            onClick={action.onClick} 
            variant={action.variant || "default"} 
            className="gap-2"
          >
            {action.icon}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};
