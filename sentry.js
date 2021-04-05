import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';

export const initSentry = () => {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  let integrations = [];
  if (process.env.NEXT_IS_SERVER === 'true' && process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR) {
    // For Node.js, rewrite Error.stack to use relative paths, so that source
    // maps starting with ~/_next map to files in Error.stack with path
    // app:///_next
    const frames = new RewriteFrames({
      iteratee: (frame) => {
        frame.filename = frame.filename.replace(
          process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
          'app:///'
        );
        frame.filename = frame.filename.replace('.next', '_next');
        return frame;
      },
    });
    integrations.push(frames);
  }

  const tracing = new Integrations.BrowserTracing();
  integrations.push(tracing);

  Sentry.init({
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'dev',
    enabled: process.env.NODE_ENV === 'production',
    integrations,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.5,
  });
};
