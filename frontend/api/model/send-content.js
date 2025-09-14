import supabase from '../../lib/supabase.js';
import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const v = verifyTokenFromHeader(req);
  if (!v.ok) return res.status(v.status).json({ message: v.message });
  if (v.payload.role !== 'model') return res.status(403).json({ message: 'Models only' });

  const { content_url, notes } = req.body || {};
  if (!content_url) return res.status(400).json({ message: 'content_url is REQUIRED' });

  try {
    await supabase.from('contents').insert([{ owner: v.payload.email, content_url, notes, created_at: new Date().toISOString() }]);
  } catch(e){}
  return res.json({ message: 'Content sent to admins', content_url });
}
