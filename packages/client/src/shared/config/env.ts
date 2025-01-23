import { z } from 'zod';

export const env = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
};

z.object({
  baseUrl: z.string(),
}).parse(env);

if (import.meta.env.DEV) {
  console.table(env);
}
