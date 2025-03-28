import {errorCode} from "../modules/errorHandler.js";
import {setErrorResponse, validateJWTToken} from "../modules/assist.js";

export const isLogin = async (req, res, next) => {
    let {authorization} = req.headers;
    const token = authorization && authorization.split(' ')[1];

    if (!token) {
        return setErrorResponse(req, res, errorCode(401))
    } else if (authorization && authorization.startsWith('Bearer')) {
        try {
            const user = await validateJWTToken( token);
            if (user && user._id) {
                req.user = user;
                next()
            } else {
                setErrorResponse(req, res, errorCode(401))
            }
        } catch (e) {
            setErrorResponse(req, res, errorCode(401))
        }
    }
}
