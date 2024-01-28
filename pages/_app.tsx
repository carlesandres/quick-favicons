import '../styles/index.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        defer
        data-domain="favicons.16protons.com"
        src="https://plausible.io/js/plausible.js"
      ></Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
