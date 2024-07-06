import { z } from 'zod';

const coercedDateSchema = z
  .union([z.string(), z.date()])
  .transform((val, ctx) => {
    const date = typeof val === `string` ? new Date(val) : val;

    if (Number.isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid date`,
      });

      return z.NEVER;
    }

    return date;
  });

export default (): typeof coercedDateSchema => {
  return coercedDateSchema;
};
