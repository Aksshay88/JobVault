"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Define the POST route for adding an employee
app.post("/api/employees", async (req, res) => {
    const { employeeId, name, email, phone, department, dateOfJoining, role } = req.body;
    try {
        // Create a new employee in the database
        const employee = await prisma.employee.create({
            data: {
                employeeId,
                name,
                email,
                phone,
                department,
                dateOfJoining,
                role,
            },
        });
        // Return a successful response with the employee data
        res.status(201).json(employee);
    }
    catch (error) {
        // Handle errors
        res.status(500).json({ error: "Error adding employee" });
    }
});
// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
