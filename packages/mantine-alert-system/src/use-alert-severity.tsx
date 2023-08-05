import { IconCheck, IconInfoCircle, IconAlertTriangle, IconX } from '@tabler/icons-react';
import { AlertShow } from './types';

export interface AlertShowSeverities {
  success: AlertShow;
  info: AlertShow;
  warning: AlertShow;
  error: AlertShow;
}

interface AlertSeverityOptions {
  iconSize?: string | number;
}

export const useAlertSeverity = (show: AlertShow, props: AlertSeverityOptions = {}) => {
  const { iconSize = '1.1rem' } = props;

  const success: AlertShow = (data) => {
    const severity = { color: 'green', title: 'Success', icon: <IconCheck size={iconSize} /> };
    return show({ ...severity, ...data });
  };

  const info: AlertShow = (data) => {
    const severity = { color: 'blue', title: 'Info', icon: <IconInfoCircle size={iconSize} /> };
    return show({ ...severity, ...data });
  };

  const warning: AlertShow = (data) => {
    const severity = { color: 'yellow', title: 'Warning', icon: <IconAlertTriangle size={iconSize} /> };
    return show({ ...severity, ...data });
  };

  const error: AlertShow = (data) => {
    const severity = { color: 'red', title: 'Error', icon: <IconX size={iconSize} /> };
    return show({ ...severity, ...data });
  };

  return { success, info, warning, error };
};
