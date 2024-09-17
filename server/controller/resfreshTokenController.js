import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

// Endpoint to refresh the access token
const getRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) return res.sendStatus(401);
    const refreshToken = cookies.refreshToken;

    const user = await User.findOne({ refreshToken });
    if (!user.refreshToken) return res.sendStatus(401);

    jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.KEY, {
            expiresIn: "1d",
        });

        res.json({ accessToken });
    });
};

const controllers = {
    getRefreshToken,
};

export { controllers as refreshController };
