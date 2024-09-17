import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../models/User.js";

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (user) {
        return res.json({ message: "user exist" });
    }

    await User.create({ username, email, password: hashedPassword });
    res.json({ message: "User created" });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ status: false, message: "user not exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.json({ status: false, message: "password error" });

    const accessToken = jwt.sign({ email: user.email, id: user._id }, process.env.KEY, {
        expiresIn: "1d",
    });
    const refreshToken = jwt.sign(
        { email: user.email, id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "30d",
        }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return res.json({ status: true, accessToken, message: "login successfuly" });
};

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decode = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            if (decode) {
                res.clearCookie("refreshToken");
                await User.updateOne({ email: decode.email }, { refreshToken: "" });
            } else {
                return res.json({ status: false, message: "not authorized" });
            }
        } else {
            return res.json({ status: false, message: "not authorized" });
        }
    } catch (error) {
        console.log(error);
    }

    res.json({ status: true, message: "Logout successfuly" });
};

const resetPassword = async (req, res) => {
    const { refreshToken } = req.params;
    const { password } = req.body;

    try {
        const decode = await jwt.verify(refreshToken, process.env.KEY);
        const id = decode.id;
        const hashPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    } catch (err) {
        console.log(err);
        return res.json({ status: false, message: "Invalid token" });
    }

    res.json({ status: true, message: "Reset password successfuly" });
};

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ status: false, message: "no user found" });
        }

        const token = jwt.sign({ id: user.id }, process.env.KEY, { expiresIn: "1m" });

        // ==========================================
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "maen.alkhraisha@gmail.com",
                pass: "rqlb mkdw zyia elzj",
            },
        });

        var mailOptions = {
            from: "maen.alkhraisha@gmail.com",
            to: user.email,
            subject: "Reset Password",
            test: "",
            html: `<a href="http://localhost:3000/resetPassword/${token}" target="_blank">Reset Password</a>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent ");
            }
        });
        // =======================================
    } catch (error) {
        console.log(error);
    }

    res.json({ status: true, message: "Email sent successfuly" });
};

const controllers = {
    signup,
    login,
    logout,
    resetPassword,
    forgetPassword,
};

export { controllers as userController };
