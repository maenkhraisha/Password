import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.KEY, (err, decoded) => {
        if (err) return res.sendStatus(403); //invalid token
        req.email = decoded.email;

        next();
    });
};

export default verifyJWT;
