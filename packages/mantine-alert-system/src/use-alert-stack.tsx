import { UseAlertStackStateProps, useAlertStackState } from './use-alert-stack-state';
import { AlertStackActions, AlertSpacing, AlertTransitionProps } from './types';
import { AlertStack } from './AlertStack';

export interface UseAlertStackProps extends UseAlertStackStateProps, AlertTransitionProps {
  spacing?: AlertSpacing;
}

export type UseAlertStack = (
  props?: UseAlertStackProps
) => [content: React.ReactNode, actions: AlertStackActions];

export const useAlertStack: UseAlertStack = ({
  limit,
  spacing,
  transition,
  transitionDuration,
  initialValues,
} = {}) => {
  const [{ state }, actions] = useAlertStackState({ limit, initialValues });

  const content = (
    <AlertStack
      state={state}
      actions={actions}
      transition={transition}
      transitionDuration={transitionDuration}
      spacing={spacing}
    />
  );

  return [content, actions];
};
