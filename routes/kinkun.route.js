// คำสั่งที่ใช้ในการกำหนดเส้นทา่งในการเรียกใช้ API เป็นการกำหนด Endpoint ของ API
const express = require ('express')
const kinkunController = require('../controllers/kinkun.controller')

const router = express.Router()

// เพื่ม
router.post('/',kinkunController.upload, kinkunController.CreateKinkun)

// แก้ไข
router.put('/:kinkun', kinkunController.upload, kinkunController.editKinkun)

// ลบ
router.delete('/:kinkun', kinkunController.delelteKinkun)

// ค้นหา ตรวจสอบ ดึง ดู
router.get('/kinkunnall/:userId', kinkunController.showAllKinkun)
router.get('/kinkunonly/:kinkunId', kinkunController.showOnlyKinkun)


// *****************
module.exports = router