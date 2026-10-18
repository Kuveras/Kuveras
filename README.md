# Kuveras Fine Jewellery — MERN Stack Application

A full-stack luxury e-commerce web application built for **Kuveras Fine Jewellery**. Features a dynamic, modern React + Tailwind CSS frontend coupled with a robust Node.js, Express, and MongoDB RESTful backend.

---

## 📁 Repository Structure

```
kuverasshop-mern/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── data/
│   │   └── types/
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## ✨ Features

- **Luxury User Interface**: Custom responsive hero sections, product tabs, interactive modals (Auth, Store Locator, Inquiry), and fluid animations.
- **Product Management API**: Express & MongoDB REST endpoints for fetching products, filtering by category, and viewing detailed product specifications (metal, purity, weight, price, rating).
- **Order Management API**: Submit purchase orders and track status (Pending, Processing, Completed).
- **Architecture**: Separated Frontend (Vite + React) and Backend (Express + Mongoose MVC architecture) with API proxying.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, TypeScript
- **Backend**: Node.js, Express.js, MongoDB (Mongoose ORM), CORS, Dotenv
- **Deployment**: Configured for static serving or standalone server hosting

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB connection URI (Local or MongoDB Atlas)

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and fill in your MongoDB URI
cp .env.example .env

# Run backend server in development mode
npm run dev
```

The backend server will run on `http://localhost:5000`.

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run frontend development server
npm run dev
```

The React frontend will run on `http://localhost:5173`.

---

## 🔌 API Endpoints

### Health Check
- `GET /api/health` — Check server status

### Products
- `GET /api/products` — Fetch all products (optional query param: `?category=Rings`)
- `GET /api/products/:id` — Get product by ID
- `POST /api/products` — Create a new product

### Orders
- `GET /api/orders` — Fetch all orders
- `POST /api/orders` — Submit a new order

---

## 📄 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🤝 Contributing & Repository

Repository: [Sjoshi10262/kuverasshop-mern](https://github.com/Sjoshi10262/kuverasshop-mern.git)
