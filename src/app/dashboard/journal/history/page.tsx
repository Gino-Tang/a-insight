import Link from 'next/link';
import { ArrowLeft, BookPlus, FilePenLine } from 'lucide-react';
import { getEntries } from './actions';

type Entry = {
  id: string;
  created_at: string;
  content: string;
  moods: string[];
};

export default async function JournalHistoryPage() {
  const entries = await getEntries();

  return (
    <div className="w-full max-w-4xl p-6 mx-4 bg-muted rounded-xl shadow-lg sm:p-8">
      <div className="relative mb-6 text-center">
        <Link
          href="/dashboard"
          className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">ประวัติบันทึก</h1>
        <p className="text-sm text-muted-foreground">เรื่องราวทั้งหมดของคุณ</p>
      </div>

      {entries && entries.length > 0 ? (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {entries.map((entry: Entry) => (
            <div
              key={entry.id}
              className="p-4 bg-background rounded-lg border border-border"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-medium text-primary">
                    {entry.moods?.[0]}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <Link href={`/dashboard/journal/edit/${entry.id}`} className="p-1 text-muted-foreground hover:text-primary"><FilePenLine className="w-4 h-4" /><span className="sr-only">แก้ไขบันทึก</span></Link>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10"><p className="text-muted-foreground mb-4">ยังไม่มีบันทึก</p><Link href="/dashboard/journal/new" className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md text-primary-foreground bg-primary hover:bg-primary/90"><BookPlus className="w-4 h-4 mr-2" />สร้างบันทึกแรกของคุณ</Link></div>
      )}
    </div>
  );
}