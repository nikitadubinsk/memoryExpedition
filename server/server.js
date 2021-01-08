const express = require('express');
const PORT = 3000;
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

const CONFIG = {
  DB: "zitrnikgm2_jew",
  USERNAME: "zitrnikgm2_jew",
  PASSWORD: "Nd2021Nd",
  DIALECT: "postgres",
  HOST: "pg2.sweb.ru"
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
  URLPicture: {
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

// Дальше идут запросы

app.post("/api/newquestion", async (req, res) => {
  try {
    let result = await Questions.create({
      text: req.body.text,
      cost: req.body.cost,
      answer1: req.body.answer1,
      answer2: req.body.answer2,
      answer3: req.body.answer3,
      correctAnswer: req.body.correctAnswer,
      category: req.body.category,
      URLPicture: req.body.URLPicture,
      URLVideo: req.body.URLVideo,
      isOpen: false
    });
    res.send(result)
  }
  catch (e) {
    console.error(e);
    res.status(500).send({
      message: `Произошла небольшая ошибка во время создания нового вопроса (${e.message})`
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
    let result = await Users.findAll({});
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
    let result = await Questions.findAll({});
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
    let result = await Players.findAll({});
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

app.delete("/api/delete/players/:id", async (req, res) => {
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

sequelize
  //.sync({ force: true })
  .sync()
  .then(result=>{
    console.log("Вы успешно подключились к базе данных");
  })
  .catch(err=> console.log(err));

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
})