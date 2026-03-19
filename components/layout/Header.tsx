"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    let rafId: number | null = null;

    const updateVisibility = () => {
      const hero = document.getElementById("hero-scroll");
      if (!hero) {
        setPastHero(false);
        return;
      }
      const heroBottom = hero.offsetTop + hero.offsetHeight - 1;
      setPastHero(window.scrollY > heroBottom);
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
  }, [isHome]);

  const slideHeaderAway = isHome && pastHero;
  const overDarkHero = isHome && !pastHero;
  const darkBar = !overDarkHero;

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-transform duration-300 ${
        overDarkHero
          ? "bg-white/40 backdrop-blur"
          : "border-b border-white/10 bg-horizon shadow-md"
      } ${slideHeaderAway ? "-translate-y-full" : "translate-y-0"}`}
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
        <nav className="hidden items-center gap-6 text-sm font-medium text-white lg:flex [&_a]:hover:text-white/80">
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/blog">Blog & Deals</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/book" className="hidden lg:block">
            <Button variant={darkBar ? "outline" : "primary"}>
              Start Booking
            </Button>
          </Link>
          <Link href="/book" className="lg:hidden">
            <Button variant={darkBar ? "outline" : "primary"} size="sm">
              Start Booking
            </Button>
          </Link>
          <div className="lg:hidden">
            <MobileNav darkBar={darkBar} />
          </div>
        </div>
      </div>
    </header>
  );
}
