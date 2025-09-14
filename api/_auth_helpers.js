import jwt from 'jsonwebtoken';

export function verifyTokenFromHeader(req) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return { ok: false, status: 401, message: 'Missing token' };
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    return { ok: true, payload };
  } catch (e) {
    return { ok: false, status: 401, message: 'Invalid token' };
  }
}
