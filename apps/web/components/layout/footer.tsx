import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg gad-gradient flex items-center justify-center text-white font-display font-bold text-sm">
                GAD
              </div>
              <div>
                <p className="font-display font-bold text-background">GAD Research Center</p>
                <p className="text-xs text-background/60">Gender & Development</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-6">
              Advancing gender equity through rigorous research, evidence-based advocacy, and community-centered engagement across the Philippines and Southeast Asia.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="mailto:info@gadresearch.org" className="w-9 h-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Gender Research & Policy Journal', href: '/journal' },
                { label: 'Research Articles', href: '/articles' },
                { label: 'Our Team', href: '/about#team' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-background/40" />
                <span>Davao City, Philippines</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-background/40" />
                <span>+63 (82) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-background/40" />
                <a href="mailto:rganxi2023@gmail.com" className="hover:text-background transition-colors">
                 rganxi2023@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-background/10" />

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} GAD Research Center. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-background/80 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-background/80 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
