import { Fragment, createElement as el } from 'react';
import { randomId } from '@mantine/hooks';
import {
  hasLength,
  isNotEmpty,
  isEmail,
  isInRange,
  matches,
  matchesField,
} from '@mantine/form';

export {
  hasLength,
  isEmail,
  isInRange,
  matches,
  matchesField,
} from '@mantine/form';

export type Rule<Value, Values> = (value: Value, values: Values, path: string) => React.ReactNode;

export const some = <Value, Values>(items: Rule<Value, Values>[]) => {
  const callback: Rule<Value, Values> = (value, values, path) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < items.length; i++) {
      const rule = items[i];
      const error = rule(value, values, path);
      if (error) return error;
    }
    return null;
  };
  return callback;
};

interface EveryOptions {
  itemBuilder?: (children: React.ReactNode, key: string) => React.ReactNode;
  wrapperBuilder?: (children: React.ReactNode) => React.ReactNode;
}

export const every = <Value, Values>(items: Rule<Value, Values>[], options: EveryOptions = {}) => {
  const {
    itemBuilder = (children, key) => el(Fragment, { key }, children, el('br')),
    wrapperBuilder = (children) => children,
  } = options;
  const callback: Rule<Value, Values> = (value, values, path) => {
    const accumulator = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < items.length; i++) {
      const rule = items[i];
      const error = rule(value, values, path);
      if (error) accumulator.push(itemBuilder(error, randomId()));
    }
    return accumulator.length > 0 ? wrapperBuilder(accumulator) : null;
  };
  return callback;
};

export const hasNumber = (error: React.ReactNode = 'Require number characters') => matches(/[0-9]/, error);

export const hasLowerCase = (error: React.ReactNode = 'Require lowercase characters') =>
  matches(/[a-z]/, error);

export const hasUpperCase = (error: React.ReactNode = 'Require uppercase characters') =>
  matches(/[A-Z]/, error);

export const hasSymbol = (error: React.ReactNode = 'Require special symbol') =>
  matches(/[$&+,:;=?@#|'<>.^*()%!-]/, error);

export const isRequired = (error: React.ReactNode = 'Must be filled') => isNotEmpty(error);

export const exactLength = (length: number, error?: React.ReactNode) =>
  hasLength(length, error || `Require exact ${length} characters`);

export const rangeLength = (min: number, max: number, error?: React.ReactNode) =>
  hasLength({ min, max }, error || `Require between ${min} to ${max} characters`);

export const minLength = (length: number, error?: React.ReactNode) =>
  hasLength({ min: length }, error || `Require minimum ${length} characters`);

export const maxLength = (length: number, error?: React.ReactNode) =>
  hasLength({ max: length }, error || `Require maximum ${length} characters`);

interface RulesOptions extends EveryOptions {
  accumulate?: boolean;
}

const rules = <Value, Values>(items: Rule<Value, Values>[], options: RulesOptions = {}) => {
  const { accumulate = false, ...everyOptions } = options;
  return accumulate ? every(items, everyOptions) : some(items);
};

rules.hasLength = hasLength;
rules.hasNumber = hasNumber;
rules.hasLowerCase = hasLowerCase;
rules.hasUpperCase = hasUpperCase;
rules.hasSymbol = hasSymbol;
rules.isRequired = isRequired;
rules.isEmail = isEmail;
rules.isInRange = isInRange;
rules.exactLength = exactLength;
rules.rangeLength = rangeLength;
rules.minLength = minLength;
rules.maxLength = maxLength;
rules.matches = matches;
rules.matchesField = matchesField;

export default rules;
