const { verifySingUp} = require('../middleware');
const controller = require('../controller/auth.controller');
module.exports = function(app){
    app.use(function(req, res , next) {
        res.header(
            "Access.Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/singup",
        [verifySingUp.checkUserOrEmail , verifySingUp.checkROLES],controller.singup
    )
    app.post(
        "/api/auth/singin",
        controller.singIn
    )
    app.post(
        "/api/auth/refrechToken",
        controller.refreshToken
    )
}