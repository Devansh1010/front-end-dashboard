import mongoose, { Schema, Document } from "mongoose";

export interface Admin {
    username: string,
    email: string,
    password: string
}



const AdminSchema: Schema<Admin> = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const AdminModel = (mongoose.models.Admin as mongoose.Model<Admin>) || mongoose.model<Admin>("Admin", AdminSchema)
export default AdminModel