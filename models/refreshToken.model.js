const config = require("../config/auth.config");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
  const refreshToken = sequelize.define("refreshToken", {
    token: {
      type: Sequelize.STRING,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  });
  refreshToken.createToken = async (user) => {
    let expiryDate = new Date();
    expiryDate.setSeconds(
      expiryDate.getSeconds() + config.jwtRefreshExpiration
    );
    let _token = uuidv4();
    let refreshTokenweb = await refreshToken.create({
      token: _token,
      userId: user.id,
      expiryDate: expiryDate,
    });
    return refreshTokenweb.token;
  };

  refreshToken.verifyExpiration = (token) => {
    return token.expuDate.getTime() < new Date().fetTime();
  }

  return refreshToken;
};
