import React from 'react';
import Modal from "react-modal";
import { Input } from "./input.jsx";
import { Button } from "./button.jsx";

const CustomModal = ({
  isOpen,
  onClose,
  onSubmit,
  classRoom,
  onChange,
  handleSubjectSelection,
  subjects = [],
  isEditMode = false,
  errors = {},
}) => {
  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  contentLabel={isEditMode ? 'Edit Classroom' : 'Add Classroom'}
  className="outline-none"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
>
  <div className="bg-indigo-50 mt-40 p-20 w-[500px] rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-purple-900 text-center">
      {isEditMode ? "Update Classroom" : "Add New Classroom"}
    </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="Class"
            value={classRoom.Class}
            onChange={onChange}
            placeholder="Class Name"
          />
          {errors.Class && (
            <p className="text-red-600 text-sm mt-1">{errors.Class}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            name="RoomNo"
            value={classRoom.RoomNo}
            onChange={onChange}
            placeholder="Room Number"
          />
          {errors.RoomNo && (
            <p className="text-red-600 text-sm mt-1">{errors.RoomNo}</p>
          )}
        </div>
        <label className="block font-semibold mb-2">Subjects</label>
        <select
          multiple
          value={classRoom.ClassRoomSubjectPlan}
          onChange={handleSubjectSelection}
          className="border border-gray-400 rounded-md p-2 w-full h-32"
        >
          {subjects.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.subjectName}
            </option>
          ))}
        </select>
        {errors.ClassRoomSubjectPlan && (
          <p className="text-red-600 text-sm mt-1">{errors.ClassRoomSubjectPlan}</p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditMode ? "Update" : "Save"}
          </Button>
        </div>
      </form>
      </div>
    </Modal>
  );
};

export default CustomModal;
