'use server';

import { createClient } from '../../../../../utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getEntries() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: entries, error } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', user.id) // เพิ่มการกรองข้อมูลเฉพาะของผู้ใช้ที่ล็อกอินอยู่
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching entries:', error);
    // ในกรณีที่เกิดข้อผิดพลาด ให้ส่งค่าเป็น Array ว่างกลับไปก่อน
    return [];
  }

  return entries;
}
