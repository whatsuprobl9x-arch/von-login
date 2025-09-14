import { verifyTokenFromHeader } from '../_auth_helpers.js';

export default async function handler(req, res) {
  const v = verifyTokenFromHeader(req);
  if (!v.ok) return res.status(v.status).json({ message: v.message });
  if (v.payload.role !== 'model') return res.status(403).json({ message: 'Models only' });

  return res.json({ balance: 120.50 });
}
