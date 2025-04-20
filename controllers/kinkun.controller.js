// ไฟล์ประกอบด้วยฟังก์ชั่นในการทำงานกับตารางในฐานข้อมูลผ่านทาง Prisma
// ทำงานกับตาราง ได้แก่ Create/เพิ่ม, Read/ค้นหา-ตรวจสอบ-ดึง-ดู, Update/แก้ไข, Delete/ลบ
const multer = require('multer') // ใช้สำหรับการอัปโหลดไฟล์
const path = require('path') // ใช้สำหรับการจัดการกับที่อยู่เส้นทางไฟล์

// ใช้ Prisma ในการทำงานกับฐานข้อมูล
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient(); //สร้างตัวแปร prisma เพื่อใช้ในการทำงานกับฐานข้อมูล

//ฟังก์ชั่นอัปโหลดไฟล์รูป
//1. สร้างที่อยู่สำหรับเก็บไฟล์ที่อัปโหลด และเปลี่ยนชื่อไฟล์ที่อัปโหลดเพื่อไม่ให้ซ้ำกัน
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/kinkun') // ที่อยู่สำหรับเก็บไฟล์ที่อัปโหลด
    },
    filename: (req, file, cb) => {
        cb(null, 'kinkun_' + Math.floor(Math.random() * Date.now()) + path.extname(file.originalname)) // เปลี่ยนชื่อไฟล์ที่อัปโหลด
    }
});

//2. ตัวฟังก์ชั้นในการอัปโหลดไฟล์
exports.upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname) {
            return cb(null, true)
        } else {
            cb(new Error('Only images (jpeg, jpg, png) are allowed!'))
        }
    }
}).single('kinkunImage');

// -------------------------------------------------------------------------------------------------
//ฟังก์ชั่นเพิ่มข้อมูลการกินในตาราง kinkun_tb
exports.createKinkun = async (req, res) => {
    try {
        //คำสั่งการทำงานกับฐานข้อมูลผ่าน prisma
        const result = await prisma.kinkun_tb.create({
            data: {
                kinkunTitle: req.body.kinkunTitle,
                kinkunState: req.body.kinkunState,
                kinkunDate: req.body.kinkunDate,
                kinkunCost: parseFloat(req.body.kinkunCost),
                kinkunImage: req.file ? req.file.path.replace("images\\kinkun\\", "") : "",
                userId: parseInt(req.body.userId)
            },
        })

        //เมื่อทำงานเสร็จเรียบร้อยส่งผลการทำงานกลับไปยัง Client 
        res.status(201).json({
            message: "Insert OK",
            info: result
        })

    } catch (err) {
        res.status(500).json({ message: 'ผมปัญหาในการทำงาน', error: err.message }) // ส่งข้อความแสดงข้อผิดพลาด
    }
}

// -------------------------------------------------------------------------------------------------
//ฟังก์ชั่นแก้ไชข้อมูลการกินในตาราง kinkun_tb
exports.editKinkun = async (req, res) => {
    try {
        //คำสั่งการทำงานกับฐานข้อมูลผ่าน Prisma
        let result = {}

        //ตรวจสอบว่ามีการอัปโหลดไฟล์เพื่อแก้ไขหรือไม้
        if (req.file) {
            //กรณีทีมีการอัปโหลดไฟล์เพื่อแก้ไข หากมีไฟล์เก่าอยู่ให้ลบไฟล์เก่านั้นออกก่อน
            const kinkun = await prisma.kinkun_tb.findFirst({
                where: {
                    kinkunId: parseInt(req.params.kinkunId)
                }
            })
            if (kinkun.kinkunImage) {
                const fs = require('fs');
                fs.unlink(path.join("images/kinkun", kinkun.kinkunImage))
            }
            //--
            result = await prisma.kinkun_tb.update({
                data: {
                    kinkunTitle: req.body.kinkunTitle,
                    kinkunState: req.body.kinkunState,
                    kinkunDate: req.body.kinkunDate,
                    kinkunCost: parseFloat(req.body.kinkunCost),
                    kinkunImage: req.file ? req.file.path.replace("images\\kinkun\\", "") : "",
                    userId: parseInt(req.body.userId)
                },
                //เงื่อนไขในการแก้ไข
                where: {
                    kinkunId: parseInt(req.params.kinkunId)
                }
            })
        }

        else {
            result = await prisma.kinkun_tb.update({
                data: {
                    kinkunTitle: req.body.kinkunTitle,
                    kinkunState: req.body.kinkunState,
                    kinkunDate: req.body.kinkunDate,
                    kinkunCost: parseFloat(req.body.kinkunCost),
                    userId: parseInt(req.body.userId)
                },
                //เงื่อนไขในการแก้ไข
                where: {
                    kinkunId: parseInt(req.params.kinkunId)
                }
            })
        }

        //เมื่อทำงานเสร็จเรียบร้อยส่งผลการทำงานกลับไปยัง Client 
        res.status(200).json({
            message: "Update OK",
            info: result
        })
    }
    catch (err) {
        res.status(500).json({ message: 'ผมปัญหาในการทำงาน', error: err.message }) // ส่งข้อความแสดงข้อผิดพลาด
    }
}

// -------------------------------------------------------------------------------------------------
//ฟังก์ชั่นลบข้อมูลการกินในตาราง kinkun_tb
exports.delelKinkun = async (req, res) => {
    try {
        const result = await prisma.kinkun_tb.delete({
            where: {
                kinkunId: parseInt(req.params.kinkunId)
            },
        })

        //เมื่อทำงานเสร็จเรียบร้อยส่งผลการทำงานกลับไปยัง Client 
        res.status(200).json({
            message: "Delet OK",
            info: result
        })
    } 
    catch (err) {
        res.status(500).json({ message: 'ผมปัญหาในการทำงาน', error: err.message }) // ส่งข้อความแสดงข้อผิดพลาด
    }
}

// -------------------------------------------------------------------------------------------------
//ฟังก์ชั่นแสดงข้อมูลที่บันทึกไว้ทั้งหมดของตาราง kinkun_tb ของ user ตาม userId
exports.ShowAllKinkun = async (req, res) => {
    try {
        const result = await prisma.kinkun_tb.findMany({
            where: {
                userId: parseInt(req.params.userId)
            }
        })

        //เมื่อทำงานเสร็จเรียบร้อยส่งผลการทำงานกลับไปยัง Client 
        if (result) { //ตรวจสอบว่ามีข้อมูลหรือไม่
            res.status(200).json({
                message: "Get OK",
                info: result
            })
        } else {
            res.status(404).json({
                message: "Not Found",
                info: result
            })
        }

    }

    catch (err) {
        res.status(500).json({ message: 'ผมปัญหาในการทำงาน', error: err.message }) // ส่งข้อความแสดงข้อผิดพลาด
    }
}

// -------------------------------------------------------------------------------------------------
//ฟังก์ชั่นดึงข้อมูลการกินตาม kinkunId ในตาราง kinkun_tb
exports.ShowOnlyKinkun = async (req, res) => {
    try {
        const result = await prisma.kinkun_tb.findFirst({
            where: {
                kinkunId: parseInt(req.params.kinkunId)
            }
        })

        //เมื่อทำงานเสร็จเรียบร้อยส่งผลการทำงานกลับไปยัง Client 
        if (result) { //ตรวจสอบว่ามีข้อมูลหรือไม่
            res.status(200).json({
                message: "Get OK",
                info: result
            })
        } else {
            res.status(404).json({
                message: "Not Found",
                info: result
            })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'ผมปัญหาในการทำงาน', error: err.message }) // ส่งข้อความแสดงข้อผิดพลาด
    }
}