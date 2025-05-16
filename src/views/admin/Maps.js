import React, { useState, useEffect } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchMessages();
  }, []);

  return (
<div className="min-h-screen bg-darkGray-200 pt-24 px-8">
      <h1 className="text-2xl font-bold mb-8 text-lightBlue-600"> List of  Contact Messages</h1>

      <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
        {error && (
          <div className="text-red-600 font-semibold px-6 py-4">{error}</div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{msg.fullName}</td>
                    <td className="px-6 py-4 text-sm text-blue-600">{msg.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{msg.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No messages found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
