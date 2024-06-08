import App from 'components/App';
import Head from 'next/head';
import Image from 'next/image';
import logo from '../public/favicon.png';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quick Favicons',
  alternates: {
    canonical: `/`,
  },
  description: 'Create a favicon in seconds not minutes. Quick and simple.',
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Quick Favicons</title>
        <link rel="icon" href="/favicon.png" sizes="1000x1000" />
        <meta
          name="description"
          content="Create a favicon in seconds not minutes. Quick and simple."
        />
        <meta
          name="google-site-verification"
          content="55YTawSTZLLFaN4ftfgi-owRhc5Clh77hJ6mESPDEgE"
        />
      </Head>

      <nav className="flex justify-between bg-gray-700 p-4 text-white">
        <div className="flex space-x-2">
          <div className="h-6 w-6">
            <Image src={logo} alt="Quick Favicons" />
          </div>
          <span>Quick Favicons</span>
          <span className="italic text-yellow-100">
            - Create a favicon in seconds, not minutes
          </span>
        </div>
      </nav>
      <App />
    </div>
  );
}
