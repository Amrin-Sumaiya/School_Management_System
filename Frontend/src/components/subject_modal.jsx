// components/SubjectModal.jsx
import React from 'react';
import Modal from 'react-modal';
import { Input } from './input.jsx';
import { Button } from './button.jsx';

const SubjectModal = ({
  isOpen,
  onClose,
  onSubmit,
  subject,
  onChange,
  isEditMode = false
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={isEditMode ? 'Edit Subject' : 'Add Subject'}
      className="bg-white p-8 rounded-xl max-w-md mx-auto mt-20 shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">{isEditMode ? 'Update Subject' : 'Add New Subject'}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          type="text"
          name="subjectCode"
          value={subject.subjectCode}
          onChange={onChange}
          placeholder="Subject Code"
        />
        <Input
          type="text"
          name="subjectName"
          value={subject.subjectName}
          onChange={onChange}
          placeholder="Subject Name"
        />
        <Input
          type="text"
          name="description"
          value={subject.description}
          onChange={onChange}
          placeholder="Description"
        />
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {isEditMode ? 'Update' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SubjectModal;
