"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type FadeInImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  priority?: boolean;
  /** When set with height, uses intrinsic sizing instead of fill (parent must not rely on fill). */
  width?: number;
  height?: number;
};

export function FadeInImage({
  src,
  alt,
  className,
  style,
  sizes = "(max-width: 1024px) 100vw, 33vw",
  priority,
  width,
  height,
}: FadeInImageProps) {
  const [loaded, setLoaded] = useState(false);
  const hasDeferred = useRef(false);

  const finishFade = () => {
    if (hasDeferred.current) return;
    hasDeferred.current = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLoaded(true));
    });
  };

  const fadeStyle = {
    opacity: loaded ? 1 : 0,
    transition: "opacity 0.35s ease-out",
    ...style,
  } as React.CSSProperties;

  if (width != null && height != null) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={fadeStyle}
        sizes={sizes}
        priority={priority}
        onLoad={finishFade}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      style={fadeStyle}
      sizes={sizes}
      priority={priority}
      onLoadingComplete={finishFade}
    />
  );
}
