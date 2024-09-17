import { Password } from "../models/Password.js";

const getPasswords = async (req, res) => {
    const user = req.params.id;
    try {
        const passwords = await Password.find({ user }).sort({ category: 1 }).populate("category");
        res.json({ passwords: passwords });
    } catch (error) {
        res.json({ msg: "error in get passwords" });
        console.log(error);
    }
};
const addPassword = async (req, res) => {
    const { user, category, source, password, note } = req.body.passwordForm;

    const newPass = new Password({
        user,
        category,
        source,
        password,
        note,
    });

    try {
        const response = await newPass.save();
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Add successfully" });
};
const updatePassword = (req, res) => {};
const deletePassword = async (req, res) => {
    const { id } = req.body;
    try {
        const response = await Password.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    getPasswords,
    addPassword,
    updatePassword,
    deletePassword,
};

export { controllers as passwordController };
