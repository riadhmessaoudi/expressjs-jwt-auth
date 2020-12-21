const router = require('express').Router();
const membersController = require('../controllers/membersController');

router.route('/login').post(membersController.login)
router.route('/register').post(membersController.register)
router.route('/fetchMember').get(membersController.fetchMember)

module.exports = router;