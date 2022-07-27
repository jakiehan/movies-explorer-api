const router = require('express').Router();
const { currentUser, setUserInfo } = require('../controllers/users');

const { usersMe } = require('../middlewares/joiValidation');

router.get('/users/me', currentUser);
router.patch('/users/me', usersMe, setUserInfo);

module.exports = router;
