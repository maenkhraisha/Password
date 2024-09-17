import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        require: true,
    },
});

const CategoryModel = new mongoose.model("Category", CategorySchema);

export { CategoryModel as Category };
