"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const TOTAL_FRAMES = 782;
const MOBILE_FRAME_STEP = 2;
const MOBILE_FRAME_COUNT = Math.floor(TOTAL_FRAMES / MOBILE_FRAME_STEP);
const ZOOM_MAX = 1.08;
const FRAME_VERSION = "v2";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeInOutCubic = (value: number) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

const getFrameNumber = (index: number, isMobile: boolean) =>
  isMobile ? index * MOBILE_FRAME_STEP + 1 : index + 1;

const formatFrameSrc = (index: number, isMobile: boolean) => {
  const frame = getFrameNumber(index, isMobile);
  return `/hero-video/ezgif-frame-${String(frame).padStart(
    3,
    "0"
  )}.jpg?v=${FRAME_VERSION}`;
};

export function HeroScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const progressRef = useRef({ frame: 0, progress: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFirstFrame, setHasFirstFrame] = useState(false);

  const frameCount = useMemo(
    () => (isMobile ? MOBILE_FRAME_COUNT : TOTAL_FRAMES),
    [isMobile]
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let mounted = true;
    imagesRef.current = [];
    loadedRef.current = [];
    setIsLoaded(false);
    setHasFirstFrame(false);

    let loadedCount = 0;
    const totalToLoad = frameCount;

    const loadImage = (i: number) => {
      if (imagesRef.current[i]) return;
      const img = new Image();
      img.src = formatFrameSrc(i, isMobile);
      img.onload = () => {
        loadedRef.current[i] = true;
        loadedCount += 1;
        if (mounted && i === 0) {
          setHasFirstFrame(true);
        }
        if (mounted && loadedCount === 1) {
          drawFrame(0, 0);
        }
        if (mounted && loadedCount === totalToLoad) {
          setIsLoaded(true);
        }
      };
      imagesRef.current[i] = img;
    };

    const criticalCount = Math.min(24, totalToLoad);
    for (let i = 0; i < criticalCount; i += 1) {
      loadImage(i);
    }

    const remaining: number[] = [];
    for (let i = criticalCount; i < totalToLoad; i += 1) {
      remaining.push(i);
    }

    let idleId: number | ReturnType<typeof setTimeout> | null = null;
    const loadRemaining = () => {
      while (remaining.length) {
        const next = remaining.shift();
        if (typeof next === "number") loadImage(next);
        if (remaining.length % 8 === 0) break;
      }
      if (remaining.length) {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(loadRemaining);
        } else {
          idleId = setTimeout(loadRemaining, 16);
        }
      }
    };

    if (remaining.length) {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadRemaining);
      } else {
        idleId = setTimeout(loadRemaining, 16);
      }
    }

    return () => {
      mounted = false;
      if (idleId !== null) {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleId as number);
        } else {
          clearTimeout(idleId);
        }
      }
    };
  }, [frameCount, isMobile]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      sizeRef.current = { width, height, dpr };
      drawFrame(progressRef.current.frame, progressRef.current.progress);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const section = sectionRef.current;
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const end = sectionTop + sectionHeight - viewportHeight;
        const rawProgress = (scrollY - sectionTop) / (end - sectionTop);
        const progress = clamp(rawProgress, 0, 1);
        const frameIndex = Math.floor(progress * (frameCount - 1));

        progressRef.current = { frame: frameIndex, progress };
        setScrollProgress(progress);
        drawFrame(frameIndex, progress);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [frameCount]);

  const drawFrame = (frameIndex: number, progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let image = imagesRef.current[frameIndex];
    if (!image || !loadedRef.current[frameIndex]) {
      for (let offset = 1; offset < frameCount; offset += 1) {
        const prev = frameIndex - offset;
        const next = frameIndex + offset;
        if (prev >= 0 && loadedRef.current[prev]) {
          image = imagesRef.current[prev];
          break;
        }
        if (next < frameCount && loadedRef.current[next]) {
          image = imagesRef.current[next];
          break;
        }
      }
    }
    if (!image || !image.complete) return;

    const { width, height } = sizeRef.current;
    const zoom = 1 + (ZOOM_MAX - 1) * easeInOutCubic(progress);

    const canvasRatio = width / height;
    const imageRatio = image.width / image.height;

    let drawWidth = width;
    let drawHeight = height;

    if (imageRatio > canvasRatio) {
      drawHeight = height * zoom;
      drawWidth = drawHeight * imageRatio;
    } else {
      drawWidth = width * zoom;
      drawHeight = drawWidth / imageRatio;
    }

    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };

  const copyProgress = clamp((scrollProgress - 0.05) / 0.3, 0, 1);
  const headlineOpacity = 0.05 + 0.9 * easeInOutCubic(copyProgress);
  const headlineTranslate = 28 * (1 - easeInOutCubic(copyProgress));
  const ctaProgress = clamp((scrollProgress - 0.65) / 0.2, 0, 1);

  return (
    <section
      id="hero-scroll"
      ref={sectionRef}
      className={`${isMobile ? "h-[200vh]" : "h-[260vh]"} -mt-20`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">
        <img
          src={`/hero-fallback-v2.jpg?v=${FRAME_VERSION}`}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hasFirstFrame ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/10" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"
          aria-hidden="true"
        />
        <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-10 lg:px-16">
          <div className="text-center text-white drop-shadow">
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em] text-sunset"
              style={{
                opacity: headlineOpacity,
                transform: `translateY(${headlineTranslate}px)`,
              }}
            >
              Veteran-Owned Travel Concierge
            </p>
            <h1
              className="mt-6 font-display text-4xl leading-tight text-white/90 sm:text-6xl lg:text-7xl"
              style={{
                opacity: headlineOpacity,
                transform: `translateY(${headlineTranslate}px)`,
              }}
            >
              Bespoke journeys, handled with military precision.
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg"
              style={{
                opacity: headlineOpacity,
                transform: `translateY(${headlineTranslate}px)`,
              }}
            >
              We curate luxury vacations, group trips, and exclusive deals so
              you can focus on the adventure. Book a consult to start planning.
            </p>
            {!isLoaded && (
              <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/70">
                Loading destination reel...
              </p>
            )}
          </div>
        </div>
        <div
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/70"
          style={{ opacity: 1 - scrollProgress }}
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
