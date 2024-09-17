import mongoose, { mongo } from "mongoose";

const PasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true,
    },
    source: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    note: {
        type: String,
    },
});

const PasswordModel = new mongoose.model("Password", PasswordSchema);

export { PasswordModel as Password };
