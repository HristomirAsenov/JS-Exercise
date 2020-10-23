const { homeController } = require('../controllers');

module.exports = (router) => {
    router.get('/', homeController.get.home);
    
    return router;
};
