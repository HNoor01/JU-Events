const Student = require("../models/students");

const studentsController = {
  login: async (req, res) => {
    try {
      const { student_id, password } = req.body;

      const student = await Student.findOne({ where: { student_id } });

      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }

      
      if (student.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      return res.status(200).json({ message: 'Login successful', student });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = studentsController;
