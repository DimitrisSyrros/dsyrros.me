import type { ImageMetadata } from 'astro';
import boardingPass from '../assets/props/boarding-pass.png';
import passport from '../assets/props/passport.png';
import card from '../assets/props/card.png';
import receipt from '../assets/props/receipt.png';
import football from '../assets/props/football.png';
import basketball from '../assets/props/basketball.png';

// w = object width below 64rem, wd = from 64rem up (the PNG renders at w × f, f covering the baked shadow)
type Prop = { src: ImageMetadata; f: number; ps: number; pt: number; pb: number; w: string; wd: string };

export const PROPS: Record<string, Prop> = {
  'boarding-pass': { src: boardingPass, f: 1.2189, ps: 0.1094, pt: 0.0642, pb: 0.1887, w: '128px', wd: 'clamp(200px, 20vw, 320px)' },
  passport: { src: passport, f: 1.2847, ps: 0.1424, pt: 0.0814, pb: 0.2441, w: '64px', wd: 'clamp(110px, 11vw, 170px)' },
  card: { src: card, f: 1.2157, ps: 0.1078, pt: 0.0637, pb: 0.1887, w: '112px', wd: 'clamp(190px, 18vw, 280px)' },
  receipt: { src: receipt, f: 1.3345, ps: 0.1673, pt: 0.0982, pb: 0.2909, w: '62px', wd: 'clamp(100px, 9vw, 140px)' },
  football: { src: football, f: 1.2193, ps: 0.1097, pt: 0.0627, pb: 0.188, w: '60px', wd: 'clamp(96px, 9vw, 145px)' },
  basketball: { src: basketball, f: 1.2176, ps: 0.1088, pt: 0.0648, pb: 0.1898, w: '72px', wd: 'clamp(108px, 10vw, 160px)' },
};

/** `sizes` matching the rendered prop width at each breakpoint. */
export const propSizes = (p: Prop) => `(min-width: 64rem) calc(${p.wd} * ${p.f}), calc(${p.w} * ${p.f})`;
