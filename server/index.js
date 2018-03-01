require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const auth0Strategy = require('passport-auth0');
const massive = require('massive');
const controller = require('./controller');
const twilio_controller = require('./twilio_controller');
const cron_service = require('../server/cron_service');

//initialize variables stored in .env
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

//Top-level middleware
const app = express();

//to make sure req.body exists
app.use(express.json() );

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//for passport to interact with our session
app.use(passport.initialize() );
app.use(passport.session() );

//connecting server to database using massive
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log("db connected");
    cron_service(db)
}).catch(console.log)

//setup auth0 strategy
//used to authenticate user login
passport.use(new auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) { //(accessToken, refreshToken, extraParams, profile, done)=>{}
//delete "done(null, profile)" from here---as we are going to invoke it in the db calls below 
//make database calls using the unique user_id from auth0
const db = app.get('db')

const{ sub, name, picture } = profile._json//profile information that came back from google authentication. sub = user_id

db.users.find_user([sub]).then(response => {
    if (response[0]) {//response at index 0 already has a user created, if yes go onto serialize user, if not create it first in the else clause below
        done(null, response[0].id)
    } else {
        db.users.create_user([name, picture, sub]).then( response => {
            done(null, response[0].id)
        }).catch(console.log)//name, picture, user_id as it appears when it came back from google authentication. Pass them here in the order they appear in our db file. You have to put a break, run debugger, and hover over it to see it

    }
}).catch(console.log)

}));

//serializeUser passes profile from callback above to another callback function that pushes the profile into session. deserialize never gets called at this point
//deserialise gets called after login before any endpoint (axios call) gets called. it goes to get the information stored in session during serialize and puts it on req.user.(id, name, anything)
//session store is being kept in memory...we will either create or fetch session. Deserialize now only goes to grab the id and replaces profile with id in the serialized and deserialized methods
passport.serializeUser( (id, done) => {
    done(null, id);
})
passport.deserializeUser( (id, done) => {
    // done(null, profile)
    const db = app.get('db');
    db.users.find_logged_in_user([id]).then(res => {
        done(null, res[0])
    }).catch(console.log)
});

//authentication endpoints
app.get('/auth', passport.authenticate('auth0'));//when a user hit the login button to kick off authentication
app.get('/auth/callback',passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/patients'
}))
//and get redirected to callback which inturn redirects user to front-end


app.get('/auth/me', (req, res) => {
    if(!req.user) {
        res.status(404).send('Not logged in.')
    } else {
        console.log(req.user)
        res.status(200).send(req.user)
    }
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/')//redirects user to the home page after logout
}) 

//=====household endpoints========
app.post('/api/house_hold', controller.addHousehold)


//=====patients endpoints========
app.post('/api/patient', controller.addPatient)
app.get('/api/household/:hh_id/patients', controller.getPatients)
app.put('/api/user/phone', controller.addPhone)

//======medication endpoints=====
app.post('/api/medication', controller.addMedication)
app.get('/api/medication/:id', controller.getMedication)
app.put('/api/medication/:id', controller.editMedication)
app.delete('/api/medication/:id', controller.deleteMedication)
app.get('/api/individualrecords/:id', controller.getPatientMedications)

//======schedule dosage endpoints=======
app.post('/api/dosagelog', controller.scheduleDosage)



app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`);
})