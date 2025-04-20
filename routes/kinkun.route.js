//คำสั่งที่ใช้ในการสร้างเส้นทางในการเรียกใช้ API เป็นการกำหนด Endpoint ของ API
const express = require('express');
const kinkunController = require('../controllers/kinkun.controller.js')

const router = express.Router();

//เพิ่ม

router.post('/', kinkunController.upload, kinkunController.createKinkun)

//แก้ไข

router.put('/:kinkunId', kinkunController.upload, kinkunController.editKinkun)

//ลบ

router.delete('/:kinkunId', kinkunController.delelKinkun)

//ค้นหา ตรวจสอบ ดึง ดู

router.get('/kinkunall/:userId', kinkunController.ShowAllKinkun)
router.get('/kinkunonly/:kinkunId', kinkunController.ShowOnlyKinkun)

//****** 
module.exports = router;