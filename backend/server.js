const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/database');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentsRoutes = require('./routes/studentsRoutes.js');

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
    
    // إضافة هذه الخطوة لمزامنة الجداول
    sequelize.sync({ alter: true })  // { alter: true } سيقوم بتحديث الجداول إذا كان هناك تغيير في النموذج
      .then(() => {
        console.log('Tables synced with the database!');
        app.listen(PORT, () => {
          console.log(`Server is running on http://localhost:${PORT}`);
        });
      })
      .catch(err => {
        console.error('Error syncing tables:', err);
      });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });
  
