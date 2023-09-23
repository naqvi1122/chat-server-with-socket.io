
import express from 'express'
import * as userController from '../controller/userController.js'
const router = express.Router()
import {verifyAuthToken} from '../utilities/authentication.js'




router.post('/register',userController.loginUser )
router.post('/login',userController.login )
router.post('/create_chat',userController.createChat )

router.post('/send_message',userController.sendMessage )
router.post('/get_all_msg_of_both_user',userController.getAllMesageOfBothUser )

router.get('/list_of_all_user', verifyAuthToken(),userController.AllUserList )

export {router}