'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  KeyRound,
  MonitorCheck,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  DollarSign,
  MessageCircle
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'License Keys', href: '/keys', icon: KeyRound },
  { name: 'Activations', href: '/activations', icon: MonitorCheck },
  { name: 'Sales & Customers', href: '/sales', icon: DollarSign },
  { name: 'Support Messages', href: '/support', icon: MessageCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
]

import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // /login renders its own full-screen layout — it must not show the
  // authenticated dashboard chrome (sidebar/header) around it.
  if (pathname === '/login') {
    return (
      <html lang="en">
        <body className={`${inter.className} bg-[#050505] text-gray-100 antialiased`}>
          {children}
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-gray-100 antialiased`}>
        <div className="min-h-screen selection:bg-purple-500/30">
          {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-6 border-b border-white/5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <MonitorCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                MSO Admin
              </span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-white/5 space-y-1">
            <Link href="https://macdiskcleaner.com" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <span className="font-medium">Back to Website</span>
            </Link>
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-6 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold capitalize">
              {pathname === '/' ? 'Dashboard' : pathname.split('/').pop()?.replace('-', ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 flex items-center justify-center border border-white/10">
              <span className="text-sm font-semibold">AD</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
    </body>
    </html>
  )
}
