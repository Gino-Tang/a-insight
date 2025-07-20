import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col justify-center space-y-4 rounded-lg bg-background/50 p-6 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl dark:bg-muted/50">
      <div className="grid gap-1">
        <Icon className="h-8 w-8 text-primary" />
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

