import express from "express"
import { createUser, deleteuser, getUsers, getUsersbyid, updateUser } from "../controllers/studentController.js"

const router = express.Router()

router.post('/createuser',createUser)
router.get('/getusers',getUsers)
router.get('/getusersbyid/:id',getUsersbyid)
router.put('/updateuser/:id',updateUser)
router.delete('/deleteuser/:id',deleteuser)

export default router