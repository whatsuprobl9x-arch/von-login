import supabase from '../../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { email, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ message: 'Missing email or message' });
  try {
    await supabase.from('support_messages').insert([{ email, message, created_at: new Date().toISOString() }]);
  } catch(e){}
  return res.json({ message: 'Support request submitted' });
}
