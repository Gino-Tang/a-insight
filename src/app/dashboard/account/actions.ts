'use server';

import { createClient } from '../../../../utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

export async function updateUserPassword(formData: FormData) {
  const supabase = await createClient();
  const newPassword = formData.get('new_password') as string;
  const confirmPassword = formData.get('confirm_password') as string;

  if (newPassword.length < 6) {
    return redirect(
      '/dashboard/account?error=Password must be at least 6 characters long.',
    );
  }

  if (newPassword !== confirmPassword) {
    return redirect('/dashboard/account?error=Passwords do not match.');
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error('Error updating password:', error);
    return redirect(`/dashboard/account?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/dashboard/account');
  return redirect('/dashboard/account?success=Password updated successfully!');
}