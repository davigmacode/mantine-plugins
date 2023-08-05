import { useQueue, randomId } from '@mantine/hooks';
import { AlertStackActions, AlertData } from './types';

export interface AlertStackStateValue {
  state: AlertData[];
  queue: AlertData[];
}

export interface UseAlertStackStateProps {
  limit?: number;
  initialValues?: AlertData[];
}

export type UseAlertStackState = (
  props?: UseAlertStackStateProps
) => [value: AlertStackStateValue, actions: AlertStackActions];

export const useAlertStackState: UseAlertStackState = ({ limit = 3, initialValues = [] } = {}) => {
  const {
    state,
    queue,
    update: updateStateAndQueue,
    cleanQueue,
  } = useQueue<AlertData>({
    initialValues,
    limit,
  });

  const show: AlertStackActions['show'] = (data) => {
    const id = data.id || randomId();
    updateStateAndQueue((value) => {
      if (id && value.some((n) => n.id === id)) {
        return value;
      }

      return [...value, { ...data, id }];
    });

    return id;
  };

  const update: AlertStackActions['update'] = (data) =>
    updateStateAndQueue((value) => {
      const index = value.findIndex((n) => n.id === data.id);

      if (index === -1) {
        return value;
      }

      const newAlerts = [...value];
      newAlerts[index] = data;

      return newAlerts;
    });

  const hide: AlertStackActions['hide'] = (id) =>
    updateStateAndQueue((value) =>
      value.filter((data) => {
        if (data.id === id) {
          typeof data.onClose === 'function' && data.onClose(data);
          return false;
        }

        return true;
      })
    );

  const clean: AlertStackActions['clean'] = () => updateStateAndQueue(() => []);

  const value = { state, queue };

  const actions = { show, update, hide, clean, cleanQueue };

  return [value, actions];
};
