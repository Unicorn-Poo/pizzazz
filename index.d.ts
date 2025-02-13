import { ReactNode } from 'react';
declare module "@unicorn-poo/pizzazz" {
  export function addPizzazz(
    target: HTMLElement | Document,
    options?: {
      effectType?: "valentines" | "celebration" | "stars" | "snow" | "fire" | "confetti" | "bubbles" | "ghost";
      count?: number;
      sizeRange?: [number, number];
      duration?: number;
    }
  ): ReactNode;
}
