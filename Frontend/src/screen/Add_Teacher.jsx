import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";

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
  const [contactError, setContactError] = useState("");
  const [assignedSubjects, setAssignedSubjects] = useState([
    { classId: "", subjectId: "", availableSubjects: [] },
  ]);
  const [classes, setClasses] = useState([]);

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
      toast.error(error.response?.data?.message || "Failed to add teacher");
    }
  };

  return (
    <div className="min-h-screen  py-10 px-4">
      {/* Header */}
    
{/* Header */}
<div className="flex items-center justify-center gap-4 mb-10">
  <button
    onClick={() => navigate("/all-teacher-list")}
    className="flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
    title="Back"
  >
    <FaArrowLeft className="text-lg" />
  </button>
  <h1 className="text-3xl font-bold text-indigo-900 tracking-wide">
    Add New Teacher
  </h1>
</div>

     

      {/* Form Container */}
      <form
        onSubmit={handleOnSubmit}
        className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-100  to-indigo-50 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-indigo-100 space-y-8"
      >
        {/* Personal Info */}
        <section>
          <h2 className="text-lg font-semibold text-indigo-800 border-b pb-2 mb-4">
            👤 Personal Information
          </h2>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
            <Input label="Full Name" name="name" value={teacher.name} onChange={handleOnChange} />
            <Input label="Age" name="age" type="number" value={teacher.age} onChange={handleOnChange} />
            <Select label="Gender" name="sex" value={teacher.sex} onChange={handleOnChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Select>
            <Select
              label="Class Teacher Of"
              name="classTeacherOf"
              value={teacher.classTeacherOf}
              onChange={handleOnChange}
            >
              <option value="">Select Class (optional)</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.Class}
                </option>
              ))}
            </Select>
            <Input label="Email" name="email" type="email" value={teacher.email} onChange={handleOnChange} />
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
  <input
    type="text"
    name="contact"
    value={teacher.contact}
    onChange={(e) => {
      const value = e.target.value;
        if (!/^[0-9]*$/.test(value)) return;

      if (value === "" || /^01[0-9]{9}$/.test(value)) {
       setContactError("");
      } else {
        setContactError("Enter a valid mobile number (11 digits)");
      }
    }}
    placeholder="+8801XXXXXXXXX"
    maxLength={11}
    required
    className={`w-full border p-2 rounded-md focus:outline-none focus:ring-1 transition
      ${contactError ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-400"}`}
  />
  {contactError && (
    <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
      <span className="font-bold text-lg">!</span>
      <span>{contactError}</span>
    </div>
  )}
</div>

            <Input label="Join Date" name="join_date" type="date" value={teacher.join_date} onChange={handleOnChange} />
          </div>
        </section>

        {/* Academic Info */}
        <section>
          <h2 className="text-lg font-semibold text-indigo-800 border-b pb-2 mb-4">
            🎓 Academic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="University" name="university" value={teacher.university} onChange={handleOnChange} />
            <Input label="Department" name="department" value={teacher.department} onChange={handleOnChange} />
            <Input label="Passing Year" name="passingYear" value={teacher.passingYear} onChange={handleOnChange} />
            <Input label="Experience (in years)" name="experience" value={teacher.experience} onChange={handleOnChange} />
          </div>
        </section>

        {/* Subject Assignments */}
        <section>
          <h2 className="text-lg font-semibold text-indigo-800 border-b pb-2 mb-4">
            📘 Subject Teacher of
          </h2>

          <div className="space-y-4">
            {assignedSubjects.map((row, idx) => (
              <div
                key={idx}
                className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex flex-col md:flex-row gap-4 shadow-sm"
              >
                <select
                  value={row.classId}
                  onChange={async (e) => {
                    const newRows = [...assignedSubjects];
                    newRows[idx].classId = e.target.value;
                    newRows[idx].subjectId = "";
                    setAssignedSubjects(newRows);
                    await fetchClassSubjects(e.target.value, idx);
                  }}
                  className="w-full md:w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
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

                <select
                  value={row.subjectId}
                  onChange={(e) => {
                    const newRows = [...assignedSubjects];
                    newRows[idx].subjectId = e.target.value;
                    setAssignedSubjects(newRows);
                  }}
                  className="w-full md:w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select Subject</option>
                  {(row.availableSubjects || []).map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.subjectName}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setAssignedSubjects([
                  ...assignedSubjects,
                  { classId: "", subjectId: "", availableSubjects: [] },
                ])
              }
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition"
            >
              <FaPlusCircle /> Add Another Assignment
            </button>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
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
            className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => navigate("/all_teachers")}
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition shadow"
          >
            Save Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Components
const Input = ({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      required
    />
  </div>
);

const Select = ({ label, name, value, onChange, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 transition"
    >
      {children}
    </select>
  </div>
);

export default Add_Teacher;
