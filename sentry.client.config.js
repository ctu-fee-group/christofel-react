import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.sentryDsn;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  release: "Christofel-web@1.0.0"
});