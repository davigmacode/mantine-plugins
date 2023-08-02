import { createStyles } from '@mantine/core';
import { AlertTransition, TransitionStatus } from './types';

interface UseStylesProps extends AlertTransition {
  inline: boolean;
  transitionStatus: TransitionStatus;
}

export const useStyles = createStyles((theme, props: UseStylesProps) => {
  const { transitionMode = 'fade', transitionDuration = 300, transitionStatus, inline } = props;
  return {
    root: {
      transition: `all ${transitionDuration}ms ease-in-out`,
      opacity: transitionStatus === 'entered' ? 1 : 0,
      transform:
        transitionMode === 'scale'
          ? `scaleY(${transitionStatus === 'entered' ? 1 : 0})`
          : transitionMode === 'raise'
          ? `translateY(${transitionStatus === 'entered' ? 0 : 5}px)`
          : transitionMode === 'fall'
          ? `translateY(${transitionStatus === 'entered' ? 0 : -5}px)`
          : undefined,
    },
    wrapper: {
      alignItems: inline ? 'center' : undefined,
    },
    body: {
      display: inline ? 'flex' : undefined,
      alignItems: inline ? 'center' : undefined,
    },
    title: {
      marginBottom: inline ? 0 : undefined,
      paddingRight: inline ? '1rem' : undefined,
    },
    icon: {
      marginRight: inline ? '.5rem' : undefined,
    },
  };
});
