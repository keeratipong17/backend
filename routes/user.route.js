// คำสั่งที่ใช้ในการกำหนดเส้นทา่งในการเรียกใช้ API เป็นการกำหนด Endpoint ของ API
const express = require('express')
const userController = require('../controllers/user.controller')

const router = express.Router()

// เพิ่ม
router.post('/', userController.upload.single('userImage'), userController.CreateUser);

// ค้นห่ ตรวจสอบ ดึง ดู
router.get('/login', userController.checkLogin);

// แก้ไข
router.put('/:userId', userController.upload.single('userImage'), userController.editUser);

// ******สำตัญ
module.exports = router