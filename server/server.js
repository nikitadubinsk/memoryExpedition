const express = require('express');
const PORT = 3001;
const bodyParser = require('body-parser');
const multer = require("multer");
const history = require("connect-history-api-fallback");
const serveStatic = require("serve-static");
const fileUpload = require("express-fileupload");
const path = require("path");
const uniqueFilename = require("unique-filename");

const app = express();

// Парсинг json - application/json
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Парсинг json
app.use(bodyParser.json());

app.use(history());

// Настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// Обработка статических файлов
app.use("/", serveStatic(path.join(__dirname, "../dist/memoryExpedition")));

// Работа со статическими файлами
app.use(express.static(path.join(__dirname, "../dist")));

// Работа со статическими файлами
app.use("/public", express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/memoryExpedition/index.html"));
});


const CONFIG = {
  DB: "std_704",
  USERNAME: "std_704",
  PASSWORD: "12345678",
  DIALECT: "mysql",
  HOST: "std-mysql.ist.mospolytech.ru"
}

const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONFIG.DB, CONFIG.USERNAME, CONFIG.PASSWORD, {
  dialect: CONFIG.DIALECT,
  host: CONFIG.HOST,
});

const Users = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Players = sequelize.define("Players", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

const Questions = sequelize.define("Questions", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  answer1: {
    type: Sequelize.STRING,
    allowNull: true
  },
  answer2: {
    type: Sequelize.STRING,
    allowNull: true
  },
  answer3: {
    type: Sequelize.STRING,
    allowNull: true
  },
  correctAnswer: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: true
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: true
  },
  URLVideo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
})

const Op = Sequelize.Op;

// Дальше идут запросы

// Получение файла и загрузка его в папку uploads
app.post("/api/upload-photo/", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let photo = req.files.file0;
      let name = uniqueFilename("") + "." + photo.name.split(".")[1];
      photo.mv("./server/uploads/" + name);
      res.send({
        status: true,
        message: "File is uploaded",
        filename: name,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Произошла небольшая ошибка во время загрузки картинки (${e.message})`
    })
  }
});

//Получение полного пути файла
app.get("/api/photo/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", req.params.filename));
});

app.post("/api/newquestion", async (req, res) => {
  let count = await Questions.count({
    where: { category: req.body.category }
  });
  console.log(count);
  if (count < 6) {
    try {
      let result = await Questions.create({
        text: req.body.text,
        cost: req.body.cost,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
        correctAnswer: req.body.correctAnswer,
        category: req.body.category,
        picture: req.body.picture,
        URLVideo: req.body.URLVideo,
        isOpen: false
      });
      res.send(result)
    } catch (e) {
      console.error(e);
      res.status(500).send({
        message: `Произошла небольшая ошибка во время создания нового вопроса (${e.message})`
      })
    }
  } else {
    res.status(500).send({
      message: `Количество вопросов в данной категории не должно быть больше 6 (сейчас уже ${count})`
    })
  }
})

app.post("/api/newuser", async (req, res) => {
  try {
    let result = await Users.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.send(result)
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Произошла небольшая ошибка во время создания нового пользователя"
    })
  }
})

app.post("/api/auth", async (req, res) => {
  try {
    let result = await Users.count({
      where: { email: req.body.email, password: req.body.password }
    });
    if (result === 0) {
      result = await Users.count({
        where: { email: req.body.email }
      });
      if (result == 0) {
        res.status(500).send({
          message: "Данный пользователь не найден"
        });
      } else {
        res.status(500).send({
          message: "Неверный пароль"
        });
      }
    } else {
      res.send(true);
    }
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: `Произошла небольшая ошибка во время авторизации (${e.message})`
    })
  }
})

app.get("/api/users", async (req, res) => {
  try {
    let result = await Users.findAll();
    res.send(result)
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Произошла небольшая ошибка при получении списка всех администраторов"
    })
  }
})

app.get("/api/questions", async (req, res) => {
  try {
    let result = await Questions.findAll();
    res.send(result)
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Произошла небольшая ошибка при получении списка всех вопросов"
    })
  }
})

app.get("/api/players", async (req, res) => {
  try {
    let result = await Players.findAll();
    res.send(result)
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Произошла небольшая ошибка при получении списка всех игроков"
    })
  }
})

app.post("/api/newplayer", async (req, res) => {
  try {
    let result = await Players.create({
      name: req.body.name,
      link: req.body.link,
      points: req.body.points,
    });
    res.send(result)
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Произошла небольшая ошибка во время сохранения данных нового игрока"
    })
  }
})

app.delete("/api/deleteplayer/:id", async (req, res) => {
  try {
    let result = await Players.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.send(result.status)
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Произошла небольшая ошибка во время удаления данных игрока"
    })
  }
})

app.get("/api/statistics", async (req, res) => {
  try {
    let countAllPlayers = await Players.count()
    let countForLastMounth = await Players.count({
      where: {'createdAt': {[Op.gte]: new Date(new Date() - 31 * 24 * 60 * 60 * 1000)}}
    })
    let countForLastWeek = await Players.count({
      where: {'createdAt': {[Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)}}
    })
    let maxPoints = await Players.max('points');
    let minPoints = await Players.min('points');
    let sumPoints = await Players.sum('points');
    let avg = (sumPoints / countAllPlayers);
    let result = {
      countAllPlayers: countAllPlayers,
      countForLastMounth: countForLastMounth,
      countForLastWeek: countForLastWeek,
      maxPoints: maxPoints,
      minPoints: minPoints,
      avg: avg
    }
    res.send(result)
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: `Произошла небольшая ошибка во время получения статистики ${e.message}`
    })
  }
})

app.use(history());

sequelize
  //.sync({ force: true })
  .sync()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
    })
    console.log("Вы успешно подключились к базе данных");
  })
  .catch(err=> console.log(err));

