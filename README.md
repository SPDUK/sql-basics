# 

create a .env file in the root folder with the values :

```
NODE_ENV=development


DB_USER = 'postgresql username'
DB_PW = 'postgresql password'
JWT_SECRET = 'A secret for jwt (string)'
SG_KEY = 'sendgrid key goes here'

```

```
yarn install 
```


While working on the front-end: 
```
yarn run clientDev
```


While working on the back-end:
```
yarn run serverDev
```
Just has a basic user signup/login so far. 

Before deplying remove mobx-react-devtools from dependencies (eslint is complaining)
Use NODE_ENV='production' to remove warnings from console (from form inputs etc)