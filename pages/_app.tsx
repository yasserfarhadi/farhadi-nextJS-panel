import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageLayout from '../components/PageLayout';
import AuthContextWrapper from '../context/authContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextWrapper>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </AuthContextWrapper>
  );
}
