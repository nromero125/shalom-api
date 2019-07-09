const router = require('express').Router();
const LeaderController = require('../Controllers/LeaderController');
const AuthController = require('../Controllers/AuthController');
const EventController = require('../Controllers/EventController');
const VerifyToken = require('../Http/Middlewares/VerifyToken');

router.get('/', (req, res) => {
    res.json({
        status: 'API is working perfectly!',
        message: 'Welcome to Shalom api!'
    });
});


//Leader Routes
router.route('/api/leaders').
    get(VerifyToken, LeaderController.index).
    post(VerifyToken, LeaderController.create);

router.route('/api/leaders/:id').
    get(VerifyToken, LeaderController.show).
    put(VerifyToken, LeaderController.update).
    delete(VerifyToken, LeaderController.delete);

//Auth routes
router.route('/api/auth/register').
    post(AuthController.register);

router.route('/api/auth/login').
    post(AuthController.login);

router.route('/api/auth/user').
    get(VerifyToken, AuthController.user);


//Event routes
router.route('/api/events').
    get(VerifyToken, EventController.index)
    .post(VerifyToken, EventController.create);

router.route('/api/events/:id')
    .get(VerifyToken, EventController.show)
    .put(VerifyToken, EventController.update)
    .delete(VerifyToken, EventController.delete);

module.exports = router;