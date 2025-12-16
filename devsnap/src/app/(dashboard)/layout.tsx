"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Camera,
  LayoutDashboard,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/snapshots", label: "Snapshots", icon: FolderOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

function Sidebar({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className={`flex flex-col h-full ${mobile ? "p-4" : "p-6"}`}>
      {/* Logo */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Camera className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">DevSnap</span>
        </Link>
        {mobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* CLI Install Card */}
      <div className="mt-auto">
        <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
          <p className="text-sm font-medium mb-2">Install the CLI</p>
          <code className="text-xs text-muted-foreground bg-terminal px-2 py-1 rounded block">
            npm i -g devsnap
          </code>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 hover:bg-muted rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search (placeholder) */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search snapshots..."
              className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-primary/20 text-primary">
                  U
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">User Name</p>
                <p className="text-sm text-muted-foreground">user@example.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border"
          >
            <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
          </motion.div>
        </div>
      )}
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-border bg-card/50">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        <Header />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

