import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, trim: true, unique: true },
    email: { type: String, require: true, unique: true, trim: true, unique: true },
    password: { type: String, require: true, trim: true },
    refreshToken: { type: String, trim: true },
});

const UserModel = mongoose.model("User", UserSchema);

export { UserModel as User };
