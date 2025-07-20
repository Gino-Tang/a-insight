import Link from 'next/link';
import { createClient } from '../../../utils/supabase/server';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-muted rounded-xl shadow-lg text-center">
      <header>
        <h1 className="text-4xl font-bold">
          ยินดีต้อนรับ
        </h1>
        <p className="mt-2 text-muted-foreground">
          {user.email ? `เข้าสู่ระบบด้วย ${user.email}` : 'เลือกกิจกรรมที่คุณต้องการทำวันนี้'}
        </p>
      </header>

      <nav className="flex flex-col space-y-4">
        <Link
          href="/dashboard/journal/new"
          className="block w-full px-6 py-3 text-lg font-semibold text-primary-foreground bg-primary rounded-lg shadow-md hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform transform hover:-translate-y-1"
        >
          บันทึกวันนี้
        </Link>
        <Link
          href="/dashboard/journal/history"
          className="block w-full px-6 py-3 text-lg font-semibold text-accent-foreground bg-accent rounded-lg shadow-md hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform transform hover:-translate-y-1"
        >
          ดูบันทึกทั้งหมด
        </Link>
        <Link
          href="/dashboard/chatbot"
          className="block w-full px-6 py-3 text-lg font-semibold border border-primary text-primary bg-transparent rounded-lg shadow-md hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform transform hover:-translate-y-1"
        >
          คุยกับเพื่อน AI
        </Link>
      </nav>

    </div>
  );
}
