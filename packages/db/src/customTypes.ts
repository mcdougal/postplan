import crypto from 'crypto';

import { getRequiredEnvVar } from '@/common/env';
import { customType } from 'drizzle-orm/pg-core';

export const encryptedText = customType<{ data: string }>({
  dataType: () => {
    return `text`;
  },
  toDriver: (value) => {
    const algorithm = `aes-256-cbc`;
    const key = getRequiredEnvVar(`DB_ENCRYPTION_KEY`);
    const iv = getRequiredEnvVar(`DB_ENCRYPTION_IV`);

    if (typeof value !== `string`) {
      throw new Error(`Expected string`);
    }

    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(key),
      Buffer.from(iv, `hex`)
    );
    let encrypted = cipher.update(value, `utf-8`, `hex`);
    encrypted += cipher.final(`hex`);
    return encrypted;
  },
  fromDriver: (value) => {
    const algorithm = `aes-256-cbc`;
    const key = getRequiredEnvVar(`DB_ENCRYPTION_KEY`);
    const iv = getRequiredEnvVar(`DB_ENCRYPTION_IV`);

    if (typeof value !== `string`) {
      throw new Error(`Expected string`);
    }

    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(key),
      Buffer.from(iv, `hex`)
    );
    let decrypted = decipher.update(value, `hex`, `utf-8`);
    decrypted += decipher.final(`utf-8`);
    return decrypted;
  },
});
