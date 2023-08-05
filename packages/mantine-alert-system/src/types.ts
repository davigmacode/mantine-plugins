import type { SetOptional } from "type-fest";
import type { AlertProps, SystemProp, SpacingValue } from "@mantine/core";
import type { TransitionFn } from "./transitions";

export interface AlertData extends Omit<AlertProps, "onClose"> {
  id: string;
  inline?: boolean;
  sticky?: boolean;
  closeButton?: boolean;
  closeTimeout?: boolean | number;
  onClose?(props: AlertData): void;
  onOpen?(props: AlertData): void;
}

export type AlertShow = (data: SetOptional<AlertData, "id">) => string;

export interface AlertStackActions {
  show: AlertShow;
  update: (data: AlertData) => void;
  hide: (id: string) => void;
  clean: () => void;
  cleanQueue: () => void;
}

export interface AlertSwitchActions {
  show: AlertShow;
  hide: () => void;
}

export interface AlertTransitionProps {
  transitionDuration?: number;
  transition?: TransitionFn;
}

export type AlertSpacing = SystemProp<SpacingValue>;
