// components/All_Result.jsx
import React, { useEffect, useState } from "react";
import axiosAuthInstance from "../common/axiosAuthInstance";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

/**
 * Fixed exam config
 */
const examTypes = {
  CT1: 10,
  CT2: 10,
  HalfYearly: 30,
  Yearly: 50,
};

const MILLIS_24H = 24 * 60 * 60 * 1000;

const All_Result = ({ teacherId: propTeacherId }) => {
  const [teacherId, setTeacherId] = useState(propTeacherId || "");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [classLevels, setClassLevels] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marksData, setMarksData] = useState({}); // { studentId: { CT1,CT2,HalfYearly,Yearly, totalMarks, grade, createdAt } } //store marks
  const [loading, setLoading] = useState(false);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // read teacherId from localStorage if not passed
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!teacherId && userInfo?.userID) {
      setTeacherId(userInfo.userID);
    }
  }, [teacherId]);

  // fetch teacher subjects and classes
  useEffect(() => {
    if (!teacherId) return;
    axiosAuthInstance
      .get(`https://backend-just.onrender.com/api/teachers/teacher/${teacherId}`)
      .then((res) => {
        const teacher = res.data;
        if (!teacher) return;
        const subjectClassList =
          teacher.subjectTeacherOfClass?.map((item) => ({
            classId: item.classId?._id,
            className: item.classId?.Class,
            subjectId: item.subjectId?._id,
            subjectName: item.subjectId?.subjectName,
          })) || [];

        // Unique classes for select
        const uniqueClasses = Array.from(
          new Map(subjectClassList.map((c) => [c.classId, c.className])).entries()
        ).map(([id, name]) => ({ _id: id, Class: name }));

        setClassLevels(uniqueClasses);
        setSubjects(subjectClassList);
      })
      .catch((err) => {
        console.error("Error fetching teacher data:", err);
        toast.error("Failed to fetch teacher subjects");
      });
  }, [teacherId]);

  // fetch students when class selected
  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setMarksData({});
      return;
    }
    setLoading(true);
    axiosAuthInstance
      .get(
        `https://backend-just.onrender.com/api/classlevels-with-students?class=${encodeURIComponent(
          selectedClass
        )}`
      )
      .then((res) => {
        setStudents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        toast.error("Failed to fetch students");
      })
      .finally(() => setLoading(false));
  }, [selectedClass]);

  // Fetch existing results when both class and subject are selected
  useEffect(() => {
    const fetchExistingResults = async () => {
      if (!selectedClass || !selectedSubject) {
        // reset marksData if class or subject not selected
        setMarksData({});
        return;
      }

      try {
        const res = await axiosAuthInstance.get(
          `https://backend-just.onrender.com/api/result/result-by-class-subject?classLevel=${encodeURIComponent(
            selectedClass
          )}&subjectId=${encodeURIComponent(selectedSubject)}`
        );
        const results = Array.isArray(res.data) ? res.data : [];

        // Map results by studentId for quick lookup and include createdAt for lock check
        const map = {};
        results.forEach((r) => {
map[r.studentId.toString()] = {
  CT1: r.CT1 ?? r.ct1 ?? r.marks?.CT1 ?? r.marks?.ct1 ?? 0,
  CT2: r.CT2 ?? r.ct2 ?? r.marks?.CT2 ?? r.marks?.ct2 ?? 0,
  HalfYearly:
    r.HalfYearly ??
    r.halfYearly ??
    r.marks?.HalfYearly ??
    r.marks?.halfYearly ??
    0,
  Yearly:
    r.Yearly ??
    r.yearly ??
    r.marks?.Yearly ??
    r.marks?.yearly ??
    0,

  totalMarks:
    r.totalMarks ??
    r.total ??
    r.marks?.total ??
    ((r.CT1 || 0) +
      (r.CT2 || 0) +
      (r.HalfYearly || 0) +
      (r.Yearly || 0)),

  grade: r.grade ?? r.marks?.grade ?? "",

  createdAt: r.createdAt,
  resultId: r._id,
};

        });

        // Pre-fill only for students that exist in students list; keep others blank
        // But we set marksData for any student found
        setMarksData((prev) => ({ ...prev, ...map }));
      } catch (err) {
        console.error("Error fetching existing results:", err);
        // toast.error("Failed to fetch existing results");
      }
    };

    fetchExistingResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass, selectedSubject]);

  // helper to compute grade
  const calculateGrade = (total) => {
    if (total >= 90) return "A+";
    if (total >= 80) return "A";
    if (total >= 70) return "B";
    if (total >= 60) return "C";
    if (total >= 50) return "D";
    if (total >= 33) return "E";
    return "F";
  };

  // check if a student's result is locked (>24h since createdAt)
  const isLocked = (studentId) => {
    const entry = marksData[studentId];
    if (!entry || !entry.createdAt) return false;
    const created = new Date(entry.createdAt).getTime();
    return Date.now() - created > MILLIS_24H;
  };

  // handle change
  const handleMarksChange = (studentId, exam, value) => {
    const numValue = value === "" ? "" : Number(value);
    const maxAllowed = examTypes[exam];

    if (numValue !== "" && (isNaN(numValue) || numValue < 0)) return;
    if (numValue !== "" && numValue > maxAllowed) {
      toast.error(`Max marks for ${exam} is ${maxAllowed}`);
      return;
    }

    setMarksData((prev) => {
      const existing = prev[studentId] || {};
      return {
        ...prev,
        [studentId]: {
          ...existing,
          [exam]: numValue === "" ? undefined : numValue,
          // keep createdAt and resultId if present
          createdAt: existing.createdAt,
          resultId: existing.resultId,
        },
      };
    });
  };

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

  // open modal
  const openEditModal = (student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  // save single student result
  const saveSingleStudentResult = async () => {
    if (!editingStudent) return;

    const sId = editingStudent._id;
    const marks = marksData[sId] || {};
    const CT1 = marks.CT1 ?? 0;
    const CT2 = marks.CT2 ?? 0;
    const HalfYearly = marks.HalfYearly ?? 0;
    const Yearly = marks.Yearly ?? 0;

    const total = Number(CT1) + Number(CT2) + Number(HalfYearly) + Number(Yearly);
    const grade = calculateGrade(total);

    // Check lock
    if (marks.createdAt && isLocked(sId)) {
      toast.error("Result is locked and cannot be edited.");
      setModalOpen(false);
      return;
    }

    if (!selectedClass || !selectedSubject) {
      toast.error("Select class and subject before saving.");
      return;
    }

    const payload = {
      studentId: sId,
      classLevel: selectedClass,
      subjectId: selectedSubject,
      CT1,
      CT2,
      HalfYearly,
      Yearly,
      remarks: marks.remarks || "",
    };

    try {
      const res = await axiosAuthInstance.post(
        "https://backend-just.onrender.com/api/result/results",
        payload
      );

      // backend returns created or updated result (with createdAt)
      const returned = res.data.result;
      setMarksData((prev) => ({
        ...prev,
        [sId]: {
          CT1: returned.CT1,
          CT2: returned.CT2,
          HalfYearly: returned.HalfYearly,
          Yearly: returned.Yearly,
          totalMarks: returned.totalMarks,
          grade: returned.grade,
          createdAt: returned.createdAt,
          resultId: returned._id,
        },
      }));

      toast.success(res.data.message || "Saved successfully!");
      setModalOpen(false);
    } catch (err) {
      console.error("Save result error:", err);
      if (err?.response?.status === 403) {
        toast.error(err.response.data?.message || "Result locked.");
      } else {
        toast.error("Failed to save result");
      }
    }
  };

  // submit all
  const handleSubmitAll = async () => {
    if (!selectedClass || !selectedSubject) {
      toast.error("Please select both class and subject before submitting.");
      return;
    }

    const payloads = students.map((student) => {
      const sId = student._id;
      const m = marksData[sId] || {};
      const CT1 = m.CT1 ?? 0;
      const CT2 = m.CT2 ?? 0;
      const HalfYearly = m.HalfYearly ?? 0;
      const Yearly = m.Yearly ?? 0;
      return {
        studentId: sId,
        classLevel: selectedClass,
        subjectId: selectedSubject,
        CT1,
        CT2,
        HalfYearly,
        Yearly,
      };
    });

    try {
      const results = await Promise.all(
        payloads.map((p) =>
          axiosAuthInstance
            .post("https://backend-just.onrender.com/api/result/results", p)
            .then((r) => ({ ok: true, data: r.data }))
            .catch((e) => ({ ok: false, error: e }))
        )
      );

      let anyFailures = false;
      results.forEach((r, idx) => {
        const sid = payloads[idx].studentId;
        if (r.ok) {
          const returned = r.data.result;
          setMarksData((prev) => ({
            ...prev,
            [sid]: {
              CT1: returned.CT1,
              CT2: returned.CT2,
              HalfYearly: returned.HalfYearly,
              Yearly: returned.Yearly,
              totalMarks: returned.totalMarks,
              grade: returned.grade,
              createdAt: returned.createdAt,
              resultId: returned._id,
            },
          }));
        } else {
          anyFailures = true;
          // If locked (403), show a small toast per error (or aggregated)
          const err = r.error;
          if (err?.response?.status === 403) {
            toast.warning(`Student ${sid}: ${err.response.data?.message || "Locked"}`);
          } else {
            console.error("Submit error for student", sid, err);
          }
        }
      });

      if (anyFailures) {
        toast.warn("Some results failed to submit (see console/toasts).");
      } else {
        toast.success("All results submitted successfully!");
      }
    } catch (err) {
      console.error("Submit all error:", err);
      toast.error("Failed to submit all results");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        🧾 Result Submission
      </h2>

      <div className="mb-4">
        <label className="block font-medium mb-2">Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            // clear marksData when class changes — existing fetch effect will re-populate
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

      <div className="mb-6">
        <label className="block font-medium mb-2">Select Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            // marksData will be fetched by effect when both class & subject set
          }}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="">-- Select Subject --</option>
          {subjects
            .filter((subj) => subj.classId === selectedClass)
            .map((subj) => (
              <option key={subj.subjectId} value={subj.subjectId}>
                {subj.subjectName}
              </option>
            ))}
        </select>
      </div>

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
                <th className="border border-gray-400 p-2">Roll</th>
                <th className="border border-gray-400 p-2">Name</th>
                {Object.keys(examTypes).map((exam) => (
                  <th key={exam} className="border border-gray-400 p-2">
                    {exam}
                  </th>
                ))}
                <th className="border border-gray-400 p-2">Total</th>
                <th className="border border-gray-400 p-2">Grade</th>
                <th className="border border-gray-400 p-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => {
                const sid = student._id;
                const entry = marksData[sid] || {};
                const locked = isLocked(sid);
                  const totalMarks =
    (entry.CT1 || 0) +
    (entry.CT2 || 0) +
    (entry.HalfYearly || 0) +
    (entry.Yearly || 0);
                return (
                  <tr key={sid || idx} className="text-center">
                    <td className="border border-gray-400 p-2">{student.studentId || idx + 1}</td>
                    <td className="border border-gray-400 p-2">{student.name}</td>

                    {Object.keys(examTypes).map((exam) => (
                      <td key={exam} className="border border-gray-400 p-2">
                        <input
                          type="number"
                          min="0"
                          max={examTypes[exam]}
                          placeholder={examTypes[exam]}
                          value={entry[exam] ?? ""}
                          onChange={(e) => handleMarksChange(sid, exam, e.target.value)}
                          className="w-20 border rounded px-2 py-1 text-center"
                          disabled={locked}
                        />
                      </td>
                    ))}
       <td className="border border-gray-400 p-2 font-semibold text-purple-800">
        {totalMarks}
      </td>

                    <td className="border border-gray-400 p-2 font-semibold text-blue-600">
                      {getStudentGrade(sid)}
                    </td>

                    <td className="border border-gray-400 p-2">
                      <FaEdit
                        onClick={() => openEditModal(student)}
                        className={`text-blue-600 cursor-pointer hover:text-green-800 ${
                          locked ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        title={locked ? "Locked (24h)" : "Edit"}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmitAll}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Submit Results
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-3">Edit Marks - {editingStudent.name}</h3>

            {Object.keys(examTypes).map((exam) => (
              <div key={exam} className="mb-2">
                <label className="block font-medium">{exam}</label>
                <input
                  type="number"
                  min="0"
                  max={examTypes[exam]}
                  value={marksData[editingStudent._id]?.[exam] ?? ""}
                  onChange={(e) => handleMarksChange(editingStudent._id, exam, e.target.value)}
                  className="w-full border rounded px-2 py-1"
                  disabled={isLocked(editingStudent._id)}
                />
              </div>
            ))}

            <div className="flex gap-3 mt-4">
              <button
                onClick={saveSingleStudentResult}
                className={`bg-green-600 text-white px-4 py-2 rounded flex-1 ${
                  isLocked(editingStudent._id) ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLocked(editingStudent._id)}
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default All_Result;
