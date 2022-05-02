import { z, ZodIssueCode } from 'zod';

const enZodErrorMap: z.ZodErrorMap = (issue, ctx): { message: string } => {
  let message: string;

  switch (issue.code) {
    case ZodIssueCode.invalid_type: {
      if (issue.received === 'undefined') {
        message = 'This field is required';
      } else {
        message = `Invalid input, expected ${issue.expected}, received ${issue.received}`;
      }

      break;
    }

    case ZodIssueCode.invalid_date: {
      message = `Invalid date`;

      break;
    }

    case ZodIssueCode.invalid_string: {
      if (issue.validation !== 'regex') {
        message = `Invalid string, must match ${issue.validation}`;
      } else {
        message = 'Invalid string';
      }

      break;
    }

    case ZodIssueCode.invalid_enum_value: {
      message = `Invalid enum value, expected ${issue.options
        .map((val) => (typeof val === 'string' ? `'${val}'` : val))
        .join(' | ')}`;

      break;
    }

    case ZodIssueCode.invalid_literal: {
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected)}`;

      break;
    }

    case ZodIssueCode.custom: {
      message = `Invalid input`;

      break;
    }

    case ZodIssueCode.too_small: {
      if (issue.type === 'array') {
        message = `Array must contain ${issue.inclusive ? `at least` : `more than`} ${
          issue.minimum
        } element(s)`;
      } else if (issue.type === 'string') {
        message = `String must contain ${issue.inclusive ? `at least` : `over`} ${
          issue.minimum
        } character(s)`;
      } else if (issue.type === 'number') {
        message = `Number must be greater than ${issue.inclusive ? `or equal to ` : ``}${
          issue.minimum
        }`;
      } else {
        message = 'Invalid input';
      }

      break;
    }

    case ZodIssueCode.too_big: {
      if (issue.type === 'array') {
        message = `Array must contain ${issue.inclusive ? `at most` : `less than`} ${
          issue.maximum
        } element(s)`;
      } else if (issue.type === 'string') {
        message = `String must contain ${issue.inclusive ? `at most` : `under`} ${
          issue.maximum
        } character(s)`;
      } else if (issue.type === 'number') {
        message = `Number must be less than ${issue.inclusive ? `or equal to ` : ``}${
          issue.maximum
        }`;
      } else {
        message = 'Invalid input';
      }

      break;
    }

    default: {
      message = ctx.defaultError;
    }
  }

  return { message };
};

export default enZodErrorMap;
