function addAttendance() {
  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const semester = document.getElementById("semester").value;
  const status = document.getElementById("status").value;


  

  if (name === "" || roll === "") {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  const date = new Date().toLocaleDateString();

  const table = document.getElementById("attendanceTable");
  const row = table.insertRow();

  row.insertCell(0).innerText = name;
  row.insertCell(1).innerText = roll;
  row.insertCell(2).innerText = semester;
  row.insertCell(3).innerText = status;
  row.insertCell(4).innerText = date;

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("roll").value = "";
  document.getElementById("semester").selectedIndex = 0;
  document.querySelector('input[name="status"][value="Present"]').checked = true;
}

// ✅ Download Attendance as PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("College Attendance Report", 14, 20);

  const dateTime = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Generated on: ${dateTime}`, 14, 28);

  doc.autoTable({
    startY: 35,
    html: "#attendanceTableWrapper",
    theme: "striped",
    headStyles: { fillColor: [91, 134, 229] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    styles: { cellPadding: 3, fontSize: 11 },
  });

  doc.save("attendance_report.pdf");
}
// Clear all attendance records
function clearAttendance() {
  const table = document.getElementById("attendanceTable");
  if (table.rows.length === 0) {
    alert("⚠️ No records to clear!");
    return;
  }

  if (confirm("Are you sure you want to clear all attendance records?")) {
    table.innerHTML = "";
  }
}

function setStatus(value) {
  // update hidden input
  document.getElementById("status").value = value;

  // remove active class from both
  document.querySelectorAll(".status-btn").forEach(btn => btn.classList.remove("active"));

  // add active class to clicked one
  if (value === "Present") {
    document.querySelector(".status-btn.present").classList.add("active");
  } else {
    document.querySelector(".status-btn.absent").classList.add("active");
  }
}

//Pressing Enter inside Name moves cursor
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("#name, #roll, #semester, .status-btn");

  inputs.forEach((input, index) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();

        // Focus next input/button
        const next = inputs[index + 1];
        if (next) {
          next.focus();
        } else {
          // if last element, trigger Add Attendance
          addAttendance();
        }
      }
    });
  });
});


