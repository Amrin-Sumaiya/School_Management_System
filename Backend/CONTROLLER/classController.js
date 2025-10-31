import Classes from "../MODEL/classModel.js";
import Subject from "../MODEL/SubjectModel.js";


// Create Classroom
export const create = async (req, res) => {
  // console.log("ClassRoomSubjectPlan===========>>>>", req.body);

  try {
    const { Class, RoomNo, ClassRoomSubjectPlan } = req.body;

    const classExist = await Classes.findOne({ RoomNo });
    if (classExist) {
      return res.status(400).json({ message: "ClassRoom already assigned." });
    }

    const newClass = new Classes({
      Class,
      RoomNo,
      ClassRoomSubjectPlan,
    });

    const savedData = await newClass.save();

    const populatedData = await Classes.findById(savedData._id).populate(
      "ClassRoomSubjectPlan",
      "subjectName subjectCode"
    );

    res.status(200).json(populatedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


// Get all classrooms
export const getAllClassInfo = async (req, res) => {
  try {
    const classData = await Classes.find()
      .populate("ClassRoomSubjectPlan", "subjectName subjectCode description")
      .lean();

    if (!classData || classData.length === 0) {
      return res.status(404).json({ message: "ClassRoom not found" });
    }

    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get classroom by ID
export const getClassroomById = async (req, res) => {
  try {
    const id = req.params.id;
    const classExist = await Classes.findById(id).populate(
      "ClassRoomSubjectPlan",
      "subjectName subjectCode"
    );

    if (!classExist) {
      return res.status(404).json({ message: "ClassRoom not found" });
    }
    res.status(200).json(classExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update classroom
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { Class, RoomNo, ClassRoomSubjectPlan } = req.body;

    const classExist = await Classes.findById(id);
    if (!classExist) {
      return res.status(404).json({ message: "ClassRoom not found" });
    }

    await Classes.findByIdAndUpdate(
      id,
      { Class, RoomNo, ClassRoomSubjectPlan },
      { new: true }
    );

    // Fetch updated document with populated subjects
    const updatedData = await Classes.findById(id).populate(
      "ClassRoomSubjectPlan",
      "subjectName subjectCode"
    );

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete classroom
export const deleteClassInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const classExist = await Classes.findById(id);

    if (!classExist) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    await Classes.findByIdAndDelete(id);
    res.status(200).json({ message: "Classroom information deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
