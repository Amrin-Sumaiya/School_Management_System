import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const All_Result = ({ teacherId }) => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [marks, setMarks] = useState({});

  const [classLevels, setClassLevels] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ fetch classes
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/class/all_classInfo")
      .then((res) => setClassLevels(res.data))
      .catch((err) => console.error("Error fetching classes:", err));
  }, []);

  // ✅ fetch students when class selected
  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      axios
        .get(
          `http://localhost:8000/api/classlevels-with-students?class=${encodeURIComponent(
            selectedClass
          )}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) setStudents(res.data);
          else setStudents([]);
        })
        .catch((err) => {
          console.error("Error fetching students:", err);
          setStudents([]);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedClass]);

  // ✅ fetch exams
  useEffect(() => {
    axios 
      .get("http://localhost:8000/api/exam/all_exams")
      .then((res) => setExams(res.data))
      .catch((err) => console.error("Error fetching exams:", err));
  }, []);

  // ✅ fetch teacher's subjects
  useEffect(() => {
    if (teacherId) {
      axios
        .get(`http://localhost:8000/api/teacher/${teacherId}`)
        .then((res) => {
          if (res.data && res.data.subjects) setSubjects(res.data.subjects);
        })
        .catch((err) => console.error("Error fetching subjects:", err));
    }
  }, [teacherId]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleSubject = (subjectId) => {
    if (selectedSubjects.includes(subjectId)) {
      const updated = selectedSubjects.filter((s) => s !== subjectId);
      setSelectedSubjects(updated);
      const updatedMarks = { ...marks };
      delete updatedMarks[subjectId];
      setMarks(updatedMarks);
    } else {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    }
  };

  const getGradeAndRemarks = (mark) => {
    if (mark >= 90) return { grade: "A+", remarks: "Excellent" };
    else if (mark >= 70) return { grade: "A", remarks: "Very Good" };
    else if (mark >= 60) return { grade: "A-", remarks: "Good" };
    else if (mark >= 50) return { grade: "B", remarks: "Average" };
    else if (mark >= 40) return { grade: "C", remarks: "Below Average" };
    else if (mark >= 33) return { grade: "D", remarks: "Bad" };
    return { grade: "F", remarks: "Poor" };
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedStudent || !selectedExam || selectedSubjects.length === 0) {
      toast.error("Please complete all fields before submitting.");
      return;
    }

    try {
      for (const subjectId of selectedSubjects) {
        const mark = Number(marks[subjectId]) || 0;
        const { grade, remarks } = getGradeAndRemarks(mark);

        const resultData = {
          studentId: selectedStudent._id,
          examId: selectedExam._id,
          classLevel: selectedClass,
          subjectId,
          totalMarks: mark,
          grade,
          remarks,
        };

        await axios.post("http://localhost:8000/api/result/results", resultData);
      }

      toast.success("Result Submitted Successfully!");
      setSelectedClass("");
      setSelectedStudent(null);
      setSelectedExam(null);
      setSelectedSubjects([]);
      setMarks({});
      setOpenSection(null);
    } catch (err) {
      console.error("Error submitting result:", err);
      toast.error("Something went wrong during submission.");
    }
  }; 

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-green-100 text-black text-2xl font-bold p-6 text-center">
          📘 Assign Exam Results
        </div>

        {/* 1️⃣ Select Class */}
        <AccordionSection
          title="1️⃣ Select Class"
          isOpen={openSection === "class"}
          onClick={() => toggleSection("class")}
        >
          {loading ? (
            <p>Loading classes...</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {classLevels.map((cls) => (
                <button
                  key={cls._id}
                  className={`py-2 rounded text-sm font-medium ${
                    selectedClass === cls._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-blue-50"
                  }`}
                  onClick={() => {
                    setSelectedClass(cls._id);
                    setSelectedStudent(null);
                    setSelectedExam(null);
                    setSelectedSubjects([]);
                    setMarks({});
                  }}
                >
                  {cls.Class}
                </button>
              ))}
            </div>
          )}
        </AccordionSection>

        {/* 2️⃣ Select Student */}
        <AccordionSection
          title="2️⃣ Select Student"
          isOpen={openSection === "student"}
          onClick={() => toggleSection("student")}
        >
          {!selectedClass ? (
            <p className="text-red-500">Please select a class first.</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500">No students available for this class.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {students.map((student) => (
                <button
                  key={student._id}
                  className={`py-2 rounded text-sm font-medium ${
                    selectedStudent && selectedStudent._id === student._id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-green-50"
                  }`}
                  onClick={() => {
                    setSelectedStudent(student);
                    setSelectedExam(null);
                    setSelectedSubjects([]);
                    setMarks({});
                  }}
                >
                  {student.name}
                </button>
              ))}
            </div>
          )}
        </AccordionSection>

        {/* 3️⃣ Select Exam */}
        <AccordionSection
          title="3️⃣ Select Exam"
          isOpen={openSection === "exam"}
          onClick={() => toggleSection("exam")}
        >
          {!selectedStudent ? (
            <p className="text-red-500">Please select a student first.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {exams.map((exam) => (
                <button
                  key={exam._id}
                  className={`py-2 rounded text-sm font-medium ${
                    selectedExam && selectedExam._id === exam._id
                      ? "bg-blue-300 text-white"
                      : "bg-gray-100 hover:bg-yellow-100"
                  }`}
                  onClick={() => {
                    setSelectedExam(exam);
                    setSelectedSubjects([]);
                    setMarks({});
                  }}
                >
                  {exam.examName}
                </button>
              ))}
            </div>
          )}
        </AccordionSection>

        {/* 4️⃣ Assign Subject Marks */}
   <AccordionSection
          title="4️⃣ Assign Subject Marks"
          isOpen={openSection === "subjects"}
          onClick={() => toggleSection("subjects")}
        >
          {!selectedExam ? (
            <p className="text-red-500">Please select an exam first.</p>
          ) : (
            <div className="space-y-4">
              {subjects.map((subject) => {
                const mark = Number(marks[subject._id]) || 0;
                const { grade, remarks } = getGradeAndRemarks(mark);

                return (
                  <div key={subject._id} className="flex flex-col md:flex-row md:justify-between md:items-center border p-3 rounded-lg shadow-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject._id)}
                        onChange={() => toggleSubject(subject._id)}
                        className="accent-blue-gray-500 w-5 h-5"
                      />
                      <span className="font-medium">
                        {subject.subjectCode} - {subject.subjectName}
                      </span>
                    </label>

                    {selectedSubjects.includes(subject._id) && (
                      <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2 md:mt-0 w-full md:w-auto">
                        <input
                          type="number"
                          className="border-gray-300 border-2 px-3 py-1 rounded w-full md:w-28 focus:border-blue-400 focus:outline-none"
                          placeholder="Marks"
                          value={marks[subject._id] || ""}
                          onChange={(e) => setMarks({ ...marks, [subject._id]: e.target.value })}
                        />
                        {marks[subject._id] && (
                          <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-gray-700">
                            <span className="px-2 py-1 bg-green-100 rounded font-semibold">Grade: {grade}</span>
                            <span className="px-2 py-1 bg-yellow-100 rounded">Remarks: {remarks}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </AccordionSection>


        <div className="p-6 text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded"
          >
            Submit Result
          </button>
        </div>
      </div>
    </div>
  );
};

const AccordionSection = ({ title, isOpen, onClick, children }) => (
  <div className="border-t">
    <div
      className="flex justify-between items-center px-6 py-4 bg-gray-50 cursor-pointer hover:bg-gray-200"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <span className="text-xl">{isOpen ? "−" : "+"}</span>
    </div>
    {isOpen && <div className="px-6 py-4">{children}</div>}
  </div>
);

export default All_Result;
