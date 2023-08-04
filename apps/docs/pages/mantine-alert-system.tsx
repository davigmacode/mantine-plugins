import { Button, Box, Group, Card, ActionIcon, Text } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";
import {
  useAlertSwitch,
  useAlertStack,
  useAlertSeverity,
  AlertShowSeverities,
  RAISE_TRANSITION,
  FALL_TRANSITION,
} from "mantine-alert-system";

const TriggerAlert = ({ showAlert, cleanAlert }: { showAlert: AlertShowSeverities, cleanAlert: () => void }) => {
  return (
    <Group>
      <Button
        size="xs"
        color="green"
        onClick={() =>
          showAlert.success({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Success
      </Button>
      <Button
        size="xs"
        color="blue"
        onClick={() =>
          showAlert.info({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Info
      </Button>
      <Button
        size="xs"
        color="yellow"
        onClick={() =>
          showAlert.warning({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Warning
      </Button>
      <Button
        size="xs"
        color="red"
        onClick={() =>
          showAlert.error({
            inline: true,
            children: "Message Content",
          })
        }
      >
        Show Error
      </Button>
      <Button
        size="xs"
        color="gray"
        onClick={cleanAlert}
      >
        Clean Alert
      </Button>
    </Group>
  );
};

const SwitchedAlert = () => {
  const [alert, { show, hide }] = useAlertSwitch({
    transition: RAISE_TRANSITION,
    transitionDuration: 300,
  });
  const showAlert = useAlertSeverity(show);
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>Switched Alert</Text>
          <ActionIcon>
            <IconCode size="1.125rem" />
          </ActionIcon>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding mt="md">
        <TriggerAlert showAlert={showAlert} cleanAlert={hide} />
        <Box py="xs">{alert}</Box>
      </Card.Section>
    </Card>
  );
};

const StackedAlert = () => {
  const [alerts, { show, clean }] = useAlertStack({
    limit: 5,
    transition: FALL_TRANSITION,
    transitionDuration: 300,
  });
  const showAlert = useAlertSeverity(show);
  return (
    <Card withBorder shadow="sm" radius="md" mt="lg">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>Stacked Alert</Text>
          <ActionIcon>
            <IconCode size="1.125rem" />
          </ActionIcon>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding mt="md">
        <TriggerAlert showAlert={showAlert} cleanAlert={clean} />
        <Box py="xs">{alerts}</Box>
      </Card.Section>
    </Card>
  );
};

export default function () {
  return (
    <Box p="lg">
      <SwitchedAlert />
      <StackedAlert />
    </Box>
  );
}
