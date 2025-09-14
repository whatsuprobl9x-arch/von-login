import supabase from '../../lib/supabase.js';
import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  const v = verifyTokenFromHeader(req);
  if (!v.ok) return res.status(v.status).json({ message: v.message });
  if (v.payload.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

  try {
    const { data } = await supabase.from('support_messages').select('*');
    return res.json({ messages: data || [] });
  } catch(e){
    return res.json({ messages: [], notice: 'Could not fetch (table may not exist)' });
  }
}
