import Attendance from '../MODEL/AttendModel.js';

// Create Attendance
export const create = async (req, res) => {
  try {
    const { studentId, date, status, remarks } = req.body;

    const createdRecords = [];
    const skippedRecords = [];

    if (!studentId || !Array.isArray(studentId)) {
      return res
        .status(400)
        .json({ message: 'Invalid or missing studentId array' });
    }

    for (const student of studentId) {
      const { id, status } = student;

      if (!id || !status) {
        skippedRecords.push({ id, reason: 'Missing student ID or status' });
        continue;
      }

      try {
        // Check if attendance already exists for this student on the same date
        const exists = await Attendance.findOne({
          studentId: id,
          date: {
            $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
            $lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
          },
        });

        if (exists) {
          skippedRecords.push({
            id,
            reason: 'Attendance already recorded for this date',
          });
          continue;
        }

        const newAttendance = new Attendance({
          studentId: id,
          date,
          status,
          remarks: remarks || '',
        });

        const saved = await newAttendance.save();
        createdRecords.push(saved);
      } catch (innerError) {
        skippedRecords.push({
          id,
          reason: `Error saving record: ${innerError.message}`,
        });
      }
    }

    return res.status(201).json({
      message: 'Attendance process completed',
      created: createdRecords,
      skipped: skippedRecords,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get All Attendance Records
export const getAllAttendanceRecord = async (req, res) => {
  try {
    const attendanceData = await Attendance.find().populate('studentId');

    if (!attendanceData || attendanceData.length === 0) {
      return res.status(404).json({ message: 'Attendance records not found.' });
    }

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Attendance by ID
export const UpdateAttendanceById = async (req, res) => {
  try {
    const id = req.params.id;
    const attendanceExist = await Attendance.findById(id);

    if (!attendanceExist) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    const updatedData = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

//get absent students per day/today

export const getAbsentStudentsForDay = async (req, res) => {
  try {
    const isoString = '2025-08-08T05:52:41';
    const dateOnly = isoString.split('T')[0];

    // const Date = new Date('2025-08-06T18:31:08.404+00:00')
    const absentAttendances = await Attendance.find({
      date: dateOnly,
      status: 'Absent',
    }).populate('studentId'); //students details
    console.log('absentAttendances=============>>>>', absentAttendances);
    //Extract and map students data
    const absentStudents = absentAttendances.map((record) => {
      const student = record.studentId;
      return {
        name: student.name,
        class: student['class'],
        roll: student.studentId,
        contact: student.gurdianContact,
      };
    });

    res.status(200).json(absentStudents);
  } catch (error) {
    console.error('Error fetching absent students: ', error);
    res.status(500).json({ errorMessage: error.message });
  }
};
