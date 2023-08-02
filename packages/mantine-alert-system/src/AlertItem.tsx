import { useRef, useEffect } from 'react';
import { Alert } from '@mantine/core';
import { AlertData, AlertTransition, TransitionStatus } from './types';
import { useStyles } from './AlertItem.styles';

export interface AlertItemProps extends AlertData, AlertTransition {
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
  transitionMode,
  transitionDuration,
  transitionStatus,
  ...props
}) => {
  // console.log(`${id} on ${transitionStatus}`);
  const { classes } = useStyles({ transitionMode, transitionDuration, transitionStatus, inline });
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
  }, []);

  useEffect(() => {
    handleDelayedHide();
    return cancelDelayedHide;
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
