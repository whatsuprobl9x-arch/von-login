import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const v = verifyTokenFromHeader(req);
  if (!v.ok) return res.status(v.status).json({ message: v.message });
  if (v.payload.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  const { to_email, amount } = req.body || {};
  if (!to_email || amount == null) return res.status(400).json({ message: 'Missing to_email or amount' });

  try {
    await supabaseAdmin.from('transactions').insert([{ to_email, amount, type: 'usd', created_at: new Date().toISOString() }]);
  } catch (e) {
    // ignore if table missing
  }
  return res.json({ message: 'USD sent (fake)', to_email, amount });
}
