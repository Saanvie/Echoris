import mongoose from "mongoose";
import {Schema} from "mongoose";

const userSchema = new Schema(
    {
        fullname: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        token: {type: String}
    }
)

const User = mongoose.model("User", userSchema); // jaise hum koi object create krte hai uske saamne new likhkr and then fior uss blueprint ke according apni object bnate hai vhi same kaam yha par .model krta hai, i.e. hum pehle usse user dere hai 

export { User };