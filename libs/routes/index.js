import user from './user/route.js'
import room from "./room/route.js";

const routes = (app) => {
    app.use('/user', user);
    app.use('/room', room)
};

export default routes;
