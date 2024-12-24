const Students = require("../models/students.js");

const studentLogin = async (req, res) => {
  try {
    const { student_id, password } = req.body;

    // تحقق من وجود بيانات student_id و password
    if (!student_id || !password) {
      return res.status(400).json({ message: 'Student ID and password are required' });
    }

    const student = await Students.findOne({ where: { student_id } });

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
};


module.exports = { studentLogin };

