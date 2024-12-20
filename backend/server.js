const mysql = require('mysql2');
const express = require('express'); 
const app = express();
const port = 5000; 


app.get('/', (req, res) => {
  res.send('Backend is  working!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




const db = mysql.createConnection({
    host: '127.0.0.1:3306',
    user: 'root',  
    password: '', 
    database: 'juevents',  
  });
  
 
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database');
  });
  
