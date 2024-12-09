import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    const response = NextResponse.json(employees);

    // Add CORS headers to the response
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3000",
    ); // Replace with your frontend's domain
    response.headers.set("Access-Control-Allow-Methods", "GET, POST");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { employeeId, name, email, phone, department, dateOfJoining, role } =
    body;

  if (
    !employeeId ||
    !name ||
    !email ||
    !phone ||
    !department ||
    !dateOfJoining ||
    !role
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  try {
    const newEmployee = await prisma.employee.create({
      data: {
        employeeId,
        name,
        email,
        phone,
        department,
        dateOfJoining: new Date(dateOfJoining),
        role,
      },
    });

    const response = NextResponse.json(newEmployee, { status: 201 });

    // Add CORS headers to the response
    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3000/",
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    // Replace with your frontend's domain
    response.headers.set("Access-Control-Allow-Methods", "GET, POST");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Employee ID or Email already exists" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to add employee" },
      { status: 500 },
    );
  }
}
