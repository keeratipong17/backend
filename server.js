const express = require('express');
require('dotenv').config();

//สร้าง Web server ด้วย express
const app = express();

// กำหนดหมายเลข
const PORT = process.env.PORT;

// ตัว middleware จะใข้ในการจัดการงานต่างๆ ของ web server
app.use(cors()); //ใช้ cors เพื่อให้สามารถเข้าถึง api ได้จากที่อื่นได้ เรียกใช้งานข้าม
app.use(express.json());

//บอก webser ว่าจะใช้ URL ที่มี Prefix อะไรบ้างที่จะเรียอกใช้งาน API ต่างๆ 
app.use('/user',require('./routes/user'))
app.use('/kinkun',require('./routes/kinkun'))

// บอก webserver ในการใช้งานไฟล์ในโฟเดอร์ images
app.use('/images/user',require('./images/user'))
app.use('/images/kinkun',require('./images/kinkun'))

// คำสั่งเพื่อใช้ทดสอบดารเข้าใช้งาน web server (หาไม่ใช้ลบทิ้งได้ หรือจะคอมเมนด็ได้ หรือปล่อยไว้ก็ได้)
app.get('/',(req,res) => {
    res.json({message: 'ยินดีต้อนรับสู่ web server ของเรา!...'});
})

//กำหนดหมายเลขพอร์ต เพื่อรอรับการเข้าใข้งาน web server
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}...`)
})