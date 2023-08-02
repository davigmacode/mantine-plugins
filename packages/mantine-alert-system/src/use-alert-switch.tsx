import { useState } from 'react';
import { randomId } from '@mantine/hooks';
import { AlertData, AlertSwitchActions, AlertTransition } from './types';
import { AlertSwitch } from './AlertSwitch';

export interface UseAlertSwitchProps extends AlertTransition {
  switchMode?: 'in-out' | 'out-in';
}

export type UseAlertSwitch = (props: UseAlertSwitchProps) => [React.ReactNode, AlertSwitchActions];

export const useAlertSwitch: UseAlertSwitch = ({
  switchMode,
  transitionMode,
  transitionDuration,
}) => {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const show: AlertSwitchActions['show'] = (data) => {
    const id = data.id || randomId();
    setAlert({ ...data, id });
    return id;
  };

  const hide: AlertSwitchActions['hide'] = () => setAlert(null);

  const actions = { show, hide };

  const content = (
    <AlertSwitch
      data={alert}
      onHide={hide}
      switchMode={switchMode}
      transitionMode={transitionMode}
      transitionDuration={transitionDuration}
    />
  );

  return [content, actions];
};
