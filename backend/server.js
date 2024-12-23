const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/database');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const studentsRoutes = require('./routes/studentsRoutes'); 

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Event Management API!');
});


app.use('/api/admin', adminRoutes);

app.use('/api/event-requests', eventRoutes);

app.use('/api/students', studentsRoutes);

const PORT = 3000;
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    sequelize.sync({ alter: true }).then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });
