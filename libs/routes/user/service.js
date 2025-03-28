import {userModel} from "../../database/index.js";
import {generateJWTToken} from "../../modules/assist.js";
import {errorCode} from "../../modules/errorHandler.js";
//========================
export default class UserService {
    async register(username, password, role = 'user') {
        const existingUser = await userModel.getByQuery({username: {'$regex': `^${username}$`, $options: 'i'}}, {})
        if (existingUser) {
            throw errorCode(2001)
        }

        let userObj = {username, password, role}

        const user = await userModel.create(userObj);
        return {
            accessToken: generateJWTToken({
                _id: user._id,
                username: user.username,
                role: user.role
            }),
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        };
    }

    async login(username, password) {
        let user = await userModel.getByQuery({username: {'$regex': `^${username}$`, $options: 'i'}}, {
            password: true, username: true, role: true
        }, {})

        if (!user) {
            throw errorCode(2003)
        }

        const isCorrectPassword = await user.comparePassword(password)
        if (!isCorrectPassword)
            throw errorCode(2003)

        return {
            accessToken: generateJWTToken({
                _id: user._id,
                username: user.username,
                role: user.role
            }),
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        };

    }
}
