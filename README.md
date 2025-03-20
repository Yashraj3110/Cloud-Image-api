# image-upload-api

Setup :----

<!-- NPM INSTALL -->

- npm install

<!-- RUN SERVER -->

- npm run server


Usage :----

<!-- Post API -->

http://localhost:8085/upload

(Body > form-data > key = image , type = file > select image )

<!-- Get API -->

http://localhost:8085/images

(Retrive all images data saved in the cloudinary)

<!-- Delete API -->

http://localhost:8085/delete/:id

(replace ":id" with the "_id" in mongodb database)


Other details :----

<!-- postman collection -->

https://winter-crescent-905436.postman.co/workspace/New-Team-Workspace~98b3ce97-6b41-4757-a0c4-38e841c2d451/collection/28548248-47e32f4c-ce9c-45f2-a639-fb18f321ff73?action=share&creator=28548248

<!-- API is not live  -->

Geting problem in vercel hosting that's why api is working on localhost