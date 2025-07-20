'use server';

import { createClient } from '../../../../../../../utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getEntryById(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: entry, error } = await supabase
    .from('entries')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id) // เพิ่มการตรวจสอบเพื่อให้แน่ใจว่าผู้ใช้เป็นเจ้าของ entry นี้เท่านั้น
    .single();

  if (error || !entry) {
    // หากเกิดข้อผิดพลาด หรือไม่พบ entry (อาจเพราะ ID ผิด หรือไม่ใช่ของ user)
    // ให้ redirect กลับไปหน้าประวัติ
    redirect('/dashboard/journal/history');
  }

  return entry;
}

export async function updateEntry(id: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const content = formData.get('content') as string;
  const mood = formData.get('mood') as string;

  const { error } = await supabase
    .from('entries')
    .update({ content, moods: [mood] })
    .eq('id', id)
    .eq('user_id', user.id); // ตรวจสอบความเป็นเจ้าของก่อนอัปเดตเสมอ

  if (error) {
    return redirect(`/dashboard/journal/history/edit/${id}?error=true`);
  }

  revalidatePath('/dashboard/journal/history');
  redirect('/dashboard/journal/history');
}