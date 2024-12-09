import "./globals.css";

export const metadata = {
  title: "Employee Management System",
  description: "A simple full-stack Employee Management application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
