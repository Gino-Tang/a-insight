'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '../../../utils/supabase/client'
import { type User } from '@supabase/supabase-js'

// ...

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-6 mx-4 space-y-6 bg-background rounded-xl shadow-lg sm:p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user?.email ?? ''}
            disabled
            className="flex w-full h-10 px-3 py-2 text-sm bg-muted border rounded-md cursor-not-allowed border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="fullName" className="text-sm font-medium leading-none">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
            className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="username" className="text-sm font-medium leading-none">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="website" className="text-sm font-medium leading-none">
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-input ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex flex-col pt-2 space-y-2">
          <button
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md whitespace-nowrap text-primary-foreground bg-primary hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Update Profile'}
          </button>
        </div>
        <div className="pt-2">
          <form action="/auth/signout" method="post">
            <button
              className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium transition-colors border rounded-md whitespace-nowrap border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              type="submit"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}