// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseSecret = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
	// data format:
	// {
	// 	company: "a",
	// 	location: "a",
	// }
	const input_data = JSON.parse(req.body);
	const jwt = req.headers.authentication;

	const { data: user, userError } = await supabase.auth.api.getUser(jwt);
	const id = user.identities[0]['id'];

	input_data['created_by'] = id;
	input_data['is_public'] = false;

	const { data, error } = await supabaseSecret.from('jobs').insert([input_data]);

	if (error) {
		res.status(500).json({ error });
	} else {
		res.status(200).json({ message: 'success!' });
	}
}
