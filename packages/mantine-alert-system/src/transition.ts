import { TransitionFn } from './types';

export const SCALE_TRANSITION: TransitionFn = (status) => ({
  transform: `scaleY(${status === 'entered' ? 1 : 0})`,
});

export const RAISE_TRANSITION: TransitionFn = (status) => ({
  transform: `translateY(${status === 'entered' ? 0 : 5}px)`,
});

export const FALL_TRANSITION: TransitionFn = (status) => ({
  transform: `translateY(${status === 'entered' ? 0 : -5}px)`,
});
