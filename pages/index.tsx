import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
	return (
		<div className='flex flex-col w-full h-screen justify-center items-center'>
			<Head>
				<title>Todo List</title>
				<meta name='description' content='Todo lista dla Żony i Męża' />
				{/* <link rel='icon' href='/favicon.ico' /> */}
			</Head>
			<h1 className='text-3xl'>Siemaaa</h1>
		</div>
	);
};

export default Home;
