## Piyush Chourasiya Api for Node js

## Installation

Clone the repository

    git clone

Install Node js the dependencies using npm

    npm install

> Note: Add the required credentials in config/development.json file, for refrence sample.config.json file is there.

Setup local dev config file .

     set node_env=development

Setup database. ( db name : "demo") and run commands

sh
cd sequelize-cli
sequelize db:migrate

> Note: cd sequelize-cli folder path then run 

Run

    npm start dev

> Note: run on project root path  & before that set config file

Your server address in browser .it will run at local dev

sh
http://localhost:3000

for api doc (Swagger) visit

sh
http://localhost:3000/doc/

## Database field description

-   name: It is a varchar type field with a maximum length of 50 characters.
-   email: It is a varchar type field with a maximum length of 90 characters.
-   password: It is an text type.
-   _isAdmin: It is a int type field with a maximum length of 1 characters. 0 is for customer & 1 is for admin.
-   _isActive: int type field with a maximum length of 1 characters. 0 is for unactive & 1 is for active.
-   _token: It is an text type.
-   _lastLogin: It is an text type.
-   createdAt:  It is an text type.
