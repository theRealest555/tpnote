const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.json({ message: "Le token est obligatoire pour l'authentification" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        console.log(decoded);
        req.user = decoded.user;
        console.log(req.user);
        next();
    } catch (error) {
        return res.json({ message: "Token invalide ou expiré" });
    }
}

module.exports = { verifyToken };
