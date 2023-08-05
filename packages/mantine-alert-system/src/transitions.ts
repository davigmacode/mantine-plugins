import type { CSSObject } from "@mantine/core";
import type { TransitionStatus } from "react-transition-group";

export type { TransitionStatus } from "react-transition-group";

export type TransitionFn = (status: TransitionStatus) => CSSObject;

export const SCALE_TRANSITION: TransitionFn = (status) => ({
  transform: `scaleY(${status === "entered" ? 1 : 0})`,
});

export const RAISE_TRANSITION: TransitionFn = (status) => ({
  transform: `translateY(${status === "entered" ? 0 : 5}px)`,
});

export const FALL_TRANSITION: TransitionFn = (status) => ({
  transform: `translateY(${status === "entered" ? 0 : -5}px)`,
});
