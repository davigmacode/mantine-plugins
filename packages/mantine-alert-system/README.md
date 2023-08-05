# Mantine alert system

[![npm](https://img.shields.io/npm/dm/mantine-alert-system
)](https://www.npmjs.com/package/mantine-alert-system)

Alert system based on Mantine components.

[demo](https://mantine-plugins.vercel.app/mantine-alert-system)

## Installation

```bash
# With yarn
yarn add mantine-alert-system @mantine/core @mantine/hooks

# With npm
npm install mantine-alert-system @mantine/core @mantine/hooks
```

## Usage

#### Cross faded switch single alert
```ts
import { Button } from "@mantine/core";
import { useAlertSwitch } from "mantine-alert-system";

const SwitchedAlert = () => {
  const [alert, { show, hide }] = useAlertSwitch();
  return (
    <>
      <Button
        size="xs"
        mb="md"
        onClick={() =>
          show({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Alert
      </Button>
      {alert}
    </>
  );
};
```
#### Stacked multiple alert
```ts
import { Button } from "@mantine/core";
import { useAlertStack } from "mantine-alert-system";

const StackedAlert = () => {
  const [alerts, { show, hide }] = useAlertStack();
  return (
    <>
      <Button
        size="xs"
        mb="md"
        onClick={() =>
          show({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Alert
      </Button>
      {alerts}
    </>
  );
};
```

#### With severity
Optionally use severity [`success`, `info`, `warning`, `error`] with no hassle

```ts
import { Button } from "@mantine/core";
import { useAlertSwitch, useAlertStack } from "mantine-alert-system";
import { useAlertSeverity } from "mantine-alert-system/severity";

const SwitchedAlertWithSeverity = () => {
  const [alert, { show, hide }] = useAlertSwitch();
  const showAlert = useAlertSeverity(show);
  return (
    <>
      <Button
        size="xs"
        mb="md"
        onClick={() =>
          showAlert.error({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Alert
      </Button>
      {alert}
    </>
  );
};

const StackedAlertWithSeverity = () => {
  const [alerts, { show, hide }] = useAlertStack();
  const showAlert = useAlertSeverity(show);
  return (
    <>
      <Button
        size="xs"
        mb="md"
        onClick={() =>
          showAlert.warning({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Alert
      </Button>
      {alerts}
    </>
  );
};
```

#### Custom transition

Use predefined transitions [`RAISE_TRANSITION`, `FALL_TRANSITION`, `SCALE_TRANSITION`] or create your own transition with custom function
```ts
import { Button } from "@mantine/core";
import { useAlertSwitch, useAlertStack } from "mantine-alert-system";
import { useAlertSeverity } from "mantine-alert-system/severity";
import { RAISE_TRANSITION } from "mantine-alert-system/transitions";

// use predefined transition
const SwitchedAlertWithCustomTransition = () => {
  const [alert, { show, hide }] = useAlertSwitch({
    transitionDuration: 300,
    transition: RAISE_TRANSITION,
  });
  const showAlert = useAlertSeverity(show);
  return (
    <>
      <Button
        size="xs"
        mb="md"
        onClick={() =>
          showAlert.error({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Alert
      </Button>
      {alert}
    </>
  );
};

// use custom function
const StackedAlertWithCustomTransition = () => {
  const [alerts, { show, hide }] = useAlertStack({
    transitionDuration: 300,
    transition: (status) => ({
      transform: `scaleY(${status === 'entered' ? 1 : 0})`,
    }),
  });
  const showAlert = useAlertSeverity(show);
  return (
    <>
      <Button
        size="xs"
        mb="md"
        onClick={() =>
          showAlert.warning({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Alert
      </Button>
      {alerts}
    </>
  );
};
```