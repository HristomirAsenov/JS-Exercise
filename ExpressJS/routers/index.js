const routers = [
    { homeRouter: require('./homeRouter') },
    { userRouter: require('./userRouter') },
    { shoeRouter: require('./shoeRouter') }
];

module.exports = (router) => {
    return routers.reduce((acc, curr) => {
        const key = Object.keys(curr)[0];
        return Object.assign(acc, { [key]: curr[key](router) });
    }, {});
};
