import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // ✅ changed
const jwtSecret = process.env.JWT_SECRET;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check user in Supabase
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Sign JWT with role
    const token = jwt.sign(
      { email: data.email, role: data.role },
      jwtSecret,
      { expiresIn: '2h' }
    );

    return res.status(200).json({ token, role: data.role });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
