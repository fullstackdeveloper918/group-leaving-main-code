"use client"; 

export default function NotificationsTable() {
  const notifications = [
    { id: 1, title: "New Message", message: "You received a new message from John", date: "2025-11-03" },
    { id: 2, title: "Payment Received", message: "Your payment has been confirmed", date: "2025-11-02" },
    { id: 3, title: "System Update", message: "Server maintenance scheduled for tonight", date: "2025-11-01" },
    { id: 4, title: "System Update", message: "Server maintenance scheduled for tonight", date: "2025-11-01" },
  ];

  return (
    <div className="overflow-x-auto mt-8 min-h-[50vh] px-4">
      <table className="min-w-full  border border-gray-200 text-left text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="px-4 py-2 border-b">#</th>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Message</th>
            <th className="px-4 py-2 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((n) => (
            <tr key={n.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 border-b">{n.id}</td>
              <td className="px-4 py-2 border-b font-medium">{n.title}</td>
              <td className="px-4 py-2 border-b">{n.message}</td>
              <td className="px-4 py-2 border-b text-gray-500">{n.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
