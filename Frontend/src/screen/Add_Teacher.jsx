import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const Add_Teacher = () => {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    classTeacherOf: "",
    sex: "",
    join_date: "",
    age: "",
    contact: "",
    university: "",
    passingYear: "",
    department: "",
    experience: "",
  });

  const [assignedSubjects, setAssignedSubjects] = useState([
    { classId: "", subjectId: "", availableSubjects: [] },
  ]);

  const [classes, setClasses] = useState([]);

  //  Fetch all classes once
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          "https://backend-just.onrender.com/api/class/all_classInfo"
        );
        setClasses(res.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast.error("Failed to fetch classes");
      }
    };

    fetchClasses();
  }, []);

  //  Fetch subjects for a selected class
  const fetchClassSubjects = async (classId, idx) => {
    if (!classId) return;
    try {
      const res = await axios.get(
        `https://backend-just.onrender.com/api/class/class_subjects/${classId}`
      );
      const newRows = [...assignedSubjects];
      newRows[idx].availableSubjects = res.data;
      setAssignedSubjects(newRows);
    } catch (err) {
      console.error("Error fetching class subjects:", err);
      toast.error("Failed to load subjects for this class");
    }
  };

  

  const handleOnChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const teacherData = {
      ...teacher,
      subjectTeacherOfClass: assignedSubjects.map((row) => ({
        classId: row.classId,
        subjectId: row.subjectId,
      })),
    };

    try {
      await axios.post(
        "https://backend-just.onrender.com/api/teachers/teacher",
        teacherData
      );
      toast.success("Teacher added successfully!");
      navigate("/all-teacher-list");
    } catch (error) {
      console.error("Error adding teacher:", error);
      toast.error(
        error.response?.data?.message || "Failed to add teacher"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-indigo-50 p-6 rounded-md shadow-md mt-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/all-teacher-list")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-900">
        Add New Teacher
      </h2>

      <form
        onSubmit={handleOnSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Basic Info */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={teacher.name}
            onChange={handleOnChange}
            placeholder="Enter full name"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={teacher.age}
            onChange={handleOnChange}
            placeholder="Enter age"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Sex</label>
          <select
            name="sex"
            value={teacher.sex}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Class Teacher Of</label>
          <select
            name="classTeacherOf"
            value={teacher.classTeacherOf}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select Class (optional)</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.Class}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Assignments */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">
            Subject Teacher Assignments
          </label>

          {assignedSubjects.map((row, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              {/* Class Select */}
              <select
                value={row.classId}
                onChange={async (e) => {
                  const newRows = [...assignedSubjects];
                  newRows[idx].classId = e.target.value;
                  newRows[idx].subjectId = "";
                  setAssignedSubjects(newRows);
                  await fetchClassSubjects(e.target.value, idx);
                }}
                className="border p-2 rounded-md w-1/2"
              >
                <option value="">Select Class</option>
                {classes
                  .filter((cls) => cls._id !== teacher.classTeacherOf)
                  .map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.Class}
                    </option>
                  ))}
              </select>

              {/* Subject Select */}
              <select
                value={row.subjectId}
                onChange={(e) => {
                  const newRows = [...assignedSubjects];
                  newRows[idx].subjectId = e.target.value;
                  setAssignedSubjects(newRows);
                }}
                className="border p-2 rounded-md w-1/2"
              >
                <option value="">Select Subject</option>
                {(row.availableSubjects || []).map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.subjectName}
                  </option>
                ))}
              </select>

              {/* Add new row */}
              <button
                type="button"
                onClick={() =>
                  setAssignedSubjects([
                    ...assignedSubjects,
                    { classId: "", subjectId: "", availableSubjects: [] },
                  ])
                }
                className="bg-green-600 text-white px-3 rounded-md"
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* Other Fields */}
        <div>
          <label className="block font-medium mb-1">Contact</label>
          <input
            type="text"
            name="contact"
            value={teacher.contact}
            onChange={handleOnChange}
            placeholder="Enter phone number"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={teacher.email}
            onChange={handleOnChange}
            placeholder="Enter email"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Join Date</label>
          <input
            type="date"
            name="join_date"
            value={teacher.join_date}
            onChange={handleOnChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">University</label>
          <input
            type="text"
            name="university"
            value={teacher.university}
            onChange={handleOnChange}
            placeholder="Enter university"
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Department</label>
          <input
            type="text"
            name="department"
            value={teacher.department}
            onChange={handleOnChange}
            placeholder="Enter department"
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Passing Year</label>
          <input
            type="text"
            name="passingYear"
            value={teacher.passingYear}
            onChange={handleOnChange}
            placeholder="Enter passing year"
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Experience</label>
          <input
            type="text"
            name="experience"
            value={teacher.experience}
            onChange={handleOnChange}
            placeholder="Enter experience"
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>

          <button
            type="reset"
            onClick={() =>
              setTeacher({
                name: "",
                email: "",
                classTeacherOf: "",
                sex: "",
                join_date: "",
                age: "",
                contact: "",
                university: "",
                passingYear: "",
                department: "",
                experience: "",
              })
            }
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => navigate("/all_teachers")}
            className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_Teacher;
