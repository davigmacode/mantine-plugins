import { useRef, useEffect } from 'react';
import { Alert } from '@mantine/core';
import { useStyles } from './AlertItem.styles';
import type { AlertData, AlertTransitionProps } from './types';
import type { TransitionStatus } from "./transitions";

export interface AlertItemProps extends AlertData, AlertTransitionProps {
  onHide(): void;
  nodeRef: React.ForwardedRef<HTMLDivElement>;
  transitionStatus: TransitionStatus;
}

export const AlertItem: React.FC<AlertItemProps> = ({
  id,
  nodeRef,
  className,
  inline = false,
  sticky = false,
  closeButton = true,
  closeTimeout = 3000,
  children,
  onHide,
  onOpen,
  onClose,
  transition,
  transitionDuration,
  transitionStatus,
  ...props
}) => {
  // console.log(`${id} on ${transitionStatus}`);
  const { classes } = useStyles({ transition, transitionDuration, transitionStatus, inline });
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>();
  const handleHide = () => {
    onHide();
    clearTimeout(hideTimeout.current);
  };

  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current);
  };

  const handleDelayedHide = () => {
    if (!sticky && typeof closeTimeout === 'number') {
      hideTimeout.current = setTimeout(handleHide, closeTimeout);
    }
  };

  useEffect(() => {
    if (typeof onOpen === 'function') {
      onOpen({
        id,
        closeTimeout,
        children,
        onOpen,
        onClose,
        ...props,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleDelayedHide();
    return cancelDelayedHide;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeTimeout]);

  return (
    <Alert
      {...props}
      onClose={handleHide}
      withCloseButton={!sticky && closeButton}
      onMouseEnter={cancelDelayedHide}
      onMouseLeave={handleDelayedHide}
      classNames={classes}
      ref={nodeRef}
    >
      {children}
    </Alert>
  );
};
