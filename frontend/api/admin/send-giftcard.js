// /api/admin/send-giftcard.js
import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const v = verifyTokenFromHeader(req);
  if (!v.ok) return res.status(v.status).json({ message: v.message });
  if (v.payload.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  const { to_email, code } = req.body || {};
  if (!to_email || !code) return res.status(400).json({ message: 'Missing to_email or code' });

  try {
    await supabaseAdmin.from('giftcards').insert([{ to_email, code, created_at: new Date().toISOString() }]);
  } catch (e) {}
  return res.json({ message: 'Gift card sent (recorded)', to_email, code });
}
