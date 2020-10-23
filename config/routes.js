module.exports = (express, app) => {
    const routers = require('../routers')(express.Router());

    app.use('/home', routers.homeRouter);
    app.use('/user', routers.userRouter);
    app.use('/shoes', routers.shoeRouter)
};