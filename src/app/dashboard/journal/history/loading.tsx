import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SkeletonEntry() {
  return (
    <div className="p-4 bg-background rounded-lg border border-border animate-pulse">
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default function Loading() {
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
        <p className="text-sm text-muted-foreground">กำลังโหลดเรื่องราวของคุณ...</p>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        <SkeletonEntry />
        <SkeletonEntry />
        <SkeletonEntry />
      </div>
    </div>
  );
}

