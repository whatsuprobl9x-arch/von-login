import jwt from 'jsonwebtoken';

export function verifyTokenFromHeader(req) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth) return { ok: false, status: 401, message: 'Missing token' };
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    return { ok: true, payload };
  } catch (e) {
    return { ok: false, status: 401, message: 'Invalid token' };
  }
}
