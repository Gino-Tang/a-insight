import Link from 'next/link';
import { BarChart, User } from 'lucide-react';
import LogoutButton from '@/components/LogoutButton';

export function DashboardHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b w-full bg-background sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/dashboard">
          <BarChart className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">A-Insight</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="/dashboard/account"
            className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Account
          </Link>
          <LogoutButton />
        </nav>
      </div>
    </header>
  );
}