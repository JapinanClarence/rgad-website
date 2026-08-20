import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/contact-form";

const CONTACT_EMAIL = "rganxi2023@gmail.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with RGAN XI — the Region XI Gender and Development Advocates Network — for membership, partnerships, and journal inquiries.",
};

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    lines: [CONTACT_EMAIL],
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      "Center for Gender and Development",
      "Davao Oriental State University",
      "Guang-guang, Dahican, 8200 Mati, Davao Oriental, Philippines",
    ],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Monday – Friday", "8:00 AM – 5:00 PM (PST)"],
  },
];

const faqs = [
  {
    q: "How can our institution become a member of RGAN XI?",
    a: "Reach out through the form below or email us directly. Our membership committee will send you the institutional membership requirements and onboarding process.",
  },
  {
    q: "Who do I contact for the Gender Research and Policy Journal?",
    a: "General inquiries can be sent to rganxi2023@gmail.com. Editorial and manuscript concerns are coordinated with the journal's editorial office.",
  },
  {
    q: "Can our organization partner with RGAN XI for a GAD program?",
    a: "Yes. We welcome partnerships with government agencies, HEIs, LGUs, and civil society organizations. Tell us about your program using the form and our partnerships committee will follow up.",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              Get in Touch
            </p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Contact <span className="text-gradient">RGAN XI</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have a question about membership, partnerships, the Gender
              Research and Policy Journal, or the Regional GAD Summit? We would
              love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactCards.map((card) => {
              const Content = (
                <>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">
                    {card.title}
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-0.5">
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </>
              );

              return card.href ? (
                <a
                  key={card.title}
                  href={card.href}
                  className="bg-white rounded-3xl border border-border p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  {Content}
                </a>
              ) : (
                <div
                  key={card.title}
                  className="bg-white rounded-3xl border border-border p-8 shadow-sm"
                >
                  {Content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Side panel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-border p-8 lg:p-10 shadow-sm">
              <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
                Send a Message
              </p>
              <h2 className="font-display text-3xl font-bold mb-2">
                We&rsquo;d Love to Hear From You
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and it will open in your email app, ready to
                send to our team at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>

              <ContactForm />
            </div>

            {/* Side panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="gad-gradient rounded-3xl p-8 text-white relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-bold mb-3">
                    Interested in Membership?
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    State and local universities, government agencies, LGUs, and
                    civil society organizations across Region XI are welcome to
                    join the Network.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-primary hover:bg-white/90 border-white"
                    asChild
                  >
                    <Link href="/about">
                      Learn About RGAN XI{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-border p-8 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-4">
                  Follow Our Advocacy
                </h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Stay updated on the Regional GAD Summit, journal releases, and
                  network announcements.
                </p>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">
              FAQs
            </p>
            <h2 className="font-display text-4xl font-bold">
              Common Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h3 className="font-display font-bold mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
