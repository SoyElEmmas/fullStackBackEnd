const express = require('express')
const router = express.Router()
const {createUser, loginUser } = require('../controllers/usersControllers')

router.post('/',createUser)
router.post('/login',loginUser)

//router.route('/:id').put(updateTareas).delete(deleteTareas)

module.exports = router