import { createStyles } from "@mantine/core";
import { AlertTransitionProps, TransitionStatus, TransitionFn } from "./types";

const FALLBACK_TRANSITION: TransitionFn = () => ({});

interface UseStylesProps extends AlertTransitionProps {
  inline: boolean;
  transitionStatus: TransitionStatus;
}

export const useStyles = createStyles((theme, props: UseStylesProps) => {
  const {
    transition = FALLBACK_TRANSITION,
    transitionDuration = 300,
    transitionStatus,
    inline,
  } = props;
  return {
    root: {
      ...{
        transition: `all ${transitionDuration}ms ease-in-out`,
        opacity: transitionStatus === "entered" ? 1 : 0,
      },
      ...transition(transitionStatus),
    },
    wrapper: {
      alignItems: inline ? "center" : undefined,
    },
    body: {
      display: inline ? "flex" : undefined,
      alignItems: inline ? "center" : undefined,
    },
    title: {
      marginBottom: inline ? 0 : undefined,
      paddingRight: inline ? "1rem" : undefined,
    },
    icon: {
      marginRight: inline ? ".5rem" : undefined,
    },
  };
});
