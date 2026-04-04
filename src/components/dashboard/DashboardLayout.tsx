'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  BookOpen,
  GraduationCap,
  Trophy,
  Calendar,
  User,
  Users,
  MessageSquare,
  CreditCard,
  FileText,
  Search,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navByRole: Record<string, NavItem[]> = {
  student: [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'My Tracks', href: '/dashboard/tracks', icon: BookOpen },
    { label: 'Practice', href: '/dashboard/practice', icon: GraduationCap },
    { label: 'Achievements', href: '/dashboard/achievements', icon: Trophy },
    { label: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
  ],
  parent: [
    { label: 'Overview', href: '/dashboard', icon: Home },
    { label: 'Children', href: '/dashboard/children', icon: Users },
    { label: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
    { label: 'Reports', href: '/dashboard/reports', icon: FileText },
  ],
  coach: [
    { label: 'Students', href: '/dashboard/students', icon: Users },
    { label: 'Sessions', href: '/dashboard/sessions', icon: Calendar },
    { label: 'Notes', href: '/dashboard/notes', icon: FileText },
    { label: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  ],
};

// Pick up to 5 items for mobile bottom nav
function getMobileNav(role: string): NavItem[] {
  const items = navByRole[role] ?? navByRole.student;
  return items.slice(0, 5);
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'parent' | 'coach';
  userName: string;
  userAvatar?: string | null;
}

export function DashboardLayout({
  children,
  role,
  userName,
  userAvatar,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = navByRole[role] ?? navByRole.student;
  const mobileNavItems = getMobileNav(role);
  const greeting = getGreeting();

  return (
    <div className="flex h-screen overflow-hidden bg-navy-dark">
      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden md:flex flex-col bg-navy border-r border-white/5 transition-all duration-300 ${
          sidebarOpen ? 'w-56' : 'w-16'
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
          {sidebarOpen && (
            <span className="text-lg font-heading font-bold text-gold">
              Cognitron
            </span>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-light hover:text-white transition-colors p-1"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-light hover:bg-navy-light hover:text-gold transition-colors group"
              >
                <Icon className="w-5 h-5 flex-shrink-0 group-hover:text-gold transition-colors" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Search */}
        {sidebarOpen && (
          <div className="px-3 pb-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-light text-slate-light text-sm">
              <Search className="w-4 h-4" />
              <span>Search…</span>
            </div>
          </div>
        )}
      </aside>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Top bar ── */}
        <header className="sticky top-0 z-40 flex items-center justify-between bg-navy/90 backdrop-blur-sm border-b border-white/5 px-4 md:px-6 h-14">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-light hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Greeting */}
          <p className="text-sm text-white font-medium hidden sm:block">
            {greeting}, {userName.split(' ')[0]}! 🔥
          </p>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative text-slate-light hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gold rounded-full" />
            </button>

            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-gold/30"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-navy-light flex items-center justify-center ring-2 ring-gold/30">
                <span className="text-xs font-bold text-gold">
                  {getInitials(userName)}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Mobile slide-out nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-14 left-0 right-0 z-30 bg-navy border-b border-white/5 px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-light hover:bg-navy-light hover:text-gold transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Scrollable content ── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy border-t border-white/5 flex items-center justify-around h-14 px-1">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-slate-light hover:text-gold transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
