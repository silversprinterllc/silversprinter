import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { DispatcherSidebar } from '@/components/layout/DispatcherSidebar'

export default async function DispatcherLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  if (!['DISPATCHER', 'SUPER_ADMIN'].includes(session.user.role)) redirect('/portal')

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <DispatcherSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
