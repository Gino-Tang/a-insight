export function DashboardFooter() {
  return (
    <footer className="px-4 lg:px-6 h-14 flex items-center w-full border-t bg-background">
      <div className="container mx-auto text-center">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} A-Insight Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}