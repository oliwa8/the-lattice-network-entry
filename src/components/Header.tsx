"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient, useSession } from '@/lib/auth-client'
import { toast } from 'sonner'
import { LogIn, LogOut, User } from 'lucide-react'

export default function Header() {
  const [isVisible, setIsVisible] = useState(false)
  const { data: session, isPending, refetch } = useSession()
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token")

    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
    
    if (error?.code) {
      toast.error(error.code)
    } else {
      localStorage.removeItem("bearer_token")
      toast.success("Signed out successfully")
      refetch()
      router.push("/")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6 bg-gradient-to-b from-[#0a1b2f] via-[#0a1b2f]/80 to-transparent pointer-events-none">
      <div
        className={`transition-all duration-1000 ease-out pointer-events-auto flex items-center justify-between ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      >
        <Link href="/" className="flex items-center gap-4 text-white hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4da6d1c5-c3d4-45cf-9d42-c4a668df18e5/generated_images/minimalist-geometric-logo-for-the-lattic-fdda265b-20251025211642.jpg"
              alt="The Lattice Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-wide">
            The Lattice
          </h1>
        </Link>

        {/* Auth UI */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-sm">{session.user.name || session.user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Sign out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm">Sign in</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 text-[#0a1b2f] rounded-lg transition-all font-medium"
              >
                <span className="text-sm">Join</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}