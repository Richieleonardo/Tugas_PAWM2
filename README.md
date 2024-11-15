
# Tugas PAWM 2

Berikut merupakan virtual lab saya yang mengajarkan user-nya untuk memanggil instruksi dan melakukan operasi sederhana dengan operator (+)

Richie Leonardo 18222071

Untuk akses langsung ke website dapat masuk ke link vercel :

```url
  https://tugas-pawm-2.vercel.app/	

```

## Repository Structure :
ROOT\
│   .env\
│   .gitignore\
│   game.html\
│   index.html\
│   login.html\
│   package-lock.json\
│   package.json\
│   profile.html\
│   register.html\
│   vercel.json\
│\
├───.vercel\
│   │   project.json\
│   │   README.txt\
│   │\
│   └───cache\
├───api\
│   │   index.js\
│   │   user.js\
│   │\
│   └───database\
│        db.js\
│\
├───img\
│       block.png\
│       finish.png    
│\
├───JS\
│       levels.mjs\
│       main.js\
│\
├───model\
│       user.js\
│\
│\
├───styles\
│        game.css\
│        index.css

## API Reference

### Register

Melakukan registrasi pada user dengan username, email, dan pasword

```http
  POST /register
```

#### Request
##### Headers:
Content-Type: application/json

| Parameter | Type     | Description                         |
| :-------- | :------- | :-----------------------------------|
| `name`    | `string` | **Required**. Username              |
| `email`   | `string` | **Required**. Email address user    |
| `password`| `string` | **Required**. Password user         |

### Login

```http
  POST /login
```
Melakukan login pada user dengan email dan password
#### Request
##### Headers
Content-Type: application/json

| Parameter | Type     | Description                         |
| :-------- | :------- | :-----------------------------------|
| `email`   | `string` | **Required**. Email address user yang tersimpan   |
| `password`| `string` | **Required**. Password user dalam database       |

### Update

```http
  PUT /:id/level
```

#### Request
##### Headers
Content-type: application/json

#### Path Parameter

| Parameter | Type     | Description                         |
| :-------- | :------- | :-----------------------------------|
| `id`    | `string` | **Required**. Indentifier unik user            |

#### Body Parameter

| Parameter | Type     | Description                         |
| :-------- | :------- | :-----------------------------------|
| `level`    | `number` | **Required**. Menyimpan level (progress)user          |

