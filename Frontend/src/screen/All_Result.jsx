import React, { useEffect, useState } from "react";
import axiosAuthInstance from "../common/axiosAuthInstance";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

const All_Result = ({ teacherId }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [classLevels, setClassLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [loading, setLoading] = useState(false);

  // Predefined exam structure
  const examTypes = {
    CT1: 10,
    CT2: 10,
    HalfYearly: 30,
    Yearly: 50,
  };

  //  Grade calculation based on total
  const calculateGrade = (total) => {
    const percentage = (total / 100) * 100; // since total max = 100
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    if (percentage >= 33) return "E";
    return "F";
  };

  //  Fetch teacherId
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.userID) teacherId = userInfo.userID;
  }, []);

  //  Fetch classes
  useEffect(() => {
    axiosAuthInstance
      .get("https://backend-just.onrender.com/api/class/all_classInfo")
      .then((res) => setClassLevels(res.data))
      .catch((err) => console.error("Error fetching classes:", err));
  }, []);

  //  Fetch students for selected class
  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      axiosAuthInstance
        .get(
          `https://backend-just.onrender.com/api/classlevels-with-students?class=${encodeURIComponent(
            selectedClass
          )}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) setStudents(res.data);
          else setStudents([]);
        })
        .catch((err) => console.error("Error fetching students:", err))
        .finally(() => setLoading(false));
    }
  }, [selectedClass]);

  // Fetch teacher’s subjects
  useEffect(() => {
    if (!teacherId) return;
    axiosAuthInstance
      .get(`https://backend-just.onrender.com/api/teachers/teacher/${teacherId}`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.subjects)) {
          setSubjects(res.data.subjects);
        } else {
          setSubjects([]);
        }
      })
      .catch((err) => console.error("Error fetching subjects:", err));
  }, [teacherId]);

  //  Handle marks change with validation
  const handleMarksChange = (studentId, exam, value) => {
    const numValue = Number(value);
    const maxAllowed = examTypes[exam];

    if (numValue > maxAllowed) {
      toast.error(`Max marks for ${exam} is ${maxAllowed}`);
      return;
    }

    setMarksData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [exam]: numValue,
      },
    }));
  };

  // Calculate grade dynamically
  const getStudentGrade = (studentId) => {
    const studentMarks = marksData[studentId];
    if (!studentMarks) return "";
    const total =
      (studentMarks.CT1 || 0) +
      (studentMarks.CT2 || 0) +
      (studentMarks.HalfYearly || 0) +
      (studentMarks.Yearly || 0);
    return calculateGrade(total);
  };

  // Submit/update result for one student
  const handleUpdate = async (studentId) => {
    const studentMarks = marksData[studentId];
    if (!studentMarks) {
      toast.error("Please enter marks before submitting.");
      return;
    }

    const total =
      (studentMarks.CT1 || 0) +
      (studentMarks.CT2 || 0) +
      (studentMarks.HalfYearly || 0) +
      (studentMarks.Yearly || 0);
    const grade = calculateGrade(total);

    const payload = {
      studentId,
      classLevel: selectedClass,
      subjectId: selectedSubject,
      totalMarks: total,
      grade,
    };

    try {
      await axiosAuthInstance.post(
        "https://backend-just.onrender.com/api/result/results",
        payload
      );
      toast.success("Result updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update result!");
    }
  };

  // Submit all students' results together
  const handleSubmitAll = async () => {
    if (!selectedClass || !selectedSubject) {
      toast.error("Please select both class and subject before submitting.");
      return;
    }

    const resultsPayload = students.map((student) => {
      const studentMarks = marksData[student._id] || {};
      const total =
        (studentMarks.CT1 || 0) +
        (studentMarks.CT2 || 0) +
        (studentMarks.HalfYearly || 0) +
        (studentMarks.Yearly || 0);
      const grade = calculateGrade(total);

      return {
        studentId: student._id,
        classLevel: selectedClass,
        subjectId: selectedSubject,
        totalMarks: total,
        grade,
      };
    });

    try {
      await Promise.all(
        resultsPayload.map((data) =>
          axiosAuthInstance.post(
            "https://backend-just.onrender.com/api/result/results",
            data
          )
        )
      );
      toast.success("All results submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit all results!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        🧾 Result Submission
      </h2>

      {/* Select Class */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setMarksData({});
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">-- Select Class --</option>
          {classLevels.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.Class}
            </option>
          ))}
        </select>
      </div>

      {/* Select Subject */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Select Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((subj) => (
            <option key={subj._id} value={subj._id}>
              {subj.subjectName}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <h3 className="text-lg font-semibold mb-3 text-indigo-700">
        Students Exam Result Submission:
      </h3>

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500">No students found for this class.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-800">
            <thead className="bg-gray-300">
              <tr>
                <th className="border border-gray-400 text-indigo-800 p-2">Roll</th>
                <th className="border border-gray-400 p-2">Name</th>
                <th className="border border-gray-400 p-2">CT-1</th>
                <th className="border border-gray-400 p-2">CT-2</th>
                <th className="border border-gray-400 p-2">Half Yearly</th>
                <th className="border border-gray-400 p-2">Yearly</th>
                <th className="border border-gray-400 p-2">Grade</th>
                <th className="border border-gray-400 p-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student._id || idx} className="text-center">
                  <td className="border border-gray-400 p-2">
                    {student.studentId || idx + 1}
                  </td>
                  <td className="border border-gray-400 p-2">{student.name}</td>
                  {Object.keys(examTypes).map((exam) => (
                    <td key={exam} className="border border-gray-400 p-2">
                      <input
                        type="number"
                        min="0"
                        max={examTypes[exam]}
                          placeholder={examTypes[exam]}
                        value={marksData[student._id]?.[exam] || ""}
                        onChange={(e) =>
                          handleMarksChange(student._id, exam, e.target.value)
                        }
                        className="w-20 border rounded px-2 py-1 text-center"
                      />
                    </td>
                  ))}
                  <td className="border border-gray-400 p-2 font-semibold text-blue-600">
                    {getStudentGrade(student._id)}
                  </td>
                  <td className="border border-gray-400 p-2">
<FaEdit
  onClick={() => handleUpdate(student._id)}
  className="text-blue-600  cursor-pointer hover:text-green-800 inline-block"
/>

                     
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/*  Submit All Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmitAll}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Submit  Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default All_Result;
