# Mantine form rules

[![npm](https://img.shields.io/npm/dm/mantine-form-rules
)](https://www.npmjs.com/package/mantine-form-rules)

Rules collection to work with @mantine/form.

[demo](https://mantine-plugins.vercel.app/mantine-form-rules)

## Installation

```bash
# With yarn
yarn add mantine-form-rules @mantine/form

# With npm
npm install mantine-form-rules @mantine/form
```

## Quick Usage
```ts
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
      ], { accumulate: true }), // return every or first occurred error
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
```

## Tree Shaking
```ts
import {
  some, // combine rule and return the first occurred error
  every, // combine rule and return every occurred error
  isRequired,
  hasUpperCase,
  hasNumber,
  minLength,
  matchesField,
} from 'mantine-form-rules';

const form = useForm({
  initialValues: {
    password: '',
    passwordConfirm: '',
  },
  validate: {
    password: every([
      isRequired(),
      hasUpperCase(),
      hasNumber(),
      minLength(6),
    ]),
    passwordConfirm: some([
      isRequired(),
      matchesField('newPassword', 'Passwords are not the same'),
    ]),
  },
});
```