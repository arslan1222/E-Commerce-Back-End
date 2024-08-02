const categoryController = require("../controllers/category.controller.js");
const authmw = require("../middelware/auth.mw.js");


module.exports = (app)=>{
    app.post("/categories",[authmw.verifyToken, authmw.isAdmin], categoryController.createNewCategory);
}