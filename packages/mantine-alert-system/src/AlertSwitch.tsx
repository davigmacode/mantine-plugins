import { useRef } from 'react';
import { Transition, SwitchTransition } from 'react-transition-group';
import { AlertData, AlertTransitionProps } from './types';
import { AlertItem } from './AlertItem';

export interface AlertSwitchProps extends AlertTransitionProps {
  switchMode?: 'in-out' | 'out-in';
  data: AlertData | null;
  onHide: () => void;
}

export const AlertSwitch: React.FC<AlertSwitchProps> = ({
  data,
  onHide,
  switchMode,
  transition,
  transitionDuration = 300,
}) => {
  const id = data?.id || 'empty';
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  return (
    <SwitchTransition mode={switchMode}>
      <Transition
        key={id}
        timeout={transitionDuration}
        nodeRef={{ current: refs.current[id] }}
        unmountOnExit
      >
        {(transitionStatus) =>
          !data ? (
            <></>
          ) : (
            <AlertItem
              {...data}
              id={id}
              onHide={onHide}
              nodeRef={(node) => {
                refs.current[id] = node;
              }}
              transition={transition}
              transitionDuration={transitionDuration}
              transitionStatus={transitionStatus}
            />
          )
        }
      </Transition>
    </SwitchTransition>
  );
};
