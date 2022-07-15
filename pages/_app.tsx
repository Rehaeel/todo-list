import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Todo Lista</title>
				<link
					rel='icon'
					type='image/x-icon'
					href='/images/logo.png'></link>
			</Head>
			<Component {...pageProps} />;
		</>
	);
}

export default MyApp;
