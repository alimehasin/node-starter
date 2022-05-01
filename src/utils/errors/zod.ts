import { Request } from 'express';
import { z } from 'zod';
import { translate } from '../i18n';

export default (req: Request) => {
  const errorMap: z.ZodErrorMap = (issue, ctx): { message: string } => {
    let message: string;

    switch (issue.code) {
      case 'invalid_type': {
        if (issue.received === 'undefined') {
          message = translate(req)('zod.required');
        } else {
          message = `Expected ${issue.expected}, received ${issue.received}`;
        }

        break;
      }

      case 'unrecognized_keys': {
        message = `Unrecognized key(s) in object: ${issue.keys
          .map((k) => `'${k}'`)
          .join(', ')}`;

        break;
      }

      case 'invalid_union': {
        message = translate(req)('zod.invalidInput');

        break;
      }

      case 'invalid_union_discriminator': {
        message = `Invalid discriminator value. Expected ${issue.options
          .map((val) => (typeof val === 'string' ? `'${val}'` : val))
          .join(' | ')}`;

        break;
      }

      case 'invalid_enum_value': {
        message = `Invalid enum value. Expected ${issue.options
          .map((val) => (typeof val === 'string' ? `'${val}'` : val))
          .join(' | ')}`;

        break;
      }

      case 'invalid_arguments': {
        message = translate(req)('zod.invalidArguments');

        break;
      }

      case 'invalid_return_type': {
        message = translate(req)('zod.invalidReturnType');

        break;
      }

      case 'invalid_date': {
        message = translate(req)('zod.invalidDate');

        break;
      }

      case 'invalid_string': {
        if (issue.validation !== 'regex') {
          message = `Invalid ${issue.validation}`;
        } else {
          message = translate(req)('zod.invalid');
        }

        break;
      }

      case 'too_small': {
        if (issue.type === 'array') {
          message = `Array must contain ${issue.inclusive ? `at least` : `more than`} ${
            issue.minimum
          } element(s)`;
        } else if (issue.type === 'string') {
          message = `String must contain ${issue.inclusive ? `at least` : `over`} ${
            issue.minimum
          } character(s)`;
        } else if (issue.type === 'number') {
          message = `Number must be greater than ${
            issue.inclusive ? `or equal to ` : ``
          }${issue.minimum}`;
        } else {
          message = translate(req)('zod.invalidInput');
        }

        break;
      }

      case 'too_big': {
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
          message = translate(req)('zod.invalidInput');
        }

        break;
      }

      case 'custom': {
        message = translate(req)('zod.invalidInput');

        break;
      }

      case 'invalid_intersection_types': {
        message = translate(req)('zod.invalidIntersectionTypes');

        break;
      }

      case 'not_multiple_of': {
        message = `Number must be a multiple of ${issue.multipleOf}`;

        break;
      }

      default: {
        message = ctx.defaultError;
      }
    }

    return { message };
  };

  return errorMap;
};
