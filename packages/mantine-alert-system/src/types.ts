import type { SetOptional } from 'type-fest';
import type { AlertProps, SystemProp, SpacingValue } from '@mantine/core';

export type { TransitionStatus } from 'react-transition-group';

export type TransitionMode = 'fade' | 'scale' | 'raise' | 'fall';

export interface AlertData extends Omit<AlertProps, 'onClose'> {
  id: string;
  inline?: boolean;
  sticky?: boolean;
  closeButton?: boolean;
  closeTimeout?: boolean | number;
  onClose?(props: AlertData): void;
  onOpen?(props: AlertData): void;
}

export type AlertShow = (data: SetOptional<AlertData, 'id'>) => string;

export interface AlertShowSeverities {
  success: AlertShow;
  info: AlertShow;
  warning: AlertShow;
  error: AlertShow;
}

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

export interface AlertTransition {
  transitionMode?: TransitionMode;
  transitionDuration?: number;
}

export type AlertSpacing = SystemProp<SpacingValue>;
