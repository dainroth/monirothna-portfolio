"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;
    let idleCallbackId: number | undefined;

    const initLenis = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    // Defer Lenis initialization to reduce TBT
    if (typeof requestIdleCallback !== "undefined") {
      idleCallbackId = requestIdleCallback(initLenis, { timeout: 1000 });
    } else {
      timeoutId = window.setTimeout(initLenis, 100);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      if (
        idleCallbackId !== undefined &&
        typeof cancelIdleCallback !== "undefined"
      ) {
        cancelIdleCallback(idleCallbackId);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
