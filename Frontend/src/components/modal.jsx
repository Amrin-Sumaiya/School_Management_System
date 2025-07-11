import React from 'react'
import Modal from "react-modal"
import {Input} from "./input.jsx"
import { Button } from "./button.jsx"


const CustomModal = ({
    isOpen,
    onClose,
    onSubmit,
    classRoom,
    onChange,
    isEditMode = false 
}) => {
 
  return (
    <Modal isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel={isEditMode ? 'Edit Classroom' : 'Add Classroom'}
    className="bg-indigo-50 p-16 max-w-md mt-40 rounded-xl shadow-lg outline-none"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">{isEditMode ? "Update Classroom" : "Add New Classroom"}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          type="text"
          name="Class"
          value={classRoom.Class}
          onChange={onChange}
          placeholder="Class Name"
        />
        <Input
          type="number"
          name="RoomNo"
          value={classRoom.RoomNo}
          onChange={onChange}
          placeholder="Room Number"
        />
        <div className="flex justify-between mt-6">
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

    </Modal>

  )
}

export default CustomModal