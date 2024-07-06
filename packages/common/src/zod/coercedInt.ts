import { z } from 'zod';

const coercedIntSchema = z
  .union([z.string(), z.number()])
  .transform((val, ctx) => {
    const number = typeof val === `string` ? parseInt(val) : val;

    if (Number.isNaN(number)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid number`,
      });

      return z.NEVER;
    }

    return number;
  });

export default (): typeof coercedIntSchema => {
  return coercedIntSchema;
};
