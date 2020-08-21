var db = require("../models");
const passport = require("../config/passport");


module.exports = function (app) {
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.body);
    });
    // Backend register route, creates new user in DB
    app.post("/api/register", function (req, res) {
        console.log(req.body);
        db.User.create(req.body).then(function () {
            res.redirect(307, "/api/login");
        }).catch(err => {
            res.status(401).json(err);
        });
    });


  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });
};