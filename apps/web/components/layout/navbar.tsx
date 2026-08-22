"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@gad/assets/images/RGAN XI logo landscape.png";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Organization", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Strategic Programs", href: "/about#strategic-programs" },
      { label: "Our Team", href: "/about#team" },
    ],
  },
  {
    label: "Journal",
    href: "/journal",
    children: [
      { label: "About GRPJ", href: "/journal" },
      { label: "Journal Information", href: "/journal#journal-info" },
    ],
  },
  {
    label: "Archive",
    href: "/issue",
    children: [
      { label: "Current Issue", href: "/issue" },
      { label: "Archives", href: "/issue/archive" },
    ],
  },
  { label: "GAD Summit", href: "/summit" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* <div className=' rounded-lg gad-gradient flex items-center justify-center text-white font-display font-bold text-sm shadow-md group-hover:shadow-lg transition-shadow'></div> */}
            <div className="w-10 h-10">
              <Image
                src={logo}
                className="w-full h-full object-contain"
                alt="RGAN XI Logo"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-sm leading-tight text-foreground">
                RGAN XI
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Region XI Gender and Development Advocates Network
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname.startsWith(link.href)
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        openDropdown === link.label && "rotate-180",
                      )}
                    />
                  </button>

                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2 w-56 animate-fade-up">
                      <div className="bg-white border border-border rounded-xl shadow-lg py-2 overflow-hidden">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="gad" size="sm" asChild>
              <Link href="/issue/archive">Explore Research</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md py-4 space-y-1 animate-fade-up">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 border-l border-border pl-4 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-4 pt-2">
              <Button variant="gad" className="w-full" asChild>
                <Link href="/issue/archive">Explore Research</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
