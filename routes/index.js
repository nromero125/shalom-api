const router = require('express').Router();
const LeaderController = require('../Controllers/LeaderController');


router.get('/', (req, res) => {
    res.json({
        status: 'API is working perfectly!',
        message: 'Welcome to Shalom api!'
    });
});


router.route('/api/leaders').
    get(LeaderController.index).
    post(LeaderController.create);

router.route('/api/leaders/:id').
    get(LeaderController.show).
    put(LeaderController.update).
    delete(LeaderController.delete);

module.exports = router;