// CONTROLLER/ResultController.js
import Result from "../MODEL/ResultModel.js";

const MILLIS_24H = 24 * 60 * 60 * 1000;

/**
 * Helper to compute grade from total (0-100)
 */
const calculateGrade = (total) => {
  if (total >= 90) return "A+";
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  if (total >= 33) return "E";
  return "F";
};

/**
 * Create or update a result.
 * - If a matching result exists and is older than 24h => locked => 403
 * - If exists and within 24h => update allowed
 * - If not exists => create
 */
export const create = async (req, res) => {
  try {
    const {
      studentId,
      classLevel,
      subjectId,
      CT1 = 0,
      CT2 = 0,
      HalfYearly = 0,
      Yearly = 0,
      remarks = "",
    } = req.body;

    if (!studentId || !classLevel || !subjectId) {
      return res.status(400).json({ message: "studentId, classLevel and subjectId are required." });
    }

    // compute totals and grade
    const totalMarks =
      Number(CT1 || 0) + Number(CT2 || 0) + Number(HalfYearly || 0) + Number(Yearly || 0);
    const grade = calculateGrade(totalMarks);

    const existing = await Result.findOne({ studentId, classLevel, subjectId });

    if (existing) {
      const age = Date.now() - new Date(existing.createdAt).getTime();
      if (age > MILLIS_24H) {
        // locked
        return res.status(403).json({ message: "Result locked: cannot modify after 24 hours." });
      }
      // update existing
      existing.CT1 = CT1;
      existing.CT2 = CT2;
      existing.HalfYearly = HalfYearly;
      existing.Yearly = Yearly;
      existing.totalMarks = totalMarks;
      existing.grade = grade;
      existing.remarks = remarks;
      const saved = await existing.save();
      return res.status(200).json({ message: "Result updated", result: saved });
    }

    // create new
    const newResult = new Result({
      studentId,
      classLevel,
      subjectId,
      CT1,
      CT2,
      HalfYearly,
      Yearly,
      totalMarks,
      grade,
      remarks,
    });

    const saved = await newResult.save();
    return res.status(201).json({ message: "Result created", result: saved });
  } catch (error) {
    console.error("Create Result Error:", error);
    // if unique index collision somehow
    if (error.code === 11000) {
      return res.status(409).json({ message: "Result already exists (unique constraint)." });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Get all results (populated)
 */
export const getAllResultsData = async (req, res) => {
  try {
    const resultsData = await Result.find()
      .populate("studentId", "name studentId")
      .populate("subjectId", "subjectName")
      .populate("classLevel", "Class");

    return res.status(200).json(resultsData);
  } catch (error) {
    console.error("Get All Results Error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Get results for a given classLevel + subjectId
 * Query params: ?classLevel=...&subjectId=...
 * Returns an array of results (may be empty)
 */
export const getResultsByClassAndSubject = async (req, res) => {
  try {
    const { classLevel, subjectId } = req.query;
    if (!classLevel || !subjectId) {
      return res.status(400).json({ message: "classLevel and subjectId are required as query parameters." });
    }

    const results = await Result.find({ classLevel, subjectId }).lean();

    // return results with createdAt so frontend can compute lock
    return res.status(200).json(results);
  } catch (error) {
    console.error("Get Results By Class & Subject Error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Get by id
 */
export const getResultById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Result.findById(id)
      .populate("studentId", "name studentId")
      .populate("subjectId", "subjectName")
      .populate("classLevel", "Class");

    if (!result) return res.status(404).json({ message: "Result not found" });
    return res.status(200).json(result);
  } catch (error) {
    console.error("Get Result By ID Error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Update by id (within 24h lock)
 */
export const updateResultData = async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await Result.findById(id);
    if (!existing) return res.status(404).json({ message: "Result not found" });

    const age = Date.now() - new Date(existing.createdAt).getTime();
    if (age > MILLIS_24H) {
      return res.status(403).json({ message: "Result locked: cannot modify after 24 hours." });
    }

    // update allowed
    const updates = req.body;
    // compute totals if CT fields provided (fallback to existing)
    const CT1 = updates.CT1 !== undefined ? updates.CT1 : existing.CT1;
    const CT2 = updates.CT2 !== undefined ? updates.CT2 : existing.CT2;
    const HalfYearly = updates.HalfYearly !== undefined ? updates.HalfYearly : existing.HalfYearly;
    const Yearly = updates.Yearly !== undefined ? updates.Yearly : existing.Yearly;
    const totalMarks = Number(CT1) + Number(CT2) + Number(HalfYearly) + Number(Yearly);
    const grade = calculateGrade(totalMarks);

    const updated = await Result.findByIdAndUpdate(
      id,
      {
        ...updates,
        CT1,
        CT2,
        HalfYearly,
        Yearly,
        totalMarks,
        grade,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Result updated successfully", result: updated });
  } catch (error) {
    console.error("Update Result Error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Delete
 */
export const DeleteResultData = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Result.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Result not found" });
    return res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Delete Result Error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};

/**
 * Get failed students by year (unchanged)
 */
export const getFailedStudentsByYear = async (req, res) => {
  try {
    let { year } = req.params;
    if (!year) year = new Date().getFullYear().toString();

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${parseInt(year, 10) + 1}-01-01`);

    const failedStudents = await Result.find({
      grade: "F",
      createdAt: { $gte: startDate, $lt: endDate },
    })
      .populate({
        path: "studentId",
        select: "name studentId gurdianContact guardianContact class",
        populate: { path: "class", select: "Class" },
      })
      .populate("subjectId", "subjectName")
      .populate("classLevel", "Class");

    if (!failedStudents.length) {
      return res.status(200).json([]);
    }

    const formatted = failedStudents.map((item) => ({
      studentObjectId: item.studentId?._id?.toString() || "N/A",
      rollNumber: item.studentId?.studentId || "N/A",
      name: item.studentId?.name || "N/A",
      class: item.studentId?.class || item.classLevel || "N/A",
      gurdianContact:
        item.studentId?.gurdianContact || item.studentId?.guardianContact || "N/A",
      subject: item.subjectId?.subjectName || "N/A",
      exam: item.examId?.examName || "N/A",
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("Get Failed Students Error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};


//Get result for admin classlevel and subject wise 
// student fetched from class wise getting the subjectwise result of every students

export const getClassWiseResultForAdmin = async (req, res) => {
  try {
    const { classLevel, subjectId } = req.query;

    if (!classLevel) {
      return res.status(400).json({ message: "classLevel is required as query parameter." });
    }

    let query = { classLevel };
    // Only filter by subjectId if it's provided and not 'all'
    if (subjectId && subjectId !== "all") {
      query.subjectId = subjectId;
    }

    // Fetch results
    const results = await Result.find(query)
      .populate("studentId", "name studentId class")
      .populate("subjectId", "subjectName")
      .lean();

    // Group results by student
    const grouped = results.reduce((acc, r) => {
      const studentId = r.studentId._id.toString();
      if (!acc[studentId]) {
        acc[studentId] = {
          name: r.studentId.name,
          class: r.studentId.class,
          studentId: r.studentId.studentId,
          subjects: [],
        };
      }
      acc[studentId].subjects.push({
        subjectName: r.subjectId.subjectName,
        totalMarks:
          Number(r.CT1 || 0) +
          Number(r.CT2 || 0) +
          Number(r.HalfYearly || 0) +
          Number(r.Yearly || 0),
        grade: r.grade,
      });
      return acc;
    }, {});

    return res.status(200).json(Object.values(grouped));
  } catch (error) {
    console.error("Get Result For Admin Error: ", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};


//studetns wise result 
export const getStudentResult = async (req, res) => {
  try {
    const  studentId  = req.params.id.trim();

    if (!studentId) {
      return res.status(400).json({ message: "studentId is required" });
    }

    const results = await Result.find({ studentId })
    .populate("studentId", "name studentId class")
      .populate("subjectId", "subjectName")
      .populate("classLevel", "Class");

    if (!results || results.length === 0) {
      return res.status(404).json({ 
        status: "No Data Found",
        message:  "No results found for this student" });
    }

    // extract student info from first result
    const studentInfo = {
      name: results[0].studentId.name,
      studentId: results[0].studentId.studentId,
      class: results[0].classLevel.Class
    };

    console.log(studentInfo)
    // format subjects
    const subjects = results.map(r => ({
      subjectName: r.subjectId.subjectName,
      total:
        Number(r.CT1) +
        Number(r.CT2) +
        Number(r.HalfYearly) +
        Number(r.Yearly),
      grade: r.grade
    }));

    return res.status(200).json({
      ...studentInfo,
      subjects
    });

  } catch (error) {
    console.error("Student Result Error:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};



//GET student result for classTeacher  for a specific result 



export const getStudentResultForClassTeacher = async (req, res) => {
  try {
    console.log(req.params);
    console.log("Fetching student result for class teacher...");  
    
    const classId = req.params.id.trim();


    if (!classId) {
      return res.status(400).json({ message: "classId is required" });
      
    }
    

    // fetch results of all studetns in this 
    
    const results = await Result.find({ studentId: classId })
    .populate({
  path: "studentId",
  select: "name studentId class",
  populate: { path: "class", select: "Class" }
})

    .populate("subjectId", "subjectName")
    .populate("classLevel", "Class")
    .lean();


    if (!results.length) {
      return res.status(404).json({ message: "No results found for this student" });
 }
   // Group results by student just like in admin version

   const grouped = results.reduce(( acc, r) => {
    const stuId = r.studentId._id.toString();

    if (!acc[stuId]) {
      acc[stuId] = { 
        id: stuId, 
        name: r.studentId.name,
        class: r.studentId.class,
        studentId: r.studentId.studentId,
        subjects: [],
      };
    }




    acc[stuId].subjects.push({
      subjectName: r.subjectId.subjectName,
      total: 
      Number(r.CT1 || 0) +
      Number(r.CT2 || 0) +
      Number(r.HalfYearly || 0) +
      Number(r.Yearly || 0),
      grade: r.grade,
    })

    return acc;
   }, {});

   return res.status(200).json(Object.values(grouped));

    } catch (error){
      console.error("Teacher Get Student Result Error:", error);
      return res.status(500).json({ errorMessage: error.message });
    }


    
  }


