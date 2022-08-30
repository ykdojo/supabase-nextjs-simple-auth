import Head from 'next/head';
import { type UserProps } from '../lib/types';
import Router from 'next/router';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

const Submit: NextPage<UserProps> = ({ session }) => {
	// If the user is not logged in, redirect them to the signup page
	if (typeof localStorage !== 'undefined' && !localStorage['supabase.auth.token']) {
		Router.push('/signup');
	}

	// reference: https://react-hook-form.com/get-started#Quickstart
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data: any) => {
		console.log(data);

		let result;
		try {
			result = await fetch('/api/submit_job_posting', {
				headers: {
					Authentication: session.access_token,
				},
				method: 'POST',
				body: JSON.stringify(data),
			});
		} catch (err) {
			console.log(err);
		}

		console.log(result);

		reset();
	};

	return (
		<>
			<Head>
				<title>New Job Posting</title>
			</Head>
			<main className='flex justify-center py-10 px-4 pt-10 sm:px-12'>
				<div className='w-full bg-white p-4 shadow-lg sm:w-4/5 md:w-2/3 lg:w-1/2'>
					<form className='space-y-8 divide-y divide-gray-200' onSubmit={handleSubmit(onSubmit)}>
						<div className='space-y-8 divide-y divide-gray-200'>
							<div>
								<div>
									<h2 className='text-xl font-medium leading-6 text-gray-900'>Submit a job posting</h2>
								</div>

								<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
									<div className='sm:col-span-4'>
										<label htmlFor='company' className='block text-sm font-medium text-gray-700'>
											Company
										</label>
										<div className='mt-1 flex rounded-md shadow-sm'>
											<input
												type='text'
												id='company'
												className='block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												{...register('company', { required: true })}
											/>
										</div>
									</div>

									<div className='sm:col-span-4'>
										<label htmlFor='position' className='block text-sm font-medium text-gray-700'>
											Position
										</label>
										<div className='mt-1 flex rounded-md shadow-sm'>
											<input
												type='text'
												{...register('position', { required: true })}
												id='position'
												className='block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='pt-5'>
							<div className='flex justify-end'>
								<button
									type='submit'
									className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</main>
		</>
	);
};

export default Submit;
