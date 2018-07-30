# 

create a .env file in the root folder with the values :

```
NODE_ENV=development


DB_USER = <postgresql username>
DB_PW = <postgresql password>
JWT_SECRET = <'A secret for jwt (string)'>

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

Before deplying remove mobx-react-devtools from dependencies (eslint is complaining)
Just has a basic user signup/login so far. 