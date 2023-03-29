import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
})

export default models.user || model("user", UserSchema)
