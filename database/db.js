const sqlite3 = require('sqlite3').verbose();

const db_name = 'db.sqlite3';

const db = new sqlite3.Database(db_name
    , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the ' + db_name + ' database.');
    }
);

// Create a table
db.serialize(() => {
    const sql = `
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY,
            user_type INTEGER,
            username TEXT,
            password TEXT
          );
        
          CREATE TABLE IF NOT EXISTS Destination (
            id INTEGER PRIMARY KEY,
            name TEXT,
            country_code INTEGER
          );
        
          CREATE TABLE IF NOT EXISTS Attraction (
            id INTEGER PRIMARY KEY,
            name TEXT,
            destination_id INTEGER,
            FOREIGN KEY(destination_id) REFERENCES Destination(id)
          );
        
          CREATE TABLE IF NOT EXISTS Accommodation (
            id INTEGER PRIMARY KEY,
            name TEXT,
            destination_id INTEGER,
            FOREIGN KEY(destination_id) REFERENCES Destination(id)
          );      
    `;
    db.run(sql, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Created table(s)... ');
    });
});

class User {
    static all(callback) {
        db.all('SELECT * FROM User', (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            callback(rows);
        });
    }

    static create(username,password,user_type, callback) {
        // Insert a user into the database
        const sql = 'INSERT INTO User (user_type, username, password) VALUES (?, ?, ?)';
        db.run(sql, [user_type, username, password], function (err) {
            if (err) {
                console.error(err.message);
            }
            callback(this.lastID);
        });
    }

    static find(id, callback) {
        // Find a user in the database
        const sql = 'SELECT * FROM User WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            callback(row);
        });
    }

    static findByUsername(username, callback) {
        // Find a user in the database
        const sql = 'SELECT * FROM User WHERE username = ?';
        db.get(sql, [username], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            callback(row);
        });
    }
}

module.exports = {
    User: User
};