import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@mui/material";
import * as ExcelJS from "exceljs";
import './App.css';

// إعداد الشارت
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Number of Events",
        data: [5, 8, 3, 7, 6, 10, 4, 2, 5, 8, 3, 6],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Events Overview",
      },
    },
  };

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Monthly Events");

    worksheet.addRow(["Month", "Number of Events"]);
    data.labels.forEach((label, index) => {
      worksheet.addRow([label, data.datasets[0].data[index]]);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "monthly_events_data.xlsx";
      link.click();
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Event Dashboard</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      <Button onClick={exportToExcel} variant="contained" color="primary" className="export-btn">
        Export to Excel
      </Button>
    </div>
  );
};

interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  organizer?: string;  // قد تحتاج هذه القيمة لتحديد إذا كانت موجودة أم لا
  description?: string;  // إضافة وصف الحدث إذا كان موجودًا
}

// قائمة الأحداث المعلقة
const events: Event[] = [
  { id: "00001", name: "Event1", location: "School Name1", date: "DD/MM/YY" },
  { id: "00002", name: "Event2", location: "School Name2", date: "DD/MM/YY" },
  { id: "00003", name: "Event3", location: "School Name3", date: "DD/MM/YY" },
  { id: "00004", name: "Event4", location: "School Name4", date: "DD/MM/YY" },
];

// مكون عرض تفاصيل الأحداث المعلقة
const PendingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleShowDetails = (selectedEventData: Event) => {
    setSelectedEvent(selectedEventData);  // تخزين الحدث المحدد في الحالة
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);  // إغلاق تفاصيل الحدث
  };

  return (
    <div className="pending-events">
      <h2>Pending Events</h2>
      <div className="events-table">
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Show Details</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>
                  <button onClick={() => handleShowDetails(event)}>Show Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEvent && (
        <div className="event-details">
          <button className="close-btn" onClick={handleCloseDetails}>
            X
          </button>
          <div className="details-container">
            <img
              src="https://via.placeholder.com/150"
              alt="Event"
              className="event-photo"
            />
            <h3>{selectedEvent.name}</h3>
            <p><strong>Time:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
            <h4>About</h4>
            <p>{selectedEvent.description}</p>
            <form className="response-form">
              <label>
                Response:
                <select>
                  <option value="">Select an Item</option>
                  <option value="approve">Approve</option>
                  <option value="reject">Reject</option>
                </select>
              </label>
              <label>
                Event Type:
                <select>
                  <option value="">Select Type</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="competition">Competition</option>
                </select>
              </label>
              <label>
                Add Comment:
                <textarea placeholder="Add your comment here"></textarea>
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app-container">
     <div className="sidebar">
  <ul>
    <li>
      <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
    </li>
    <li>
      <button onClick={() => setActivePage("pendingEvents")}>Pending Events</button>
    </li>
  </ul>
</div>

      <div className="main-content">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "pendingEvents" && <PendingEvents />}
      </div>
    </div>
  );
};

export default App;


