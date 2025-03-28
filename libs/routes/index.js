import user from './user/route.js';
import room from './room/route.js';
import movie from './movie/route.js';
import screening from './screening/route.js';
import booking from './booking/route.js';

const routes = (app) => {
    app.use('/user', user);
    app.use('/room', room);
    app.use('/movie', movie);
    app.use('/screening', screening);
    app.use('/booking', booking);
};

export default routes;
