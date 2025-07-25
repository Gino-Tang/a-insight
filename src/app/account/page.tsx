import AccountForm from './account-form'
import { createClient } from '../../../utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <AccountForm user={user} />
    </div>
  )
}