import React, { useState, useEffect } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/contact/getAllMessage');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
    }
  };
 
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/contact/deleteMessage/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete message');
      setMessages(messages.filter((msg) => msg._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-darkGray-200 pt-24 px-4">
      <h1 className="text-3xl font-bold mb-8 text-lightBlue-600 text-center">
        List of Contact Messages
      </h1>

      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-lg">
        {error && (
          <div className="text-red-600 font-semibold px-6 py-4">{error}</div>
        )}

        <table className="w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-lightBlue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Full Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Message</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 break-words">{msg.fullName}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 break-words">{msg.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 break-words">{msg.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="bg-red-500 mt-2 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none transition duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessages;
