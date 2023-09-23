import User from '../models/user.js';
import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {getUserIdFromToken} from '../utilities/authentication.js'
import {io} from '../index.js'
async function userLogin  (req){
    const{name,email,password}=req.body

    console.log('function is clicked ')
  




    let checkuser=await User.findOne({email:email})
    if(checkuser){
        return {
            status: false,
            message: `user is already register `,
           
        }
   }
    
   console.log(name)
   const hashedpass=await bcrypt.hash(password,10);
   const createuser = User({
       name: name,
       email: email,
       password: hashedpass,
      
   })
   await createuser.save()
    return {
        status: true,
        message: `Administrator logged in successfully`,
        data: {createuser}
    }
}

const login= async(req)=>{

const{email,password}=req.body
try {
    let user=await User.findOne({email:email})
    let match=await bcrypt.compare(password,user.password)
    
if (user &&match){

    let JWT_SECRET='sjfscnsncshvshvihsihfihsihifhifsffff54f54e54f'
    const token = jwt.sign({ userdetails:user },JWT_SECRET);



    return {
        status: true,
        message: `user data `,
        data:{user,token}
       
    }
}else{
    return {
        status: false,
        message: `error `,
        
       
    }   
}
}


catch (error) {
    

    return {
        status: false,
        message: error,
       
       
    }
}

}

const createChat=async(req)=>{
    try {
        
        const u_id = await getUserIdFromToken(req)
    const{other_user}=req.body
    let prev_data= await Chat.findOne({

        $and: [
            { users: { $elemMatch: { $eq: u_id } } },
      { users: { $elemMatch: { $eq: other_user } } },
            // Add more conditions as needed
          ]

    }).populate('users')
    if(prev_data){
        return {
            status: true,
            message: 'chat record',
            data:{prev_data}
           
           
        }
    }else{

        let newchat={

            users: [u_id, other_user],
        }
        const createdChat = await Chat.create(newchat);
        return{

            status: true,
            message: 'chat record',
            data:{createdChat}
           

        }

    }

} catch (error) {
        
    return{

        status: false,
        message: error.message,
       
       

    }

}

}

const sendMessage=async(req)=>{
    try {
        
   
    const{content,chat_id,u_id}=req.body//u_id is sender id coming from tocken 
    let message={
        sender:u_id,
        content:content,
        chat:chat_id
    }
    let messageData=await Message.create(message)
    
    return{

        status: true,
        message: 'Your message is send',
        data:{messageData}
       
       

    }


} catch (error) {
        
    return{

        status: false,
        message: error.message,
       
       

    }



} 

}

const getAllMesageOfBothUser=async(req)=>{
    try {
        const{chat_id}=req.body
        let chatData=await Message.find({chat:chat_id}).populate('sender')
        return{

            status: true,
            message: 'all Message Record',
            data:{chatData}
           
           
    
        }
        
    } catch (error) {
         return{

        status: false,
        message: error.message,
       
       

    }
    }
}

const AllUserList=async(req)=>{
    try {
        
      let user=await User.find({})
        return{

            status: true,
            message: 'List of all user ',
            data:{user}
           
           
    
        }
        
    } catch (error) {
         return{

        status: false,
        message: error.message,
       
       

    }
    }
}

// const joinRoomID=async(req)=>{
//     try {
//         const u_id = await getUserIdFromToken(req)
//         let chatid= await Chat.findOne({

//             $and: [
//                 { users: { $elemMatch: { $eq: u_id } } },
//           { users: { $elemMatch: { $eq: other_user } } },
//                 // Add more conditions as needed
//               ]
    
//         }).populate('users')


//         return{

//             status: true,
//             message: 'List of all user ',
//             data:{chatid}
           
           
    
//         }

//     } catch (error) {
        
//     }
// }

export{userLogin,login,createChat,sendMessage,getAllMesageOfBothUser,AllUserList}