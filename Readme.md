# Readme 🚀
	🚢 docker
		ใน file docker-compose.yaml ใช้สำหรับจำลอง api web server, redis และ mongo db มีการ set volumes
		 - redis -> รันที่ port: 6379    
		 - mongo db -> รันที่ port: 27017
		 - สามารถจำลองด้วย command -> docker compose up -d --build
		 - สามารถยกเลิกด้วย command -> docker compose down --volumes

	🛠️ การ config ค่า ENV
		- ใช้ไฟล์ .env เพื่อ config ค่าต่างๆใน server
		- อนุญาตินำ ไฟล์ .env ขึ้น repo เพื่อให้ง่ายต่อการตรวจ
		- ถ้า server ไม่สามารถ ต่อ mongo และ redis ได้ ก่อน timeout จะไม่ยอมให้ start serve
		- run server ใน dev env ได้โดย command -> npm run dev (แต่ต้อง รัน redis, mongo ก่อน)
	
	⚙️ สามารถเปลี่ยนค่า port ที่ รัน server, redis, mongo db ได้ แต่ต้องเปลี่ยน config -> docker-compose, .env

	📄 api-doc ใน post man
		- สามารถ import จากไฟล์ sms-2-pro-test.postman_collection.json
		- มีตัวแปร variable 2 ตัวคือ {{url}} และ {{access_token}} (สำหรับ http header authorization)

 **👏👏👏ขอบคุณสำหรับ โอกาสครับ หวังว่าจะได้ร่วมงานกันนะครับ👏👏👏**