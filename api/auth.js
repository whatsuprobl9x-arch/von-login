import { supabaseAdmin } from '../lib/supabase.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id, email, role, password')
      .eq('email', email)
      .maybeSingle();

    if (error) return res.status(500).json({ message: 'DB error', detail: error.message });
    if (!data || data.password !== password) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: data.id, email: data.email, role: data.role },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '1d' }
    );

    return res.status(200).json({ token, role: data.role, email: data.email });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', detail: err.message });
  }
}
