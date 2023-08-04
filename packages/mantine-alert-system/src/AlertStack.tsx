import { useRef } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { AlertStackActions, AlertData, AlertTransitionProps, AlertSpacing } from './types';
import { AlertItem } from './AlertItem';

export interface AlertStackProps extends AlertTransitionProps {
  state: AlertData[];
  actions: AlertStackActions;
  spacing?: AlertSpacing;
}

export const AlertStack: React.FC<AlertStackProps> = ({
  state,
  actions,
  spacing = 'xs',
  transition,
  transitionDuration = 300,
}) => {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  return (
    <TransitionGroup component={null}>
      {state.map((data) => (
        <Transition
          key={data.id}
          timeout={transitionDuration}
          nodeRef={{ current: refs.current[data.id] }}
          unmountOnExit
        >
          {(transitionStatus) => (
            <AlertItem
              {...data}
              onHide={() => actions.hide(data.id)}
              nodeRef={(node) => {
                refs.current[data.id] = node;
              }}
              transition={transition}
              transitionDuration={transitionDuration}
              transitionStatus={transitionStatus}
              my={spacing}
            />
          )}
        </Transition>
      ))}
    </TransitionGroup>
  );
};
