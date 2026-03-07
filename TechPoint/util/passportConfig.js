// util/passportConfig.js
const LocalStrategy = require("passport-local").Strategy;
const { getConnection } = require("./db.js");
const bcrypt = require("bcrypt");

function initialize(passport) {
  const authenticateUser = async (req, email, password, done) => {
    try {
      // Extract credentials from nested object (req.body.user)
      const userEmail = req.body?.user?.email;
      const userPassword = req.body?.user?.password;

      if (!userEmail || !userPassword) {
        return done(null, false, { message: "Missing credentials" });
      }

      const db = getConnection();
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        userEmail,
      ]);

      if (result.rows.length === 0) {
        return done(null, false, { message: "No user with that email" });
      }

      const user = result.rows[0];

      bcrypt.compare(userPassword, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (isMatch) {
          const { password, ...safeUser } = user;
          return done(null, safeUser);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      });
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // Passes the request object to the callback
      },
      authenticateUser,
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const db = getConnection();
      const result = await db.query(
        "SELECT user_id, name, email, image_url FROM users WHERE user_id = $1",
        [id],
      );

      if (result.rows.length === 0) {
        return done(null, false);
      }

      done(null, result.rows[0]);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;