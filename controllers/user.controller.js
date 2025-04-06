//ไฟล์นี้จะประกอบด้วยฟังชั่นในการทำงานกับตารางในฐานข้อมูลผ่านทาง prisma
// ทำงานกับตาราง ได้แก่ Create เพิ่ม, read ค้นหา-ตรวจสอบ-ดีง-ดู, Update แก้ไข, Delete ลบ
const multer = require('multer')
const path = require('path')

// ฟังชั่นอัปโหลดไฟล์รูป------------------------------------
// 1.สร้างที่อยู๋สำหรับเก็บไฟล์ที่อัปโหลด และเปลี่ยนชื่อไฟล์ที่อัปโหลดเพื่อไม่ให้ซ้ำกัน
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/user')
    },
    filename: (req, file, cb) => {
        cb(null, 'user_' + Math.floor(Math.random() * Date.now()) + path.extname(file.originalname))
    }
})
//2. ตัวฟังก์ชันอัปโหลดไฟล์
exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50 // ขนาดไฟล์สูงสุด 5MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/; //กำหนดประเภทของไฟล์ที่อนุญาตให้อัปโหลด
        const mimetype = filetypes.test(file.mimetype); //ตรวจสอบประเภทของไฟล์ที่อัปโหลด
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //ตรวจสอบนามสกุลของไฟล์ที่อัปโหลด
        if (mimetype && extname) {
            return cb(null, true); //อนุญาตให้ไฟล์ที่อัปโหลดผ่านการตรวจสอบ
        } else {
            cb('Error: File upload only supports the following filetypes - ' + filetypes); //ไม่อนุญาตให้ไฟล์ที่อัปโหลดผ่านการตรวจสอบ
        }
    }
});



// ฟังชั่นเพิ่ม user---------------------------------------
exports.CreateUser = async (req, res) => {
    try{
        // คำสั่งการทำงานกับฐานข้อมูลผ่าน prisma
    }catch(err){
            res.status(500).json({message: `พบปัญหาในการทำงาน ${err/message}`})
    }
}


//ฟังชั่น login เพื่อตรวจสอบ อีเมลและรหัสผ่าน ในการเข้าสู่ระบบของ user
exports.CreateUser = async (req, res) => {
    try{
        // คำสั่งการทำงานกับฐานข้อมูลผ่าน prisma
    }catch(err){
            res.status(500).json({message: `พบปัญหาในการทำงาน ${err/message}`})
    }
}

// ฟังชั่นแก้ไข user
exports.CreateUser = async (req, res) => {
    try{
        // คำสั่งการทำงานกับฐานข้อมูลผ่าน prisma
    }catch(err){
            res.status(500).json({message: `พบปัญหาในการทำงาน ${err/message}`})
    }
}