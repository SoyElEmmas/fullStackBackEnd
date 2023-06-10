const express = require('express')
const router = express.Router()
const {getTareas,setTareas,updateTareas,deleteTareas } = require('../controllers/tareasControllers')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getTareas).post(protect,setTareas)
//router.get('/',getTareas)
//router.post('/',setTareas)

router.route('/:id').put(protect,updateTareas).delete(protect,deleteTareas)
//router.put('/:id',updateTareas)
//router.delete('/:id',deleteTareas)

module.exports = router