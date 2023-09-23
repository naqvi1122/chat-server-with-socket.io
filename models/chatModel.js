
import mongoose from 'mongoose'
const chatModel = mongoose.Schema(
  {
   
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
 
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

export default  Chat;
