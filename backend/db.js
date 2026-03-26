const mysql = require('mysql2');

// Create a connection pool to the database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yash', // Changed from YOUR_PASSWORD
    database: 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Connect to the database visually in logs (optional for pool, but good for feedback)
connection.getConnection((err, conn) => {
    if (err) {
        console.error('Error connecting to MySQL Database:', err.message);
    } else {
        console.log('Successfully connected to MySQL database.');
        conn.release();
    }
});

module.exports = connection;
