import { Group } from "lucide-react";
import mongoose, {Schema , Document} from "mongoose";

export interface Admin{
  BloodGroup: string,
  weight: number,
  height: number,
  BMI: number,
  SocialHistory: string
}



const AdminSchema: Schema<Admin> = new Schema({
    BloodGroup:{
        type:String,required: true
    },
    weight:{
        type:Number,required: true
    },
    height:{
        type:Number,required: true
    },
    BMI:{
        type:Number,required: true
    }
})

const AdminModel = (mongoose.models.AdminData as mongoose.Model<Admin>) || mongoose.model<Admin>("User", AdminSchema) 
export default AdminModel