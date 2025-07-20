import { signOut } from '@/app/auth/actions';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        <span>Sign Out</span>
      </button>
    </form>
  );
}