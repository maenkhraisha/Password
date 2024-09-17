import { Category } from "../models/Category.js";

const addCategory = async (req, res) => {
    const { user, name } = req.body;

    const newCat = new Category({
        user: user,
        name: name,
    });

    try {
        const response = await newCat.save();
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Add successfully" });
};
const getCategories = async (req, res) => {
    const userid = req.params.id;
    try {
        const categories = await Category.find({ user: userid });
        res.json({ categories: categories });
    } catch (error) {
        res.json({ msg: "error in get category" });
        console.log(error);
    }
};
const updateCategory = (req, res) => {};
const deleteCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const response = await Category.findOneAndDelete({ _id: id });
    } catch (error) {
        console.log(error);
    }

    res.json({ message: "Deleted successfuly" });
};

const controllers = {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};

export { controllers as categoryController };
