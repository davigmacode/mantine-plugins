import { PasswordInput, Box, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import rules from 'mantine-form-rules';

export default function Page() {
  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    validate: {
      currentPassword: rules.isRequired(),
      newPassword: rules([
        rules.isRequired(),
        rules.hasUpperCase(),
        rules.hasNumber(),
        rules.minLength(6),
      ], { accumulate: true }),
      newPasswordConfirm: rules([
        rules.isRequired(),
        rules.matchesField('newPassword', 'Passwords are not the same'),
      ]),
    },
  });

  return (
    <Box w={300} mx="auto" mt="xl">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <PasswordInput
          label="Current Password"
          placeholder="Your password"
          {...form.getInputProps('currentPassword')}
        />
        <PasswordInput
          label="New Password"
          placeholder="Your password"
          mt="sm"
          {...form.getInputProps('newPassword')}
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="Your password"
          mt="sm"
          {...form.getInputProps('newPasswordConfirm')}
        />
        <Button type="submit" mt="lg">Submit</Button>
      </form>
    </Box>
  );
}