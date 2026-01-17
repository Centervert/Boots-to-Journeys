"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const services = [
  "All-Inclusive & Resorts",
  "Cruises",
  "Destinations",
  "Faith-Based & Mission Teams",
  "Family Travel",
  "Group Travel",
  "Luxury Travel",
  "Romance & Honeymoons",
];

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Destinations", href: "/destinations" },
  { label: "Blog & Deals", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mist text-horizon"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-xl">☰</span>
      </button>
      <div
        className={`fixed inset-0 z-50 transition ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          className={`absolute inset-0 bg-charcoal/70 transition ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        <nav
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white p-6 shadow-xl transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/logo-btj.png"
              alt="Boots to Journeys"
              width={180}
              height={60}
              className="h-10 w-auto"
            />
            <button
              type="button"
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-mist text-horizon"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="mt-8 space-y-6">
            <div className="space-y-3">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-base font-medium text-horizon"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean">
                Services
              </p>
              <div className="mt-3 space-y-2">
                {services.map((service) => (
                  <Link
                    key={service}
                    href="/services"
                    className="block text-sm text-charcoal"
                    onClick={() => setIsOpen(false)}
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={() => setIsOpen(false)}>
              Book Now
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
