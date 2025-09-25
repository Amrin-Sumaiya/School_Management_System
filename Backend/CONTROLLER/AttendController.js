import Attendance from '../MODEL/AttendModel.js';
import TeacherModel from '../MODEL/TeacherModel.js';

// Create Attendance
export const create = async (req, res) => {
  try {
    const { studentId, date, remarks } = req.body;

    const createdRecords = [];
    const skippedRecords = [];

    if (!studentId || !Array.isArray(studentId)) {
      return res
        .status(400)
        .json({ message: 'Invalid or missing studentId array' });
    }

    for (const student of studentId) {
      const { id, status: studentStatus } = student;

      if (!id || !studentStatus) {
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
          status: studentStatus,
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

// Get absent students per day/today
export const getAbsentStudentsForDay = async (req, res) => {
  try {
    const dateOnly = req.query.date || new Date().toISOString().split('T')[0];

    const absentAttendances = await Attendance.find({
      date: dateOnly,
      status: 'Absent',
    }).populate({
      path: 'studentId',
      populate: {
        path: 'class',
        model: 'Classes',
        select: 'Class',
      },
    });

    const absentStudents = absentAttendances.map((record) => {
      const student = record.studentId;
      return {
        name: student.name,
        class: student.class?.Class || '',
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

// Get all present students per day  for superadmin
export const getPresentStudentsForDay = async (req, res) => {
  try {
    const dateOnly =req.query.date || new Date().toISOString().split('T')[0];

    const presentAttendances = await Attendance.find({
      date: dateOnly,
      status: 'Present',
    }).populate({
      path: 'studentId',
      populate: {
        path: 'class',
        model: 'Classes',
        select: 'Class',
      },
    });

    const presentStudents = presentAttendances.map((record) => {
      const student = record.studentId;
      return {
        name: student.name,
        class: student.class?.Class || '',
        roll: student.studentId,
        contact: student.gurdianContact,
      };
    });
    res.status(200).json(presentStudents);
  } catch(error){
    console.error('Error fetching present students: ', error);
    res.status(500).json({ errorMessage: error.message });
  }
}

// Get absent students per class per day under each class teacher
export const getAbsentStudentsForDayByTeacher = async (req, res) => {
  try {
    const dateOnly = req.query.date || new Date().toISOString().split('T')[0];
    const teacherId = req.query.teacherId;

    if (!teacherId) {
      return res.status(400).json({ message: 'Teacher ID is required' });
    }

    // Find the class assigned to this teacher
    const teacher = await TeacherModel.findById(teacherId).select('classTeacherOf');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher Not Found' });
    }

    const absentAttendances = await Attendance.find({
      date: dateOnly,
      status: 'Absent',
    }).populate({
      path: 'studentId',
      match: { class: teacher.classTeacherOf }, // Filter by teacher's class
      populate: { path: 'class', model: 'Classes', select: 'Class' },
    });

    const absentStudents = absentAttendances
      .filter((record) => record.studentId) // Ensure student exists
      .map((record) => {
        const student = record.studentId;
        return {
          name: student.name,
          class: student.class?.Class || '',
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

// Get present students per class per day under each class teacher
export const getPresentStudentsForDayByTeacher = async (req, res) => {
  try {
    const dateOnly = req.query.date || new Date().toISOString().split('T')[0];
    const teacherId = req.query.teacherId;

    if (!teacherId) {
      return res.status(400).json({ message: 'Teacher ID is required' });
    }

    // find the class assigned to this teacher
    const teacherClass = await TeacherModel.findById(teacherId).select('classTeacherOf');

    if (!teacherClass?.classTeacherOf) {
      return res.status(404).json({ message: 'No class assigned to this teacher' });
    }

    const presentAttendances = await Attendance.find({
      date: dateOnly,
      status: 'Present',
    }).populate({
      path: 'studentId',
      match: { class: teacherClass.classTeacherOf }, // filter by teacher's class
      populate: { path: 'class', model: 'Classes', select: 'Class' },
    });

    const presentStudents = presentAttendances
      .filter(record => record.studentId)
      .map(record => {
        const student = record.studentId;
        return {
          name: student.name,
          class: student.class?.Class || '',
          roll: student.studentId,
          contact: student.gurdianContact,
        };
      });

    res.status(200).json(presentStudents);
  } catch (error) {
    console.error('Error fetching present students: ', error);
    res.status(500).json({ errorMessage: error.message });
  }
};

//get daily summury for present and absent updating the coulumn grapgh
export const getDailySummaryByTeacher = async (req, res) => {
  try {
    const teacherId = req.query.teacherId;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID is required "});

    }
    //find class assinged teacher
    const teacher = await TeacherModel.findById(teacherId).select("classTeacherOf");
    if (!teacher?.classTeacherOf) {
      return res.status(404).json({ messsage: "No class assigned to this teacher" });
    }
    
    //Group attendance by date & status for this teacher's class
    const summary = await Attendance.aggregate([
      {
        $lookup: {
          from: "students", //student model collecction name
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: "$student" },
      {
        $match: {
          "student.class": teacher.classTeacherOf,
        },
      },

      {
        $group: {
          _id: { date: "$date", status: "$status" },
          count: { $sum: 1},
        },
      },
      {
        $group: {
                    _id: "$_id.date",
          present: {
            $sum: { $cond: [{ $eq: ["$_id.status", "Present"] }, "$count", 0] },
          },
          absent: {
            $sum: { $cond: [{ $eq: ["$_id.status", "Absent"] }, "$count", 0] },
          },
        },
      }  ,
       { $sort: { _id: 1 } },

    ]);

   // Format for frontend
    const formatted = summary.map((item) => ({
      date: item._id,
      present: item.present,
      absent: item.absent,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching daily summary:", error);
    res.status(500).json({ errorMessage: error.message });

  }
}

//Get all students attendace performance By percentage way

export const getAttendancePercentageForDay = async (req, res) => {
  try {
    const dateOnly = req.query.date || new Date().toISOString().split("T")[0];

    const totalAttendances = await Attendance.countDocuments({ date: dateOnly })
    const presentCount = await Attendance.countDocuments({
      date: dateOnly,
      status: "Present",
    });

    const absentCount = await Attendance.countDocuments({
      date: dateOnly,
      status: "Absent",
    });

    if (totalAttendances === 0) {
      return res.status(200).json({
        date: dateOnly,
        presentPercentage: 0,
        absentPercentage: 0,
      });
    }

    const presentPercentage = ((presentCount / totalAttendances) * 100).toFixed(2);
    const absentPercentage = (( absentCount / totalAttendances ) * 100).toFixed(2);

    res.status(200).json({
      date: dateOnly,
      presentPercentage: parseFloat(presentPercentage),
      absentPercentage: parseFloat(absentPercentage),
    });
  } catch (error){
    console.error("Error calculating attendance in percentage: ", error);
    res.status(500).json({ errorMessage: error.message });
  }
}




