const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  env: {
    oauthDiscordUrl: process.env.OAUTH_DISCORD_URL,
    oauthCtuFitUrl: process.env.OAUTH_CTU_FIT_URL,
    oauthCtuFelUrl: process.env.OAUTH_CTU_FEL_URL,
    oauthCtuVariant: process.env.OAUTH_CTU_VARIANT,
    oauthDiscordRedirectUri: process.env.OAUTH_DISCORD_REDIRECT_URI,
    oauthCtuRedirectUri: process.env.OAUTH_CTU_REDIRECT_URI,
    sentryDsn: process.env.SENTRY_DSN,
    apiUrl: process.env.API_URL,
  },
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withBundleAnalyzer(
  withSentryConfig(moduleExports, SentryWebpackPluginOptions)
);
