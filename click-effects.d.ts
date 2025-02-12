declare module "click-effects" {
  export function enableClickEffects(
    target: HTMLElement | Document,
    options?: {
      effectType?: "valentines" | "celebration" | "stars" | "snow" | "fire" | "confetti" | "bubbles";
      count?: number;
      sizeRange?: [number, number];
      duration?: number;
    }
  ): void;
}
