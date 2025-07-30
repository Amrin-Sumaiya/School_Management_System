import React, { useState } from "react";
import { FaSave } from "react-icons/fa";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Payment = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    classLevel: "",
    payment_type: "",
    month: "",
    year: "",
    amount: "",
    payment_date: new Date().toISOString().split("T")[0],
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      month:
        formData.payment_type === "Monthly Fee"
          ? `${formData.month} ${formData.year}`
          : undefined,
      payment_method: "Cash", // enforced by schema
    };
    console.log("Submitted Data:", finalData);
    // Submit to API here
  };

  const handleCancel = () => {
    setFormData({
      studentId: "",
      classLevel: "",
      payment_type: "",
      month: "",
      year: "",
      amount: "",
      payment_date: new Date().toISOString().split("T")[0],
      remarks: "",
    });
  };

  return (
    <div className="flex justify-center  px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-indigo-50 w-full max-w-2xl p-10 rounded-2xl shadow-xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-indigo-800 text-center">
          Payment Management
        </h1>

        {/* Student ID & Class Level */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Class Level Dropdown */}
  <div>
    <label className="text-lg text-gray-900">Class Level</label>
    <select
      name="classLevel"
      required
      value={formData.classLevel}
      onChange={handleChange}
      className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
    >
      <option value="">Select Class Level</option>
      <option value="6th Grade">6</option>
      <option value="7th Grade">7</option>
      <option value="8th Grade">8</option>
      <option value="9th Grade">9</option>
      <option value="10th Grade">10</option>
    </select>
  </div>

  {/* Student ID Dropdown */}
  <div>
    <label className="text-lg text-gray-900">Student ID</label>
    <select
      name="studentId"
      required
      value={formData.studentId}
      onChange={handleChange}
      className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
    >
      <option value="">Select Student</option>
      <option value="ST001">Amrin (ST001)</option>
      <option value="ST002">Rahim (ST002)</option>
      <option value="ST003">Karim (ST003)</option>
      <option value="ST004">Jannat (ST004)</option>
    </select>
  </div>
</div>

        {/* Payment Type */}
        <div>
          <label className="text-lg text-gray-900">Payment Type</label>
          <select
            name="payment_type"
            required
            value={formData.payment_type}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Payment Type</option>
            <option value="Monthly Fee">Monthly Fee</option>
            <option value="Exam Fee">Exam Fee</option>
            <option value="Picnic Fee">Picnic Fee</option>
            <option value="Admission Fee">Admission Fee</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Conditional Month & Year */}
        {formData.payment_type === "Monthly Fee" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-900">Month</label>
              <select
                name="month"
                required
                value={formData.month}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-900">Year</label>
              <input
                type="number"
                name="year"
                required
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2025"
                className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Amount */}
        <div>
          <label className="text-lg text-gray-900">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            required
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g., 1500"
            className="mt-1 w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Payment Date */}
        <div>
          <label className="text-lg text-gray-900">Payment Date</label>
          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="text-lg text-gray-900">Remarks (optional)</label>
          <textarea
            name="remarks"
            rows={3}
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Any notes or additional details"
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save and Cancel Buttons */}

        
        <div className="flex justify-end gap-4 pt-4">
        <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            <FaSave className="text-lg" />
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2 rounded-lg border  bg-red-300 border-gray-300 text-white hover:bg-gray-100 hover:text-black transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
