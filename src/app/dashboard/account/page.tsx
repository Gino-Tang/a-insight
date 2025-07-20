import Link from 'next/link';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react';
import { getUserData, updateUserPassword } from './actions';
import { redirect } from 'next/navigation';

// คอมโพเนนต์สำหรับแสดงข้อความแจ้งเตือน (Success/Error)
function Message({
  message,
  type,
}: {
  message: string | null;
  type: 'success' | 'error';
}) {
  if (!message) return null;
  const baseClasses = 'p-4 mb-4 text-sm rounded-lg';
  const typeClasses =
    type === 'success'
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  return (
    <div className={`${baseClasses} ${typeClasses}`} role="alert">
      {message}
    </div>
  );
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  const user = await getUserData();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-muted rounded-xl shadow-lg">
      <div className="relative mb-6 text-center">
        <Link
          href="/dashboard"
          className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">
          Account Settings
        </h1>
      </div>

      <Message message={searchParams.success || null} type="success" />
      <Message message={searchParams.error || null} type="error" />

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Email</label>
        <div className="flex items-center w-full h-10 px-3 py-2 text-sm bg-background border rounded-md border-input">
          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">{user.email}</span>
        </div>
      </div>

      <div className="space-y-2 border-t pt-6">
        <h2 className="text-lg font-medium">Change Password</h2>
        <p className="text-sm text-muted-foreground">
          ฟีเจอร์นี้กำลังอยู่ในระหว่างการพัฒนา
        </p>
      </div>
    </div>
  );
}






//--------------------------------later on-----------------------
//import Link from 'next/link';
// import { ArrowLeft, KeyRound, Mail } from 'lucide-react';
// import { getUserData, updateUserPassword } from './actions';
// import { redirect } from 'next/navigation';

// // คอมโพเนนต์สำหรับแสดงข้อความแจ้งเตือน (Success/Error)
// function Message({
//   message,
//   type,
// }: {
//   message: string | null;
//   type: 'success' | 'error';
// }) {
//   if (!message) return null;
//   const baseClasses = 'p-4 mb-4 text-sm rounded-lg';
//   const typeClasses =
//     type === 'success'
//       ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//       : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
//   return (
//     <div className={`${baseClasses} ${typeClasses}`} role="alert">
//       {message}
//     </div>
//   );
// }

// export default async function AccountPage({
//   searchParams,
// }: {
//   searchParams: { error?: string; success?: string };
// }) {
//   const user = await getUserData();

//   if (!user) {
//     redirect('/login');
//   }

//   return (
//     <div className="w-full max-w-md p-8 space-y-6 bg-muted rounded-xl shadow-lg">
//       <div className="relative mb-6 text-center">
//         <Link
//           href="/dashboard"
//           className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//           aria-label="Back to Dashboard"
//         >
//           <ArrowLeft className="w-6 h-6" />
//         </Link>
//         <h1 className="text-2xl font-semibold tracking-tight">
//           Account Settings
//         </h1>
//       </div>

//       <Message message={searchParams.success || null} type="success" />
//       <Message message={searchParams.error || null} type="error" />

//       <div className="space-y-2">
//         <label className="text-sm font-medium leading-none">Email</label>
//         <div className="flex items-center w-full h-10 px-3 py-2 text-sm bg-background border rounded-md border-input">
//           <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
//           <span className="text-muted-foreground">{user.email}</span>
//         </div>
//       </div>

//       <form action={updateUserPassword} className="space-y-4 border-t pt-6">
//         <h2 className="text-lg font-medium">Change Password</h2>
//         <div className="grid gap-2">
//           <label
//             htmlFor="new_password"
//             className="text-sm font-medium leading-none"
//           >
//             New Password
//           </label>
//           <input
//             id="new_password"
//             name="new_password"
//             type="password"
//             required
//             minLength={6}
//             className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//             placeholder="••••••••"
//           />
//         </div>
//         <div className="grid gap-2">
//           <label
//             htmlFor="confirm_password"
//             className="text-sm font-medium leading-none"
//           >
//             Confirm New Password
//           </label>
//           <input
//             id="confirm_password"
//             name="confirm_password"
//             type="password"
//             required
//             minLength={6}
//             className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//             placeholder="••••••••"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap text-primary-foreground bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
//         >
//           Update Password
//         </button>
//       </form>
//     </div>
//   );
// }