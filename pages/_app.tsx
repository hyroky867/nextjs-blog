import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../src/lib/gtag';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import getConfig from 'next/config';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame: Sentry.StackFrame): Sentry.StackFrame => {
          const fileName = frame.filename;
          frame.filename = fileName ? fileName.replace(distDir, 'app:///_next') : undefined;
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  });
}

type Props = AppProps & { err: Sentry.Event };

const MyApp: React.FC<Props> = ({ Component, pageProps, err }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      gtag.pageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return (): void => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} err={err} />;
};

export default MyApp;
