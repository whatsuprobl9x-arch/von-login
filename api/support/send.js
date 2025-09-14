import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, message } = req.body || {};
  let fromEmail = email;

  if (!fromEmail) {
    const v = verifyTokenFromHeader(req);
    if (v.ok) fromEmail = v.payload?.email;
  }

  if (!fromEmail || !message) return res.status(400).json({ message: 'Missing email or message' });

  try {
    await supabaseAdmin.from('support_messages').insert([{ email: fromEmail, message, created_at: new Date().toISOString() }]);
  } catch (e) {}

  return res.json({ message: 'Support request submitted' });
}
