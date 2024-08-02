const controller = require("../controllers/controller.js");
const auth_mw = require("../middelware/auth.mw.js")

module.exports = (app) => {
    app.post("/signup", [auth_mw.verifySignUpBody], controller.signup);
    app.post("/signin", [auth_mw.verifySignInBody], controller.signIn);

};

