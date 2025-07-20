import { createClient } from '../../../utils/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <DashboardHeader />
      <main className="flex flex-1 items-center justify-center p-4">{children}</main>
      <DashboardFooter />
    </div>
  );
}
