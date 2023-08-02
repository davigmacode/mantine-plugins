import { UseAlertStackStateProps, useAlertStackState } from './use-alert-stack-state';
import { AlertStackActions, AlertSpacing, AlertTransition } from './types';
import { AlertStack } from './AlertStack';

export interface UseAlertStackProps extends UseAlertStackStateProps, AlertTransition {
  spacing?: AlertSpacing;
}

export type UseAlertStack = (
  props: UseAlertStackProps
) => [content: React.ReactNode, actions: AlertStackActions];

export const useAlertStack: UseAlertStack = ({
  limit,
  spacing,
  transitionMode,
  transitionDuration,
  initialValues,
}) => {
  const [{ state }, actions] = useAlertStackState({ limit, initialValues });

  const content = (
    <AlertStack
      state={state}
      actions={actions}
      transitionMode={transitionMode}
      transitionDuration={transitionDuration}
      spacing={spacing}
    />
  );

  return [content, actions];
};
