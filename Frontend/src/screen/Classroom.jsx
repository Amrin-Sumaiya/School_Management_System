import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Card, CardContent } from "../components/card.jsx";
import { Button } from "../components/button.jsx";
import axios from "axios";
import CustomModal from "../components/modal.jsx";
import Modal from "react-modal";
import { baseUrl } from "../common/baseUrl.jsx";
import { ToastContainer, toast} from "react-toastify"
import "react-toastify/ReactToastify.css";

Modal.setAppElement("#root");

const ClassManager = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editClassId, setEditClassId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});

  const [classRoom, setClassRoom] = useState({
    Class: "",
    RoomNo: "",
    ClassRoomSubjectPlan: [],
  });

  // Input Handlers
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setClassRoom({ ...classRoom, [name]: value });
  };

  const handleSubjectSelection = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setClassRoom({ ...classRoom, ClassRoomSubjectPlan: selectedValues });
  };

  // Fetch Data
  const fetchClassRooms = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/class/all_classInfo`);
      setClassrooms(response.data);
      console.log("Fetched classrooms:", response.data);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/subject/all_subjects`);
      console.log("Fetched subjects:", response.data);
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  

  useEffect(() => {
    fetchClassRooms();
    fetchSubjects();
  }, []);

  // Reset Form
  const resetFormAndModal = () => {
    setClassRoom({ Class: "", RoomNo: "", ClassRoomSubjectPlan: [] });
    setModalIsOpen(false);
    setIsEditMode(false);
    setEditClassId(null);
    setErrors({});
  };

  // Submit Handler
  const SubmitClassInfo = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!classRoom.Class.trim()) newErrors.Class = "Class name is required";
    if (!classRoom.RoomNo.trim()) newErrors.RoomNo = "Room number is required";

    const isDuplicate = classrooms.some(
      (c) =>
        c.Class.trim().toLowerCase() === classRoom.Class.trim().toLowerCase() ||
        c.RoomNo.trim() === classRoom.RoomNo.trim()
    );

    if (isDuplicate && !isEditMode)
      newErrors.Class = "This class name or room number already exists";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (isEditMode && editClassId) {
        await axios.put(`${baseUrl}/api/class/update/class_info/${editClassId}`, classRoom);
        toast.success("Classroom updated successfully!");
      } else {
        await axios.post(`${baseUrl}/api/class/class_Info`, classRoom);
        toast.success("Classroom created successfully!");
      }

      resetFormAndModal();
      fetchClassRooms();
    } catch (error) {
      // console.error("Error submitting classroom info", error);
      if (isEditMode) {
        toast.error("Classroom failed to update or duplicate exists! ");
      } else {
        toast.error("Failed to submit new classroom!")
      }
      console.error("Error submitting classroom info", error);
    }
  };

  const OpenEditModal = (classroom) => {
    setIsEditMode(true);
    setEditClassId(classroom._id);
    setClassRoom({
      Class: classroom.Class,
      RoomNo: classroom.RoomNo,
      ClassRoomSubjectPlan: classroom.ClassRoomSubjectPlan?.map((s) => s._id) || [],
    });
    setModalIsOpen(true);
  };

  const handleOnDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/class/delete/class_info/${id}`);
      toast.success("Classroom deleted successfully!");
      fetchClassRooms();
    } catch (error) {
      toast.error("Failed to delete classroom!");
      console.error("Delete failed", error);
    }
  };

  return (
    <Card className="bg-indigo-50 p-6 max-w-5xl mx-auto mt-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <CardContent>
        <h2 className="text-3xl text-center font-bold mb-4">
          Assign Classroom Directory
        </h2>

        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setModalIsOpen(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transition"
          >
            + Add Class
          </Button>
        </div>

        <CustomModal
          isOpen={modalIsOpen}
          onClose={resetFormAndModal}
          onSubmit={SubmitClassInfo}
          classRoom={classRoom}
          onChange={inputHandler}
          handleSubjectSelection={handleSubjectSelection}
          subjects={subjects}
          isEditMode={isEditMode}
          errors={errors}
        />

        <table className="w-full text-left border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-400">Class Name</th>
              <th className="p-2 border border-gray-400">Room No</th>
              <th className="p-2 border border-gray-400">ClassWise Subject Plan</th>
              <th className="p-2 border border-gray-400">Update</th>
              <th className="p-2 border border-gray-400">Delete</th>
            </tr>
          </thead>
          <tbody>
            {classrooms.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-2 border border-gray-400">{c.Class}</td>
                <td className="p-2 border border-gray-400">{c.RoomNo}</td>
                <td className="p-2 border border-gray-400">
                  {c.ClassRoomSubjectPlan?.length > 0
                    ? c.ClassRoomSubjectPlan.map((s) => s.subjectName).join(", ")
                    : "No Subjects Assigned"}
                </td>
                <td className="p-2 border border-gray-400 text-center">
                  <Button onClick={() => OpenEditModal(c)}>
                    <FaEdit className="text-blue-700" />
                  </Button>
                </td>

                
                <td className="p-2 border border-gray-400 text-center">
                  <Button onClick={() => handleOnDelete(c._id)}>
                    <FaTrash className="text-red-700" />
                  </Button>
                </td>
              </tr>

              
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default ClassManager;