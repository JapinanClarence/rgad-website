"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@gad/supabase/client";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Image as ImageIcon,
  Layers,
  UserCheck,
  Megaphone,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Articles",
    href: "/articles",
    icon: FileText,
    children: [
      { label: "New Article", href: "/articles/new", icon: PlusCircle },
    ],
  },
  { label: "Issues", href: "/issues", icon: Layers },
  { label: "Summit", href: "/summit", icon: BookOpen },
  { label: "Reviewers", href: "/reviewers", icon: UserCheck },
  { label: "Announcements", href: "/announcements", icon: Megaphone },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60",
      )}
      style={{
        background: "hsl(var(--sidebar))",
        borderColor: "hsl(var(--sidebar-border))",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5 border-b"
        style={{ borderColor: "hsl(var(--sidebar-border))" }}
      >
        <div className="w-8 h-8 rounded-md gad-gradient flex items-center justify-center text-white text-xs font-display font-bold shrink-0">
          G
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-display font-bold text-sm text-white leading-tight">
              GAD Admin
            </p>
            <p
              className="text-[10px]"
              style={{ color: "hsl(var(--sidebar-foreground) / 0.5)" }}
            >
              Content Management
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto overflow-x-visible">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const isOpen = openMenu === item.href;

          if (!item.children) {
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          }

          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.href)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <div
                className={cn(
                  "flex items-center rounded-lg text-sm transition-colors",
                  active
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10",
                )}
              >
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className="flex flex-1 items-center gap-3 px-3 py-2 min-w-0"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
                {!collapsed && (
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : item.href)}
                    aria-expanded={isOpen}
                    aria-label={`Toggle ${item.label} submenu`}
                    className="px-2 py-2 shrink-0 hover:text-white"
                  >
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                )}
              </div>

              {isOpen && (
                <div
                  className={cn(
                    "absolute z-20 rounded-lg border shadow-lg py-1 min-w-[10rem]",
                    collapsed ? "left-full top-0 ml-1" : "left-0 top-full mt-1",
                  )}
                  style={{
                    background: "hsl(var(--sidebar))",
                    borderColor: "hsl(var(--sidebar-border))",
                  }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpenMenu(null)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 text-sm whitespace-nowrap transition-colors",
                        pathname === child.href
                          ? "bg-white/15 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/10",
                      )}
                    >
                      <child.icon className="h-3.5 w-3.5 shrink-0" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="p-2 border-t"
        style={{ borderColor: "hsl(var(--sidebar-border))" }}
      >
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm w-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors z-10"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
}

