'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function signup(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {}
        },
      },
    }
  )

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // We are assuming localhost for now, might need absolute url in prod
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    redirect('/register?error=Could not register user')
  }

  revalidatePath('/', 'layout')
  redirect('/dfs')
}
