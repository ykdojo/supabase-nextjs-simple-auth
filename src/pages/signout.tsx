import { supabase } from '../utils/supabaseClient';
import { type NextPage } from 'next';
import { type UserProps } from '../lib/types';

const SignOut: NextPage<UserProps> = ({ user }) => {
	supabase.auth.signOut();

	return (
		<div>The user should have signed out.</div>
	);
};

export default SignOut;