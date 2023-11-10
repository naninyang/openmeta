import { AppProps } from 'next/app';
import '@/styles/global.sass';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
