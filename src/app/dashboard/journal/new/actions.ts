'use server';

import { createClient } from '../../../../../utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEntry(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const entryData = {
    content: formData.get('content') as string,
    moods: [formData.get('mood') as string],
    user_id: user.id,
  };

  const { error } = await supabase.from('entries').insert(entryData);

  if (error) {
    console.error('Error inserting entry:', error);
    return redirect('/dashboard/journal/new?error=true');
  }

  revalidatePath('/dashboard/journal/history'); // <-- แก้ไข path ให้ถูกต้อง
  redirect('/dashboard/journal/history'); // <-- แนะนำให้ไปหน้า history เพื่อให้ผู้ใช้เห็นบันทึกล่าสุด
}