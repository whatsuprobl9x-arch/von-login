import { supabaseAdmin } from '../../lib/supabase.js';
import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  const v = verifyTokenFromHeader(req);
  if (!v.ok) return res.status(v.status).json({ message: v.message });
  if (v.payload.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  try {
    const { data, error, count } = await supabaseAdmin
      .from('contents')
      .select('*', { count: 'exact' });
    const total = typeof count === 'number' ? count : (Array.isArray(data) ? data.length : 0);
    return res.json({ totalContent: total });
  } catch (e) {
    return res.json({ totalContent: 0, notice: 'Could not fetch contents (table may not exist)' });
  }
}
