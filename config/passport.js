"use strict";

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { model as UserAccounts } from '../models/userAccountModel.js';


// configure session management

// Configure Passport.js to use the local strategy

const local_strategy = new LocalStrategy((username, password, done) => {
    //verify credentials
    UserAccounts.findByUsername(username)

        .then((user) => {
            //user not found
            if (!user) return done(null, false, "Bad Login");

            //bad password
            //if (!bcrypt.compareSync(password, user.password)) return done(null, false, "Bad Login");
            if (password != user.password) return done(null, false, "Bad Login");
            return done(null, user);
        })

        .catch((err) => done(err));
})

//promise implementation, not sure how it works yet
/* const local_strategy = new LocalStrategy((username, password) => {
    return new Promise((resolve, reject) => {
        // Verify the user's credentials
        UserAccounts.findByUsername(username)
            .then(user => {
                if (!user) {
                    return reject(new Error('Invalid username or password'));
                }

                // Compare the provided password with the user's hashed password
                if (!bcrypt.compareSync(password, user.password)) {
                    return reject(new Error('Invalid username or password'));
                }

                // User credentials are valid, resolve with the user object
                resolve(user);
            })
            .catch(err => reject(err));
    });
}); */


passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        //user_id from userAccountModel
        cb(null, user.user_id)
    })
})

passport.deserializeUser((user_id, cb) => {
    process.nextTick(() => {
        UserAccounts.findByUID(user_id)

            .then((user) => {
                if (!user) return cb(null, false);
                return cb(null, user);
            })

            .catch((err) => cb(err));
    })
})

passport.use(local_strategy)

export default passport;
export { passport as passport_config }

