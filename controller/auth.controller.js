const db = require("../models");
const config = require("../config/auth.config");

const { user: User, role: Roles, refreshToken: REFRESHTOKEN } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Op = db.Sequelize.Op;

//singUpdated
exports.singup = (req, res) => {
  //save User to DB
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Roles.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User already Successfully Created" });
          });
        });
      } else {
        user.setRoles([1]);
        res.send({ message: "User already Successfully Created" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//SingInUser
exports.singIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404)({ message: "user not found" });
      }
      let passwordIsnot = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsnot) {
        return res.status(401)({
          accessToken: null,
          message: "Error password",
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        //allowInsecureKeySize:true,
        expiresIn: config.jwtExpiration,
      });
      const refresh = await REFRESHTOKEN.createToken(user);

      let authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE " + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          refreshToken: refresh,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });

 
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: {
        token: requestToken,
      },
    });
    if (!refreshToken) {
      res.status(403).json({ message: "Refresh Token is not in database!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destory({ where: { id: refreshToken.id } });
      res
        .status(403)
        .json({
          message:
            "Refresh Token was expired. Please make a new signin request",
        });
      return;
    }
    const user = await refreshToken.getUser();
    let newAccassToken = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      //allowInsecureKeySize:true,
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccassToken,
      refreshToken: refreshToken.token,
    });
  } catch (error) {
    res.status(500).send({ message: err });
  }
};
