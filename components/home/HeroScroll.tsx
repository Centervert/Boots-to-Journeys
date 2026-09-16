"use client";

import NextImage from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Ref,
} from "react";

const TOTAL_FRAMES = 782;
const FRAME_STEP = 2;
const ZOOM_MAX = 1.08;
const FRAME_VERSION = "v2";
const CRITICAL_FRAME_COUNT = 3;
const WINDOW_RADIUS = 28;
const LOOKAHEAD_FRAMES = 18;
const MAX_CONCURRENT_LOADS = 8;
const MAX_LOADED_FRAMES = 140;
const HERO_VIDEO_SRC = "/hero-video/destination-reel.mp4";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeInOutCubic = (value: number) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

const getFrameNumber = (index: number) => index * FRAME_STEP + 1;

const formatFrameSrc = (index: number) => {
  const frame = getFrameNumber(index);
  return `/hero-video/ezgif-frame-${String(frame).padStart(
    3,
    "0"
  )}.jpg?v=${FRAME_VERSION}`;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function measureHeroProgress(section: HTMLElement) {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const end = sectionTop + sectionHeight - viewportHeight;
  const denominator = end - sectionTop;
  return denominator <= 0
    ? 0
    : clamp((scrollY - sectionTop) / denominator, 0, 1);
}

function HeroCopy({
  copyRef,
  status,
  animate = false,
}: {
  copyRef?: Ref<HTMLDivElement>;
  status?: string | null;
  animate?: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full items-center justify-center px-6 sm:px-10 lg:px-16">
      <div
        ref={copyRef}
        className="text-center text-white will-change-[transform,opacity]"
        style={{
          textShadow: "0 2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)",
          ...(animate
            ? { opacity: 0.5, transform: "translateY(28px)" }
            : undefined),
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sunset">
          Veteran-Owned Travel Concierge
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight text-white/90 sm:text-6xl lg:text-7xl">
          Bespoke journeys, handled with military precision.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg">
          We curate luxury vacations, group trips, and exclusive deals for
          travelers nationwide so you can focus on the adventure. Book a
          consult to start planning.
        </p>
        {status ? (
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/70">
            {status}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function HeroOverlays() {
  return (
    <>
      <div className="absolute inset-0 bg-white/10" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40"
        aria-hidden="true"
      />
    </>
  );
}

function HeroFallbackImage({
  visible,
  onError,
}: {
  visible: boolean;
  onError: () => void;
}) {
  return (
    <NextImage
      src="/hero-fallback-v2.jpg"
      alt=""
      fill
      priority
      sizes="100vw"
      className={`object-cover transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden
      onError={onError}
    />
  );
}

function HeroStatic() {
  const [fallbackFailed, setFallbackFailed] = useState(false);

  return (
    <section id="hero-scroll" className="-mt-20 h-screen">
      <div className="relative h-screen w-full overflow-hidden bg-charcoal">
        {!fallbackFailed && (
          <HeroFallbackImage
            visible
            onError={() => setFallbackFailed(true)}
          />
        )}
        {fallbackFailed && (
          <div className="absolute inset-0 bg-charcoal" aria-hidden="true" />
        )}
        <HeroOverlays />
        <HeroCopy />
      </div>
    </section>
  );
}

function HeroVideoReel({
  isMobile,
  onUnavailable,
}: {
  isMobile: boolean;
  onUnavailable: () => void;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const readyRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const updateCopyStyle = useCallback((progress: number) => {
    const copyEl = copyRef.current;
    const hintEl = scrollHintRef.current;
    const t = clamp((progress - 0.05) / 0.3, 0, 1);
    const ease = easeInOutCubic(t);
    if (copyEl) {
      copyEl.style.opacity = String(0.5 + 0.5 * ease);
      copyEl.style.transform = `translateY(${28 * (1 - ease)}px)`;
    }
    if (hintEl) {
      hintEl.style.opacity = String(1 - progress);
    }
  }, []);

  const scrubTo = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }
    const nextTime = progress * Math.max(video.duration - 0.04, 0);
    if (Math.abs(video.currentTime - nextTime) < 0.012) return;
    try {
      video.currentTime = nextTime;
    } catch {
      /* some browsers reject seeks while metadata is settling */
    }
  }, []);

  const markReady = useCallback(() => {
    const video = videoRef.current;
    if (!video || readyRef.current) return;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    video.pause();
    readyRef.current = true;
    const section = sectionRef.current;
    if (section) scrubTo(measureHeroProgress(section));
    setIsReady(true);
  }, [scrubTo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const failTimer = window.setTimeout(() => {
      if (!readyRef.current) onUnavailable();
    }, 4000);

    const onReady = () => markReady();
    const onFail = () => {
      if (!readyRef.current) onUnavailable();
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("error", onFail);
    video.src = HERO_VIDEO_SRC;
    video.load();
    video.play().then(() => video.pause()).catch(() => {
      /* autoplay can be blocked; metadata listeners still run */
    });

    const pollReady = window.setInterval(() => {
      if (video.readyState >= 2 && video.duration > 0) markReady();
    }, 200);

    return () => {
      window.clearTimeout(failTimer);
      window.clearInterval(pollReady);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("error", onFail);
    };
  }, [markReady, onUnavailable]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const section = sectionRef.current;
        if (!section) return;
        const progress = measureHeroProgress(section);
        scrubTo(progress);
        updateCopyStyle(progress);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [scrubTo, updateCopyStyle]);

  return (
    <section
      id="hero-scroll"
      ref={sectionRef}
      className={`${isMobile ? "h-[200vh]" : "h-[260vh]"} -mt-20`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal relative">
        {!fallbackFailed && (
          <HeroFallbackImage
            visible={!isReady}
            onError={() => setFallbackFailed(true)}
          />
        )}
        {fallbackFailed && !isReady && (
          <div className="absolute inset-0 bg-charcoal" aria-hidden="true" />
        )}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <HeroOverlays />
        <HeroCopy copyRef={copyRef} animate />
        <div
          ref={scrollHintRef}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/70 will-change-[opacity]"
        >
          Scroll
        </div>
      </div>
    </section>
  );
}

function HeroFrameReel({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const progressRef = useRef({ frame: 0, progress: 0 });
  const currentFrameRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFirstFrame, setHasFirstFrame] = useState(false);
  const [useFallbackOnly, setUseFallbackOnly] = useState(false);
  const [fallbackImageFailed, setFallbackImageFailed] = useState(false);

  const frameCount = useMemo(
    () => Math.floor(TOTAL_FRAMES / FRAME_STEP),
    []
  );

  const drawFrame = useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = sizeRef.current;
      const zoom = 1 + (ZOOM_MAX - 1) * easeInOutCubic(progress);
      const canvasRatio = width / height;

      const framePosition = progress * (frameCount - 1);
      const frameIndexA = Math.min(
        Math.floor(framePosition),
        Math.max(0, frameCount - 1)
      );
      const frameIndexB = Math.min(frameIndexA + 1, frameCount - 1);
      const blend = framePosition - frameIndexA;

      const getImage = (index: number): HTMLImageElement | null => {
        const img = imagesRef.current[index];
        if (loadedRef.current[index] && img?.complete) return img;
        for (let offset = 1; offset < frameCount; offset += 1) {
          const prev = index - offset;
          const next = index + offset;
          const prevImg = prev >= 0 ? imagesRef.current[prev] : null;
          if (prev >= 0 && loadedRef.current[prev] && prevImg?.complete)
            return prevImg;
          const nextImg = next < frameCount ? imagesRef.current[next] : null;
          if (next < frameCount && loadedRef.current[next] && nextImg?.complete)
            return nextImg;
        }
        return null;
      };

      const imageA = getImage(frameIndexA);
      const imageB = frameIndexB !== frameIndexA ? getImage(frameIndexB) : imageA;

      const drawOne = (img: HTMLImageElement, alpha: number) => {
        const imageRatio = img.width / img.height;
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
        ctx.globalAlpha = alpha;
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, width, height);

      if (imageA && imageB && blend > 0.001 && blend < 0.999) {
        drawOne(imageA, 1 - blend);
        drawOne(imageB, blend);
      } else if (imageA) {
        drawOne(imageA, 1);
      }
      ctx.globalAlpha = 1;
    },
    [frameCount]
  );

  useEffect(() => {
    let mounted = true;
    imagesRef.current = [];
    loadedRef.current = [];

    let loadedCount = 0;
    let inFlight = 0;
    const loadQueue: number[] = [];

    const fallbackOnlyTimer = window.setTimeout(() => {
      if (mounted && !loadedRef.current[0]) {
        setUseFallbackOnly(true);
      }
    }, 2500);

    const pumpQueue = () => {
      if (!mounted || inFlight >= MAX_CONCURRENT_LOADS || loadQueue.length === 0)
        return;
      const currentFrame = currentFrameRef.current;
      const direction = velocityRef.current >= 0 ? 1 : -1;
      loadQueue.sort((a, b) => {
        const biasA = a >= currentFrame === direction > 0 ? 0 : 8;
        const biasB = b >= currentFrame === direction > 0 ? 0 : 8;
        return (
          Math.abs(a - currentFrame) +
          biasA -
          (Math.abs(b - currentFrame) + biasB)
        );
      });
      while (inFlight < MAX_CONCURRENT_LOADS && loadQueue.length > 0) {
        const i = loadQueue.shift()!;
        if (imagesRef.current[i] || loadedRef.current[i]) continue;
        inFlight += 1;
        const img = new Image();
        imagesRef.current[i] = img;
        img.src = formatFrameSrc(i);
        const onDone = () => {
          inFlight -= 1;
          loadedRef.current[i] = true;
          loadedCount += 1;
          if (mounted && i === 0) setHasFirstFrame(true);
          if (mounted) drawFrame(progressRef.current.progress);
          const criticalReady =
            CRITICAL_FRAME_COUNT <= frameCount &&
            Array.from({ length: CRITICAL_FRAME_COUNT }, (_, k) =>
              loadedRef.current[k]
            ).every(Boolean);
          if (mounted && criticalReady) setIsLoaded(true);
          pumpQueue();
        };
        img.onload = () => {
          if (typeof img.decode === "function") {
            img.decode().then(onDone).catch(onDone);
          } else {
            onDone();
          }
        };
        img.onerror = () => {
          inFlight -= 1;
          loadedRef.current[i] = false;
          imagesRef.current[i] = null;
          pumpQueue();
        };
      }
    };

    const unloadFarthest = () => {
      const current = currentFrameRef.current;
      let farthestIndex = -1;
      let farthestDist = -1;
      for (let i = 0; i < frameCount; i += 1) {
        if (!loadedRef.current[i]) continue;
        const d = Math.abs(i - current);
        if (d > farthestDist) {
          farthestDist = d;
          farthestIndex = i;
        }
      }
      if (farthestIndex >= 0) {
        imagesRef.current[farthestIndex] = null;
        loadedRef.current[farthestIndex] = false;
        loadedCount -= 1;
      }
    };

    const loadImage = (i: number) => {
      if (i < 0 || i >= frameCount) return;
      if (imagesRef.current[i] || loadedRef.current[i]) return;
      if (loadQueue.includes(i)) return;
      loadQueue.push(i);
      pumpQueue();
    };

    const loadWindow = () => {
      if (!mounted) return;
      const current = currentFrameRef.current;
      const ahead = velocityRef.current >= 0 ? LOOKAHEAD_FRAMES : 4;
      const behind = velocityRef.current < 0 ? LOOKAHEAD_FRAMES : 4;
      const low = Math.max(0, current - WINDOW_RADIUS - behind);
      const high = Math.min(frameCount - 1, current + WINDOW_RADIUS + ahead);
      for (let i = low; i <= high; i += 1) {
        if (!loadedRef.current[i] && !imagesRef.current[i]) loadImage(i);
      }
      while (loadedCount > MAX_LOADED_FRAMES) unloadFarthest();
    };

    for (let i = 0; i < Math.min(CRITICAL_FRAME_COUNT, frameCount); i += 1) {
      loadImage(i);
    }

    const windowInterval = window.setInterval(loadWindow, 120);
    const onScrollHint = () => loadWindow();
    window.addEventListener("scroll", onScrollHint, { passive: true });

    return () => {
      mounted = false;
      clearTimeout(fallbackOnlyTimer);
      clearInterval(windowInterval);
      window.removeEventListener("scroll", onScrollHint);
    };
  }, [drawFrame, frameCount]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      sizeRef.current = { width, height, dpr };
      drawFrame(progressRef.current.progress);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [drawFrame]);

  const updateCopyStyle = useCallback((progress: number) => {
    const copyEl = copyRef.current;
    const hintEl = scrollHintRef.current;
    const t = clamp((progress - 0.05) / 0.3, 0, 1);
    const ease = easeInOutCubic(t);
    const opacity = 0.5 + 0.5 * ease;
    const translate = 28 * (1 - ease);
    if (copyEl) {
      copyEl.style.opacity = String(opacity);
      copyEl.style.transform = `translateY(${translate}px)`;
    }
    if (hintEl) {
      hintEl.style.opacity = String(1 - progress);
    }
  }, []);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const section = sectionRef.current;
        if (!section) return;

        const progress = measureHeroProgress(section);
        const frameIndex = Math.min(
          Math.floor(progress * (frameCount - 1)),
          Math.max(0, frameCount - 1)
        );
        velocityRef.current = window.scrollY - lastScrollYRef.current;
        lastScrollYRef.current = window.scrollY;

        currentFrameRef.current = frameIndex;
        progressRef.current = { frame: frameIndex, progress };
        drawFrame(progress);
        updateCopyStyle(progress);
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
  }, [drawFrame, frameCount, updateCopyStyle]);

  return (
    <section
      id="hero-scroll"
      ref={sectionRef}
      className={`${isMobile ? "h-[200vh]" : "h-[260vh]"} -mt-20`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal relative">
        {!fallbackImageFailed && (
          <HeroFallbackImage
            visible={!hasFirstFrame}
            onError={() => setFallbackImageFailed(true)}
          />
        )}
        {fallbackImageFailed && (
          <div className="absolute inset-0 bg-charcoal" aria-hidden="true" />
        )}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />
        <HeroOverlays />
        <HeroCopy
          copyRef={copyRef}
          animate
          status={!isLoaded && !useFallbackOnly ? "Loading destination reel..." : null}
        />
        <div
          ref={scrollHintRef}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/70 will-change-[opacity]"
        >
          Scroll
        </div>
      </div>
    </section>
  );
}

export function HeroScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [useFrames, setUseFrames] = useState(false);
  const handleVideoUnavailable = useCallback(() => setUseFrames(true), []);

  if (prefersReducedMotion) {
    return <HeroStatic />;
  }

  if (useFrames) {
    return (
      <HeroFrameReel key={isMobile ? "mobile-frames" : "desktop-frames"} isMobile={isMobile} />
    );
  }

  return (
    <HeroVideoReel
      key={isMobile ? "mobile-video" : "desktop-video"}
      isMobile={isMobile}
      onUnavailable={handleVideoUnavailable}
    />
  );
}
