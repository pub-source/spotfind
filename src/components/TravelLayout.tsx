"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  MapPin,
  Building2,
  Settings,
  Menu,
  X,
  Compass,
  User,
  LogOut,
  Coffee,
  Camera,
  Bus,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { FeedbackModal } from "@/components/FeedbackModal" // Added feedback modal import

interface TravelLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tourist Spots", href: "/spots", icon: MapPin },
  { name: "Accommodations", href: "/accommodations", icon: Building2 },
  { name: "Cafe Shop", href: "/cafe", icon: Coffee },
  { name: "Gallery", href: "/gallery", icon: Camera },
  { name: "Transport Guide", href: "/transport", icon: Bus },
  { name: "Admin", href: "/admin", icon: Settings, adminOnly: true },
]

export function TravelLayout({ children }: TravelLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false) // Added feedback modal state
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated, isGuest, loading } = useAuth()
  const { toast } = useToast()

  // Redirect to login if not authenticated and not guest
  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      navigate("/login")
    }
  }, [isAuthenticated, isGuest, navigate])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    })
    navigate("/login")
  }

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render layout if not authenticated and not guest
  if (!isAuthenticated && !isGuest) {
    return null
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-travel flex flex-col">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Compass className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg bg-gradient-hero bg-clip-text text-transparent">
                Tourist Spot Finder
                <span className="text-sm block">Cabuyao, Laguna</span>
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="px-4 space-y-2 flex-1">
            {navigation
              .filter((item) => !item.adminOnly || user?.role === "admin")
              .map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "text-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                )
              })}
          </nav>

          <div className="px-4 pb-4 mt-auto">
            <div className="mb-3">
              <Button
                variant="outline"
                onClick={() => setFeedbackOpen(true)}
                className="w-full flex items-center gap-2 text-sm"
              >
                <MessageSquare className="h-4 w-4" />
                Share Feedback
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-gradient-ocean rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                  {isGuest && <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-500 rounded-full"></span>}
                </div>
                <div className="text-sm">
                  <div className="font-medium truncate">
                    {isGuest ? "Guest User" : user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                  </div>
                  <div className="text-muted-foreground text-xs truncate">
                    {isGuest ? "Read-only access" : user?.email}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={isGuest ? () => navigate("/login") : handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                {isGuest ? <User className="h-4 w-4" /> : <LogOut className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r shadow-card">
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center gap-2">
              <Compass className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg bg-gradient-hero bg-clip-text text-transparent">
                Tourist Spot Finder
                <span className="text-sm block">Cabuyao, Laguna</span>
              </span>
            </div>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {navigation
              .filter((item) => !item.adminOnly || user?.role === "admin")
              .map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "text-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                )
              })}
          </nav>
          <div className="p-4 border-t">
            <div className="mb-3">
              <Button
                variant="outline"
                onClick={() => setFeedbackOpen(true)}
                className="w-full flex items-center gap-2 text-sm"
              >
                <MessageSquare className="h-4 w-4" />
                Share Feedback
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="h-8 w-8 bg-gradient-ocean rounded-full flex items-center justify-center relative">
                  <User className="h-4 w-4 text-white" />
                  {isGuest && <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-500 rounded-full"></span>}
                </div>
                <div className="text-sm">
                  <div className="font-medium">
                    {isGuest ? "Guest User" : user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                  </div>
                  <div className="text-muted-foreground">{isGuest ? "Read-only access" : user?.email}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={isGuest ? () => navigate("/login") : handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                {isGuest ? <User className="h-4 w-4" /> : <LogOut className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden flex h-16 items-center gap-4 px-4 border-b bg-card/80 backdrop-blur-sm">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-bold bg-gradient-hero bg-clip-text text-transparent">
              Tourist Spot Finder
              <span className="text-sm block">Cabuyao, Laguna</span>
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen bg-background scroll-smooth">{children}</main>
      </div>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  )
}
