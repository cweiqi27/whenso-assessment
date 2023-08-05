import z from "zod";

/**
 * Env schema to be validated.
 */
const schema = z
  .object({
    VITE_FIREBASE_API_KEY: z.string().min(1),
    VITE_FIREBASE_AUTH_DOMAIN: z.string().min(1),
    VITE_FIREBASE_PROJECT_ID: z.string().min(1),
    VITE_FIREBASE_STORAGE_BUCKET: z.string().min(1),
    VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
    VITE_FIREBASE_APP_ID: z.string().min(1),
  })
  .safeParse(import.meta.env);

if (!schema.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    Object.entries(schema.error.format())
      .map(([name, value]) => {
        if (value && "_errors" in value)
          return `${name}: ${value._errors.join(", ")}\n`;
      })
      .filter(Boolean),
  );
  throw new Error("Invalid environment variables");
}

/**
 * Env variables to be used.
 */
export const env = { ...schema.data };
