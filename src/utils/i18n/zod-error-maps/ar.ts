import { z, ZodIssueCode } from 'zod';

const enZodErrorMap: z.ZodErrorMap = (issue, ctx): { message: string } => {
  let message: string;

  switch (issue.code) {
    case ZodIssueCode.invalid_type: {
      if (issue.received === 'undefined') {
        message = 'هذه الحقل مطلوب';
      } else {
        message = `ادخال غير صالح, المتوقع ${issue.expected}, المستلم ${issue.received}`;
      }

      break;
    }

    case ZodIssueCode.invalid_date: {
      message = `تاريخ غير صالح`;

      break;
    }

    case ZodIssueCode.invalid_string: {
      if (issue.validation !== 'regex') {
        message = `نص غير صالح, يجب ان يطابق ${issue.validation}`;
      } else {
        message = 'نص غير صالح';
      }

      break;
    }

    case ZodIssueCode.invalid_enum_value: {
      message = `اختيار غير صالح, المتوقع ${issue.options
        .map((val) => (typeof val === 'string' ? `'${val}'` : val))
        .join(' | ')}`;

      break;
    }

    case ZodIssueCode.invalid_literal: {
      message = `قيمة غير صالحة, المتوقع ${JSON.stringify(issue.expected)}`;

      break;
    }

    case ZodIssueCode.custom: {
      message = `ادخال غير صالح`;

      break;
    }

    case ZodIssueCode.too_small: {
      if (issue.type === 'array') {
        message = `القائمة يجب ان تحتوي ${issue.inclusive ? `على الاقل` : `اكثر من`} ${
          issue.minimum
        } عنصر`;
      } else if (issue.type === 'string') {
        message = `النص يجب ان يحتوي ${issue.inclusive ? `على الاقل` : `اكثر من`} ${
          issue.minimum
        } حرف`;
      } else if (issue.type === 'number') {
        message = `الرقم يجب ان يكون اكبر من ${issue.inclusive ? `او يساوي ` : ``}${
          issue.minimum
        }`;
      } else {
        message = 'ادخال غير صالح';
      }

      break;
    }

    case ZodIssueCode.too_big: {
      if (issue.type === 'array') {
        message = `القائمة يجب ان تحتوي ${issue.inclusive ? `على الاكثر ` : `اقل من`} ${
          issue.maximum
        } حرف`;
      } else if (issue.type === 'string') {
        message = `النص يجب ان يحتوي ${issue.inclusive ? `على الاكثر` : `اقل من`} ${
          issue.maximum
        } حرف`;
      } else if (issue.type === 'number') {
        message = `الرقم يجب ان يكون اقل من ${issue.inclusive ? `او يساوي ` : ``}${
          issue.maximum
        }`;
      } else {
        message = 'ادخال غير صالح';
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
