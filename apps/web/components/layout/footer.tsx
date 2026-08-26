import React from "react";
import Link from "next/link";
import { Separator } from "@gad/ui/separator";
import { Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import logo from "@gad/assets/images/RGAN XI white.png";
import Image from "next/image";
import { images } from "@/constants/images";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="w-10 h-10 rounded-lg gad-gradient flex items-center justify-center text-white font-display font-bold text-sm">
                GAD
              </div> */}
              <div className="w-10 h-10">
                <Image
                  src={logo}
                  className="w-full h-full object-contain"
                  alt="RGAN XI Logo"
                />
              </div>
              <div>
                <p className="font-display font-bold text-background">
                  RGAN XI
                </p>
                <p className="text-xs text-background/60">EST. 2023</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm mb-6">
              Advancing gender equality, diversity, equity, and social inclusion
              through research, policy engagement, and community partnerships
              across Region XI.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@gadresearch.org"
                className="w-9 h-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Image
                  className="h-full w-full object-contain"
                  src={images.ched_logo}
                  alt="CHED Logo"
                />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Image
                  className="h-full w-full object-contain"
                  src={images.ddosc_logo}
                  alt="DDOSC Logo"
                />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Image
                  className="h-full w-full object-contain"
                  src={images.dorsu_logo}
                  alt="DOrSU Logo"
                />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Image
                  className="h-full w-full object-contain"
                  src={images.dssc_logo}
                  alt="DSSC Logo"
                />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Image
                  className="h-full w-full object-contain"
                  src={images.spamast_logo}
                  alt="SPAMAST Logo"
                />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Image
                  className="h-full w-full object-contain"
                  src={images.usep_logo}
                  alt="USeP Logo"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-background/70">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Gender Research & Policy Journal", href: "/journal" },
                { label: "Journal Issues", href: "/issue/archive" },
                { label: "Regional GAD Summit", href: "/summit" },
                { label: "Our Team", href: "/about#team" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-background mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-background/40" />
                <span>
                  Center for Gender and Development Davao Oriental State
                  University Guang-guang, Dahican, 8200 Mati, Davao Oriental,
                  Philippines
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-background/40" />
                <span>+63 (82) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-background/40" />
                <a
                  href="mailto:rganxi2023@gmail.com"
                  className="hover:text-background transition-colors"
                >
                  rganxi2023@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-background/10" />

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} RGAN XI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-background/80 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-background/80 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
