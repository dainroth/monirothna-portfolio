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
    // Defer Lenis initialization to reduce TBT
    const timeoutId =
      requestIdleCallback?.(
        () => {
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
        },
        { timeout: 1000 },
      ) ??
      setTimeout(() => {
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
      }, 100);

    return () => {
      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      } else {
        cancelIdleCallback?.(timeoutId as number);
      }
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
