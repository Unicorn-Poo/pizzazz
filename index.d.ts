declare module "@unicorn-poo/pizzazz" {
  export type EffectType = 'valentines' | 'celebration' | 'stars' | 'snow' | 'fire' | 'confetti' | 'bubbles' | 'ghost' | 'balloon' | 'bat' | 'pumpkin' | 'egg' | 'bunny';
  export type Easing = 'ease-out' | 'ease-in-out' | 'bounce' | 'spring' | 'gentle';

  export interface PizzazzOptions {
    effectType?: EffectType;
    character?: string;
    count?: number;
    sizeRange?: [number, number];
    duration?: number;
    spread?: number;
    gravity?: boolean;
    rotate?: boolean;
    easing?: Easing;
    trigger?: 'click' | 'hover';
    throttle?: number;
  }

  export function createClickEffect(event: MouseEvent, options?: PizzazzOptions): void;
  export function addPizzazz(target?: HTMLElement | Document, options?: PizzazzOptions): () => void;

  export default addPizzazz;
}
