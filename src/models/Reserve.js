import mongoose from "mongoose";
import moment from "moment-timezone"

moment.tz.setDefault("Asia/Seoul");
const currentDateKorea = moment().tz(`Asia/Seoul`).format("YYYY-MM-DD HH:mm")

const ReserveSchema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:String,
    peopleNum:Number,
    message:String,
    program:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Program"
    },
    reservationCode:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const model = mongoose.model("Reserve",ReserveSchema)

export default model