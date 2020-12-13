var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bCrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.databases);

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM conturi WHERE id = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true,
            },
            function (req, username, password, done) {
                connection.query("SELECT * FROM conturi WHERE username = ? ", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'Username is already taken'));
                    } else {
                        var newUserMysql = {
                            username: username,
                            password: bCrypt.hashSync(password, null, null),
                            role: req.body.optiuni,
                        };
                        var insertQuery = "INSERT INTO conturi (username, password, role) values (?, ?, ?)";
                        //console.log(newUserMysql.role);

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.role], function (err, rows) {
                            newUserMysql.id = rows.insertId;
                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true,
            },
            function (req, username, password, done) {
                connection.query("SELECT * FROM conturi WHERE username = ? ", [username], function (err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'User not found'));
                    }
                    if (!bCrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Wrong password'));
                    return done(null, rows[0]);
                });
            })
    );
};