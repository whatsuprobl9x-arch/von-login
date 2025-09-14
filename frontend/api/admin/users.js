// /api/admin/users.js
import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  const v = verifyTokenFromHeader(req);
  if (!v.ok) return res.status(v.status).json({ message: v.message });
  if (v.payload.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  try {
    const { data, error } = await supabaseAdmin.from('users').select('id,email,role,meta');
    if (error) return res.status(500).json({ message: 'DB error', detail: error.message });
    return res.json({ users: data || [] });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
