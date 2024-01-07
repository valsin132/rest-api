import express from 'express'
import * as controller from '../controllers/controller.js'

const router = express.Router()

router.get('/programuotojai', controller.prog_get)
router.post('/programuotojai', controller.prog_post)
router.get('/programuotojai/:id', controller.prog_details_get);
router.put('/programuotojai/:id', controller.prog_put)
router.delete('/programuotojai/:id', controller.prog_delete)
// (api endpoint, veiksmas)

export default router