# HoD News page about gaming
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

![Skylab](https://github.com/Iggy-Codes/logo-images/blob/master/logos/skylab-56.png)
## Backend technologies
[![npm](https://github.com/oscmedgon/logo-images/blob/master/logos/npm.png)](https://www.npmjs.com)
[![NodeJS](https://github.com/oscmedgon/logo-images/blob/master/logos/nodejs.png)](https://nodejs.org)
[![ExpressJS](https://github.com/oscmedgon/logo-images/blob/master/logos/expressjs.png)](http://www.expressjs.com)
[![Passport](https://github.com/oscmedgon/logo-images/blob/master/logos/passport.png)](http://www.passportjs.org)
[![MongoDB](https://github.com/oscmedgon/logo-images/blob/master/logos/mongodb.png)](https://www.mongodb.com)
[![PugJS](https://github.com/oscmedgon/logo-images/blob/master/logos/pug.png)](http://www.pugjs.org)
[![HTML5,CSS3 and JS](https://github.com/FransLopez/logo-images/blob/master/logos/html5-css3-js.png)](http://www.w3.org/)
[![ES6](https://github.com/oscmedgon/logo-images/blob/master/logos/es6.png)](http://www.ecma-international.org/ecma-262/6.0/)

## Frontend technologies
[![HTML5,CSS3 and JS](https://github.com/FransLopez/logo-images/blob/master/logos/html5-css3-js.png)](http://www.w3.org/)
[![ES6](https://github.com/oscmedgon/logo-images/blob/master/logos/es6.png)](http://www.ecma-international.org/ecma-262/6.0/)
[![Reactjs](https://video-react.js.org/assets/logo.png)](https://reactjs.org/)


## Pre-requisites and how to install it
### IMPORTANT! for every test you can use my test administrator
```
Super Secure in a production build remove this user
username: 1
password: 1
```

The first step if you want to use this project it's create a mongo database you can do it online [!Mlab](https://mlab.com), it's free.
Then you have to import my test database located in the project folder */prerequisites* you can do it with this command (You have to import collections one by one there is not a magical command to do it):

```
mongoimport -h <YOUR-DB-URL>.mlab.com:57245 -d hod-db -c <DB-COLLECTION(users & articles)> -u <YOUR-DB-USER> -p <YOUR-DB-PASSWORD> --file <PATH-TO-/-INPUT-FILE.json>
```
You did it, now configure enviroment create a new file in the project root called *.env* it musth have all the following lines (Modify them to match with your needs):
```
URL_DB=mongodb://<YOUR-DB-USER>:<YOUR-DB-PASSWORD>@ds<YOUR-DB-URL>.mlab.com:57245/YOUR-DB-NAME
SECRET=<YOUR-SUPER-SECRET>
UPLOAD_FOLDER=uploads
#
# THE FOLLOWING SECTION IT'S TO CONFIGURE CLOUDINARY TO STORAGE ALL IMAGE UPLOADS CREATE AN ACOUNT BEFORE CONTINUE
#
CLOUD_NAME=<YOUR-CLOUD-NAME>
API_KEY=<YOUR-API-KEY>
API_SECRET=<YOUR-API-SECRET>

```
# If you are reading this..., You rules.
You are ready to get started, just run this command at your project root(I'm not going to hack your computer or anything like that, just install node dependencies and run server in developement state):
```
npm run superStart
```
```
.then(return 'Open your brouser and go to http://localhost:8080')
```

Now you have your server runing and working, if not mail me or leave me a comment.
if you want to modify administration site you have to clone this repo:
[!hod-administration-site](https://github.com/oscmedgon/hod-administration-page-react)
After clone run this command at the project root:
```
npm start
```
It will open a live server in the url localhost:3000, navigate to localhost:3000/administration
For more information about create-react-app go to the oficial repo [!here](https://github.com/facebookincubator/create-react-app)
