import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User } from "../models/user.mjs";
import dotenv from "dotenv";
dotenv.config();

// Serialize user ID to save it in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user by ID, retrieving user info from the database
passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) {
      throw new Error("User not found");
    }
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

// Configure GitHub strategy
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/github/callback",

  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user already exists in the database
      let user = await User.findOne({ githubId: profile.id });
      if (user) {
        // Update the accessToken and refreshToken if the user exists
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();
      } else {
        // Create a new user if not found

        user = await new User({
          githubId: profile.id,
          username: profile.username,
          accessToken,

        }).save();
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
));

export default passport;
