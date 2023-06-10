const express = require('express')
const router = express.Router()
const {createUser, loginUser, misDatos } = require('../controllers/usersControllers')
const {protect} = require('../middleware/authMiddleware')

router.post('/',createUser)
router.post('/login',loginUser)
router.get('/me', protect, misDatos)

//router.route('/:id').put(updateTareas).delete(deleteTareas)

module.exports = router