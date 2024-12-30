import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

function Dashboard() {
  const [hotelRooms, setHotelRooms] = useState([
    { id: 1, roomType: "Deluxe", status: "Available" },
    { id: 2, roomType: "Standard", status: "Occupied" },
    // More initial data here if needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({ roomType: "", status: "" });

  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleCreateRoom = () => {
    const newRoomData = { ...newRoom, id: hotelRooms.length + 1 };
    setHotelRooms([...hotelRooms, newRoomData]);
    setNewRoom({ roomType: "", status: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="p-5">
      {/* Metric Boxes */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="p-5 bg-gray-100 text-center rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Hotels Rooms</h3>
          <p className="text-2xl mt-2">{hotelRooms.length}</p>
        </div>
        <div className="p-5 bg-gray-100 text-center rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Bookings</h3>
          <p className="text-2xl mt-2">200</p>
        </div>
        <div className="p-5 bg-gray-100 text-center rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">All Pages</h3>
          <p className="text-2xl mt-2">50</p>
        </div>
        <div className="p-5 bg-gray-100 text-center rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Other</h3>
          <p className="text-2xl mt-2">Placeholder</p>
        </div>
      </div>

      {/* Create New Room Button */}
      <div className="flex justify-end mb-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add New Hotel Room
        </button>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* All Rooms Table */}
        <div>
          <h3 className="text-lg font-semibold mb-3">All Hotel Rooms</h3>
          <table className="table-auto w-full text-left border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Room ID</th>
                <th className="px-4 py-2 border border-gray-300">Room Type</th>
                <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotelRooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-4 py-2 border border-gray-300">{room.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{room.roomType}</td>
                  <td className="px-4 py-2 border border-gray-300">{room.status}</td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <button className="text-blue-500 mx-1">
                      <FaEye />
                    </button>
                    <button className="text-green-500 mx-1">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 mx-1">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding New Room */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-50 justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[700px]">
            <h2 className="text-xl font-bold mb-4">Add New Hotel Room</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="roomType"
                placeholder="Room Type"
                value={newRoom.roomType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="status"
                placeholder="Room Status"
                value={newRoom.status}
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
                onClick={handleCreateRoom}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
