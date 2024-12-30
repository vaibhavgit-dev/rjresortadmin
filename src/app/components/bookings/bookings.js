"use client";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community"; // Import the required module
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme-specific grid CSS
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Register the required modules
const modules = [ClientSideRowModelModule];

function Bookings() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { headerName: "Booking ID", field: "bookingId", sortable: true, filter: true },
    { headerName: "Guest Name", field: "guestName", sortable: true, filter: true },
    { headerName: "Room Type", field: "roomType", sortable: true, filter: true },
    { headerName: "Check-in Date", field: "checkInDate", sortable: true, filter: true },
    { headerName: "Check-out Date", field: "checkOutDate", sortable: true, filter: true },
    { headerName: "Status", field: "status", sortable: true, filter: true },
    {
      headerName: "Action",
      cellRendererFramework: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Edit booking for ${params.data.guestName}`)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => alert(`Delete booking for ${params.data.guestName}`)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState({
    bookingId: "",
    guestName: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
    status: "",
  });

  const [gridOptions] = useState({
    pagination: true,
    paginationPageSize: 10,
    domLayout: "autoHeight", // Ensures the grid adjusts height dynamically
  });

  useEffect(() => {
    // Fetch hotel booking data (replace with your own API)
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((item, index) => ({
          bookingId: index + 1,
          guestName: `Guest ${index + 1}`,
          roomType: "Single",
          checkInDate: "2024-12-30",
          checkOutDate: "2025-01-02",
          status: "Confirmed",
        }));
        setRowData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    setRowData((prevData) => [...prevData, newData]);
    setNewData({
      bookingId: "",
      guestName: "",
      roomType: "",
      checkInDate: "",
      checkOutDate: "",
      status: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Hotel Bookings</h1>
      <div className="w-full flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Create New Booking
        </button>
      </div>
      <div
        className="ag-theme-alpine rounded-lg shadow-lg border border-gray-300"
        style={{ height: 600, width: "100%" }}
      >
        <AgGridReact
          modules={modules} // Add the modules prop
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true} // Enable pagination
          paginationPageSize={5} // Set page size
          animateRows={true}
          gridOptions={gridOptions}
          domLayout="autoHeight"
        />
      </div>

      {/* Modal for Create New Booking */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-50 justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[700px]">
            <h2 className="text-xl font-bold mb-4">Create New Booking</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="bookingId"
                placeholder="Booking ID"
                value={newData.bookingId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="guestName"
                placeholder="Guest Name"
                value={newData.guestName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="roomType"
                placeholder="Room Type"
                value={newData.roomType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="checkInDate"
                placeholder="Check-in Date"
                value={newData.checkInDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="checkOutDate"
                placeholder="Check-out Date"
                value={newData.checkOutDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={newData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </form>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
