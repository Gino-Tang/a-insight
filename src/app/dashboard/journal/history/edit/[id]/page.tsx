import { getEntryById, updateEntry } from './actions';
import {
  Angry,
  Annoyed,
  ArrowLeft,
  Frown,
  Heart,
  Meh,
  Smile,
} from 'lucide-react';
import Link from 'next/link';

export default async function EditEntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await getEntryById(params.id);

  const moods = [
    { name: 'มีความสุข', icon: Smile },
    { name: 'ตื่นเต้น', icon: Heart },
    { name: 'เฉยๆ', icon: Meh },
    { name: 'เศร้า', icon: Frown },
    { name: 'กังวล', icon: Annoyed },
    { name: 'โกรธ', icon: Angry },
  ];

  const updateEntryWithId = updateEntry.bind(null, entry.id);

  return (
    <div className="w-full max-w-2xl p-6 mx-4 bg-muted rounded-xl shadow-lg sm:p-8">
      <div className="relative mb-6 text-center">
        <Link
          href="/dashboard/journal/history"
          className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Back to History"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">แก้ไขบันทึก</h1>
        <p className="text-sm text-muted-foreground">
          {new Date(entry.created_at).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <form action={updateEntryWithId} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            เลือกอารมณ์ของคุณ
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {moods.map((mood) => (
              <div key={mood.name}>
                <input
                  type="radio"
                  id={mood.name}
                  name="mood"
                  value={mood.name}
                  className="sr-only peer"
                  required
                  defaultChecked={entry.moods?.[0] === mood.name}
                />
                <label
                  htmlFor={mood.name}
                  className="flex flex-col items-center justify-center w-full p-3 text-center border border-input rounded-lg cursor-pointer text-sm font-medium transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary hover:bg-accent hover:text-accent-foreground space-y-2"
                >
                  <mood.icon className="w-6 h-6" />
                  <span>{mood.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            เล่าเรื่องราวของคุณ...
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className="mt-1 block w-full px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="วันนี้เกิดอะไรขึ้นบ้าง..."
            required
            defaultValue={entry.content || ''}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center h-11 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap text-primary-foreground bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          อัปเดตบันทึก
        </button>
      </form>
    </div>
  );
}
