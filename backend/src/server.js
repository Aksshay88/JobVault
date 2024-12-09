const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

// CORS configuration: Allow requests from the frontend (localhost:3000)
const corsOptions = {
  origin: "*", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type"], // Allowed headers
};

app.use(cors(corsOptions)); // Use the CORS middleware with configuration
app.use(express.json());

// Define the POST route for adding an employee
app.post("/api/employees", async (req, res) => {
  const { employeeId, name, email, phone, department, dateOfJoining, role } =
    req.body;

  // Validate that all required fields are present
  if (
    !employeeId ||
    !name ||
    !email ||
    !phone ||
    !department ||
    !dateOfJoining ||
    !role
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Ensure dateOfJoining is a valid Date object
    const parsedDateOfJoining = new Date(dateOfJoining);
    if (isNaN(parsedDateOfJoining.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format for dateOfJoining" });
    }

    // Create a new employee in the database
    const employee = await prisma.employee.create({
      data: {
        employeeId,
        name,
        email,
        phone,
        department,
        dateOfJoining: parsedDateOfJoining,
        role,
      },
    });

    // Return a successful response with the employee data
    return res.status(201).json(employee);
  } catch (error) {
    // Handle Prisma specific errors
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Employee ID or Email already exists" });
    }

    // Log any other unexpected errors
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Error adding employee" });
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
