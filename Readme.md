# Readme 🚀
	🚢 docker
		api web server นี้ มี Dockerfile สามารถสร้าง docker image ได้
		*** หมายเหตุค่า env จะต้องไป set ที่เครื่อง sever นั้นๆ ให้เรียบร้อยก่อนถึง จะ run container และทำงานได้ปกติ

		ใน file docker-compose.yaml ใช้สำหรับจำลอง redis และ mongo db มีการ set volumes
		 - redis -> รันที่ port: 6379    
		 - mongo db -> รันที่ port: 27017
		 - สามารถจำลองด้วย command -> docker compose up -d

	🛠️ การ config ค่า ENV
		- ใช้ไฟล์ .env เพื่อ config ค่าต่างๆใน server
		- อนุญาตินำ ไฟล์ .env ขึ้น repo เพื่อให้ง่ายต่อการตรวจ
		- ถ้า server ไม่สามารถ ต่อ mongo และ redis ได้ ก่อน timeout จะไม่ยอมให้ start serve
		- run server ใน dev env ได้โดย command -> npm run dev
	
	⚙️ สามารถเปลี่ยนค่า port ที่ รัน server, redis, mongo db ได้ แต่ต้องเปลี่ยน config -> docker-compose, .env

	📄 api-doc ใน post man
		- สามารถ import จากไฟล์ sms-2-pro-test.postman_collection.json
		- มีตัวแปร variable 2 ตัวคือ {{url}} และ {{access_token}} (สำหรับ http header authorization)

 **👏👏👏ขอบคุณสำหรับ โอกาสครับ หวังว่าจะได้ร่วมงานกันนะครับ👏👏👏**