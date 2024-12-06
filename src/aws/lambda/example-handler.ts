import * as Sentry from '@sentry/aws-serverless';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENV,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 0.5,
  profilesSampleRate: 0.5,
  shutdownTimeout: 0.1,
});

export const exampleHandler = async (event: {
  key1: string;
  key2: string;
}): Promise<boolean> => {
  const { key1, key2 } = event;

  Sentry.setTags({ key1, key2 });

  return await Promise.resolve(false);
};

export const handler = Sentry.wrapHandler(exampleHandler);
