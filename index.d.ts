declare module "@unicorn-poo/pizzazz" {
  export function addPizzazz(
    target: HTMLElement | Document,
    options?: {
      effectType?: 'valentines' | 'celebration' | 'stars' | 'snow' | 'fire' | 'confetti' | 'bubbles' | 'ghost' | 'balloon' | 'bat' | 'pumpkin' | 'egg' | 'bunny';
      count?: number;
      sizeRange?: [number, number];
      duration?: number;
    }
  ): void;

  export default addPizzazz;
}
