import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/UserSchema';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';

// Define local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const foundUser = await UserModel.findOne({ username });

      if (!foundUser) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isMatch = bcrypt.compareSync(password, foundUser.password);

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, foundUser);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        // Find user in database by googleId
        const user = await UserModel.findOne({ googleId: profile.id });

        if (user) {
          // User already exists
          return done(null, user);
        } else {
          // User does not exist, create new user
          const newUser = new UserModel({
            googleId: profile.id,
            email: profile.emails![0].value,
            name: profile.displayName,
            image: profile.photos![0].value,
          });
          await newUser.save();
          return done(null, newUser);
        }
      } catch (error) {
        console.error(error);
        done(error as any);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});
// Deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// export default passport;
