import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const column_title = ['ID', 'Name', 'Age', 'Sex', 'Experience', 'Department', 'Email', 'Update', 'Delete'];

const All_Teachers = () => {
    return (
        <div className="p-4">
            <h2 className="text-3xl text-center font-semibold mb-4">All Teachers Info</h2>
            <table className="w-full border-collapse border-gray-800">
                <thead>
                    <tr className="bg-gray-300">
                        {column_title.map((item, index) => (
                            <th key={index} className="border p-4">{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Data will be inserted here when fetched from backend */}
                </tbody>
            </table>
        </div>
    );
};

export default All_Teachers;
