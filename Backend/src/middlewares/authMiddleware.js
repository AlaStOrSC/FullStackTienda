const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Pedrosanchez123';

const verifyToken = (rolesPermitidos = []) => (req, res, next) => {
  let token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No se proporciono token' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;

    if (rolesPermitidos.length > 0 && (!req.user || !rolesPermitidos.includes(req.user.role))) {
      return res.status(403).json({ message: 'No tienes permiso para esta accion' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalido' });
  }
};


module.exports = { verifyToken };