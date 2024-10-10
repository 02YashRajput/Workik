import passport from "passport";
import "../strategies/passport-github-strategies.mjs";
export const githubCallBackController =  (req, res, next) => {
  console.log("Received callback from GitHub...");
  passport.authenticate(
    "github",
    {
      failureRedirect: `${process.env.CLIENT_URL}?source=login&status=failure`,
    },
    (err, user, info) => {
      if (err) {
        console.error("Error during authentication:", err);
        return next(err);
      }
      if (!user) {
        console.log("Authentication failed. User not found.");
        return res.redirect(
          `${process.env.CLIENT_URL}?source=login&status=failure`
        ); // Redirect with source=login and status=failure
      }

      // Log successful authentication
      console.log("Authentication successful for user");
      req.logIn(user, (err) => {
        if (err) {
          console.error("Error logging in user:", err);
          return next(err);
        }
        // Successful login, redirect with source=login and status=success
        console.log("User logged in successfully. Redirecting to home.");
        return res.redirect(
          `${process.env.CLIENT_URL}?source=login&status=success`
        );
      });
    }
  )(req, res, next);
}