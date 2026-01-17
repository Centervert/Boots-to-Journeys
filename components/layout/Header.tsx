"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

const services = [
  { label: "All-Inclusive & Resorts", href: "/services/all-inclusive" },
  { label: "Cruises", href: "/services/cruises" },
  { label: "Destinations", href: "/services/destinations" },
  { label: "Faith-Based & Mission Teams", href: "/services/faith-based" },
  { label: "Family Travel", href: "/services/family" },
  { label: "Group Travel", href: "/services/group" },
  { label: "Luxury Travel", href: "/services/luxury" },
  { label: "Romance & Honeymoons", href: "/services/romance" },
];

export function Header() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const updateVisibility = () => {
      const hero = document.getElementById("hero-scroll");
      if (!hero) {
        setIsHidden(false);
        return;
      }
      const heroBottom = hero.offsetTop + hero.offsetHeight - 1;
      setIsHidden(window.scrollY > heroBottom);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full bg-transparent transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-btj.png"
            alt="Boots to Journeys"
            width={220}
            height={80}
            className="h-12 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white lg:flex">
          <Link href="/" className="hover:text-white/80">
            Home
          </Link>
          <Link href="/about" className="hover:text-white/80">
            About
          </Link>
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-white/80"
            >
              Services
              <span className="text-xs">▾</span>
            </button>
            <div className="absolute left-0 top-full hidden w-72 rounded-2xl border border-mist bg-white p-4 shadow-xl group-hover:block">
              <div className="grid gap-2 text-sm text-charcoal">
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="rounded-lg px-3 py-2 hover:bg-mist/60"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/destinations" className="hover:text-white/80">
            Destinations
          </Link>
          <Link href="/blog" className="hover:text-white/80">
            Blog & Deals
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/book" className="hidden lg:block">
            <Button>Book Now</Button>
          </Link>
          <Link href="/book" className="lg:hidden">
            <Button size="sm">Book Now</Button>
          </Link>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
