const express = require("express");
const httpStatus = require("http-status-codes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data (replace with your actual data)
const teacherData = [
  { id: 1, title: "Mr.", author: "Smith" },
  { id: 2, title: "Ms.", author: "Johnson" },
  // Add more data as needed
];

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/teacher", (req, res) => {
  res.status(httpStatus.OK).json(teacherData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
