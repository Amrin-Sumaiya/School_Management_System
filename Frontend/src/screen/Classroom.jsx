import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Card, CardContent } from "../components/card.jsx";
import { Button } from "../components/button.jsx";
import { toast } from 'react-toastify';
import axios from "axios";
import CustomModal from "../components/modal.jsx";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ClassManager = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editClassId, setIsEditClassId] = useState(null);

  const [classRoom, setClassRoom] = useState({
    Class: "",
    RoomNo: ""
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setClassRoom({ ...classRoom, [name]: value });
  };

  const fetchClassRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/class/all_classInfo");
      setClassrooms(response.data);
    } catch (error) {
      console.error("Error while fetching data ", error);
    }
  };

  const resetFormAndModal = () => {
    setClassRoom({ Class: "", RoomNo: "" });
    setModalIsOpen(false);
    setIsEditMode(false);
    setIsEditClassId(null);
  };

  const SubmitClassInfo = async (e) => {
    e.preventDefault();

    const trimmedClass = classRoom.Class.trim();
    const trimmedRoomNo = classRoom.RoomNo.toString().trim();

    if (!trimmedClass || !trimmedRoomNo){
      toast.error("Please fill in both Class and Room Number .");
      return;
    }

    const isDuplicate = classrooms.some(c => {
      const isSameClass = c.Class.trim().toLowerCase() === trimmedClass.toLocaleLowerCase();
      const isSameRoom = c.RoomNo.toString().trim() === trimmedRoomNo;

      if (isEditMode && c._id === editClassId) return false;

      return (
        (isSameClass && isSameRoom) || 
        (isSameClass || isSameRoom)
      )
    });

    if (isDuplicate){
      toast.error("Duplicate entry: This Class or Room is already assigned. ")
      return;
    }



    try {
      if (isEditMode && editClassId) {
        await axios.put(`http://localhost:8000/api/class/update/class_info/${editClassId}`, classRoom);
        toast.success("Classroom updated successfully");
         
      } else {
        await axios.post("http://localhost:8000/api/class/class_Info", classRoom);
        toast.success("ClassRoom added successfully");
      }

     
      resetFormAndModal(); //reset the model after fetching the data
      await fetchClassRooms();

    } catch (error) {    
      console.log(error);
      toast.error("Error submitting classroom info");
    }
  };

  const OpenEditModal = (classroom) => {
    setIsEditMode(true);
    setIsEditClassId(classroom._id);
    setClassRoom({
      Class: classroom.Class,
      RoomNo: classroom.RoomNo
    });
    setModalIsOpen(true);
  };

  const handleOnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/class/delete/class_info/${id}`);
      toast.success("Classroom deleted successfully");
      fetchClassRooms();
    } catch (error) {
      toast.error("Error deleting classroom");
      console.log("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchClassRooms();
  }, []);

  return (
    <Card className="bg-indigo-50 p-6 max-w-5xl mx-auto mt-10">
      <CardContent>
        <h2 className="text-3xl text-center font-bold mb-4">Assign Classroom Directory</h2>

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
          isEditMode={isEditMode}
        />

        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-400">ClassName</th>
              <th className="p-2 border border-gray-400">Room No</th>
              <th className="p-2 border border-gray-400">Update</th>
              <th className="p-2 border border-gray-400">Delete</th>
            </tr>
          </thead>
          <tbody>
            {classrooms.map((classroom, index) => (
              <tr key={classroom._id || index} className="border-t">
                <td className="p-2 border border-gray-400">{classroom.Class}</td>
                <td className="p-2 border border-gray-400">{classroom.RoomNo}</td>
                <td className="p-2 border border-gray-400">
                  <Button onClick={() => OpenEditModal(classroom)}>
                    <FaEdit className="text-blue-700" />
                  </Button>
                </td>
                <td className="p-2 border border-gray-400">
                  <Button onClick={() => handleOnDelete(classroom._id)}>
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
