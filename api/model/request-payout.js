import supabase from '../../lib/supabase.js';
import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const v = verifyTokenFromHeader(req);
  if (!v.ok) return res.status(v.status).json({ message: v.message });
  if (v.payload.role !== 'model') return res.status(403).json({ message: 'Models only' });

  const now = new Date();
  const day = now.getUTCDate();
  if (day !== 25) {
    return res.status(400).json({ message: 'Payouts can only be requested on the 25th of each month (UTC).' });
  }
  try{
    await supabase.from('payout_requests').insert([{ email: v.payload.email, requested_at: now.toISOString() }]);
  }catch(e){}
  return res.json({ message: 'Payout requested (recorded).' });
}
