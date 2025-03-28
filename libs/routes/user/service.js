import {userModel} from "../../database/index.js";
import {generateJWTToken} from "../../modules/assist.js";
import {errorCode} from "../../modules/errorHandler.js";
//========================
export default class UserService {
    async register(username, password) {
        let user = await userModel.getByQuery({username: {'$regex': `^${username}$`, $options: 'i'}}, {})
        if (user) {
            throw errorCode(2001)
        }

        let userObj = {
            username,
            password
        }

        user = await userModel.create(userObj);
        const accessToken = generateJWTToken({_id: user['_id']});
        return {accessToken}
    }

    async login(username, password) {
        let user = await userModel.getByQuery({username: {'$regex': `^${username}$`, $options: 'i'}}, {
            password: true, username: true
        }, {})

        if (!user) {
            throw errorCode(2003)
        }

        const isCorrectPassword = await user.comparePassword(password)
        if (!isCorrectPassword)
            throw errorCode(2003)

        const accessToken = generateJWTToken({_id: user['_id']});
        return {accessToken}

    }
}
