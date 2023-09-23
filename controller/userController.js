import * as userServices from '../services/userServices.js'
import responseUtil from '../utilities/response.js'


const loginUser = async (req, res) => {
    const response = await userServices.userLogin(req)
    if (response.status) {
        return responseUtil.successResponse(res, response.message, {
            user_detail: response.data
        })
    } else {
        return responseUtil.validationErrorResponse(res, response.message)
    }
}

const login = async (req, res) => {
    const response = await userServices.login(req)
    if (response.status) {
        return responseUtil.successResponse(res, response.message, {
            user_detail: response.data
        })
    } else {
        return responseUtil.validationErrorResponse(res, response.message)
    }
}

const createChat = async (req, res) => {
    const response = await userServices.createChat(req)
    if (response.status) {
        return responseUtil.successResponse(res, response.message, {
            user_detail: response.data
        })
    } else {
        return responseUtil.validationErrorResponse(res, response.message)
    }
}

const sendMessage = async (req, res) => {
    const response = await userServices.sendMessage(req)
    if (response.status) {
        return responseUtil.successResponse(res, response.message, {
            user_detail: response.data
        })
    } else {
        return responseUtil.validationErrorResponse(res, response.message)
    }
}

const getAllMesageOfBothUser = async (req, res) => {
    const response = await userServices.getAllMesageOfBothUser(req)
    if (response.status) {
        return responseUtil.successResponse(res, response.message, {
            user_detail: response.data
        })
    } else {
        return responseUtil.validationErrorResponse(res, response.message)
    }
}

const AllUserList = async (req, res) => {
    const response = await userServices.AllUserList(req)
    if (response.status) {
        return responseUtil.successResponse(res, response.message, {
            user_detail: response.data
        })
    } else {
        return responseUtil.validationErrorResponse(res, response.message)
    }
}


export{loginUser,login,createChat,sendMessage,getAllMesageOfBothUser,AllUserList}