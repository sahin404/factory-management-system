# Factory Management System

## Project Overview

The Factory Management System is a comprehensive, role-based solution designed to streamline and automate core factory operations. It provides dedicated modules for managing employee attendance, production inventory, sales records, and financial transactions (salaries and expenses).

The architecture enforces strict **Role-Based Access Control**, ensuring that only authorized personnel (**Admin, Manager, Accountant**) can perform specific actions, while general employees maintain limited profile access.

### Key Features

* **Role-Based Authentication:** Secure login and access control for all four defined user roles.
* **Attendance Tracking:** Management of daily employee attendance (Present, Absent, Leave) with date tracking.
* **Production & Inventory:** Management of product stock, pricing, and new product creation.
* **Financial Management:** Dedicated modules for logging expenses and processing employee salaries.
* **Sales Tracking:** Recording and reporting of sales linked directly to product inventory.

---

## Project Links

| Type | Link |
| :--- | :--- |
| **Live Demonstration** | [Watch Demo Video](https://www.youtube.com/watch?v=dQw4w9WgXcQ) |
| **Detailed Requirements** | [Functional Requirements Document](https://docs.google.com/document/d/1SSkYHOlTGhLmE5sCAMOAN-nuqd0IuU1FkTonvQ0SfmA/edit?tab=t.0) |
| **Source Code Repository** | [GitHub Repository](https://github.com/sahin404/factory-management-system) |

---

## Technical Stack

The Factory Management System is built using a modern, scalable **MERN** stack variation, ensuring high performance and developer efficiency.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React.js, Next.js, TypeScript** | Modern component-based architecture for a robust and scalable UI. |
| **State Management** | **Zustand** | Lightweight and fast state management solution. |
| **Backend** | **Node.js / Express.js** | High-performance, unopinionated server framework. |
| **Database** | **MongoDB (Mongoose)** | Flexible, document-based data storage via Mongoose ODM. |
| **Authentication** | **JWT (JSON Web Tokens)** | Secure, stateless authentication and authorization. |

---

## Installation and Setup

This repository contains two main directories: `backend` (API server) and `frontend` (Next.js application). Follow these steps to set up the project locally.

### Prerequisites

You must have the following software installed on your machine:

* Node.js (v18.x or higher)
* npm (Node Package Manager)

### 1. Backend Setup (API Server)

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/sahin404/factory-management-system
    ```

2.  **Configure Environment Variables**

    Navigate to the `backend` directory and create a file named **`.env`** inside this folder. Add the following configuration:

    ```env
    PORT=3000
    DB=mongodb+srv://user1:user1@cluster0.1cwlcmy.mongodb.net/?appName=Cluster0
    SECRET_KEY=supersecurekey
    NODE_ENV=development
    ```

3.  **Run the Backend**
    ```bash
    cd backend
    npm install
    npm run dev
    ```
    The API server will be running at `http://localhost:3000`.

### 2. Frontend Setup (Client Application)

1.  **Run the Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend application will typically run on a separate port (e.g., `http://localhost:3001`).

---

## API Endpoints Reference

The backend implements protected routes using `verifyToken` (JWT Authentication) and `verifyRoles` (Role-Based Authorization), ensuring security and adherence to the defined requirements.

### Authentication & Users (`/api/auth`, `/api/employee`)

| Module | Method | Endpoint | Access Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/signup` | Admin/Manager for new account creation) | Register a new user. |
| **Auth** | `POST` | `/api/auth/login` | Public | Authenticate and receive JWT. |
| **Auth** | `GET` | `/api/auth/me` | All (Authenticated) | Get current user's details. |
| **Auth** | `POST` | `/api/auth/logout` | All (Authenticated) | Log out the user. |
| **Employee**| `GET` | `/api/employee` | Admin, Manager | Get all employees. |
| **Employee**| `GET` | `/api/employee/:id` | Admin, Manager | Get single employee by ID. |
| **Employee**| `PUT` | `/api/employee/:id` | Admin, Manager | Update employee details. |
| **Employee**| `DELETE` | `/api/employee/:id` | Admin, Manager | Delete an employee record. |

### Attendance (`/api/attendance`)

| Module | Method | Endpoint | Access Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Attendance**| `GET` | `/api/attendance` | Admin, Manager | Get list of attendance records. |
| **Attendance**| `POST` | `/api/attendance/update` | Admin, Manager | Update employee attendance status. |

### Production & Sales (`/api/product`, `/api/sales`)

| Module | Method | Endpoint | Access Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Production**| `POST` | `/api/product` | Admin, Manager | Add a new product. |
| **Production**| `GET` | `/api/product` | Admin, Manager | Get all products (with search/pagination). |
| **Production**| `GET` | `/api/product/:id` | Admin, Manager | Get single product by ID. |
| **Production**| `PATCH` | `/api/product/:id` | Admin, Manager | Update product quantity/stock. |
| **Production**| `PUT` | `/api/product/:id` | Admin, Manager | Update all product fields (price, details). |
| **Production**| `DELETE` | `/api/product/:id` | Admin, Manager | Delete a product. |
| **Sales** | `POST` | `/api/sales/add` | Admin, Manager | Record a new sales transaction. |
| **Sales** | `GET` | `/api/sales` | Admin, Manager | View all sales records (with reports). |
| **Sales** | `DELETE` | `/api/sales/:id` | Admin, Manager | Delete a sales record. |

### Financials (`/api/expense`, `/api/salary`)

| Module | Method | Endpoint | Access Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Expense** | `POST` | `/api/expense` | Admin, Accountant | Add a new expense entry. |
| **Expense** | `GET` | `/api/expense` | Admin, Accountant | Get all expenses (with filtering/sorting). |
| **Expense** | `DELETE` | `/api/expense/:id` | Admin, Accountant | Delete an expense entry. |
| **Salary** | `POST` | `/api/salary` | Admin, Accountant | Set employee salary as paid/unpaid. |
| **Salary** | `GET` | `/api/salary` | Admin, Accountant | Get salary processing list. |

### Overview & Reporting (`/api/overview`)

| Module | Method | Endpoint | Access Roles | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Overview** | `GET` | `/api/overview/totalEmployees` | All (Authenticated) | Get total number of employees. |
| **Overview** | `GET` | `/api/overview/totalPresentEmployees/:date` | All (Authenticated) | Get total employees present on a specific date. |
| **Overview** | `GET` | `/api/overview/salaryStatus/:month` | All (Authenticated) | Get salary payment status for a given month. |
| **Overview** | `GET` | `/api/overview/productsStock` | All (Authenticated) | Get a summary of product stock levels. |
| **Overview** | `GET` | `/api/overview/getSales` | All (Authenticated) | Get summary sales data. |
| **Overview** | `GET` | `/api/overview/expenses` | All (Authenticated) | Get summary expense data. |

---

## Screenshots

The following are visual glimpses of the application's key screens.

### 1. Login Screen
![Login Page](https://github.com/sahin404/factory-management-system/blob/main/frontend/public/sample0.png?raw=true)

### 2. Admin Dashboard
![Admin Dashboard](https://github.com/sahin404/factory-management-system/blob/main/frontend/public/sample1.png?raw=true)

---

> **Note:** The images above provide a brief glimpse of the **Login Screen** and the **Admin Dashboard** overview. To see the live functionalities of the **Attendance Module**, **Production & Sales** flow, and other detailed views, please watch the full demonstration video: [Watch Demo Video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

---

## Contact and Author

This project was developed by:

| Detail | Information |
| :--- | :--- |
| **Author** | Md Sahin Alam |
| **Email** | sahinraj20@gmail.com |
| **LinkedIn** | [Connect on LinkedIn](https://www.linkedin.com/in/sahin404/) |
