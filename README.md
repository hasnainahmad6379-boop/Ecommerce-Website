# E-Commerce Website

A full-stack e-commerce website built using React, Node.js, Express.js, and MongoDB. The project includes a customer-facing frontend, an admin panel for managing products, and a backend API connected to MongoDB Atlas.

## Features

### User Features

- User registration and login
- Product browsing by category
- Men, Women, and Kids categories
- Popular products section
- New Collections section
- Product details page
- Related products
- Shopping cart functionality
- Add products to cart
- Update cart quantities
- Remove products from cart
- Cart item count
- Product pricing with old and current prices
- Responsive user interface

### Admin Panel

The project includes a separate admin panel for managing the store.

- Admin dashboard
- Add new products
- View product list
- Manage products
- Product categories
- Product images and pricing
- Product data connected to the backend

### Backend

The backend is built with Node.js and Express.js.

- REST API
- User authentication
- User registration and login
- Product management
- Cart data management
- MongoDB database integration
- MongoDB Atlas support
- Environment variables for sensitive configuration
- ES Modules using `"type": "module"`

## Technologies Used

### Frontend

- React
- Vite
- React Router
- CSS
- JavaScript

### Admin Panel

- React
- Vite
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

### Database

- MongoDB Atlas

## Project Structure

```text
ecommerce-website/
│
├── admin/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── .gitignore
└── README.md
```

## Environment Variables

The backend uses an environment variable for the MongoDB connection.

Create a `.env` file inside the `backend` folder:

```env
MONGO_URL=your_mongodb_connection_string
```

The actual `.env` file is not included in the repository for security reasons.

A `.env.example` file is provided so that the required environment variable can be easily identified.

## Installation

Clone the repository and enter the project directory:

```bash
git clone YOUR_REPOSITORY_URL
cd ecommerce-website
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Admin Panel

Open another terminal:

```bash
cd admin
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd backend
npm install
npm start
```

Make sure the backend `.env` file contains your MongoDB Atlas connection string before starting the server.

## Database

The application uses MongoDB with Mongoose for database operations.

MongoDB Atlas is used as the cloud database service for storing application data such as users, products, and cart information.

## Authentication

The application provides user registration and login functionality. User information is stored in the MongoDB database and the backend handles authentication-related requests.

## Product Categories

Products are organized into different sections, including:

- Women
- Men
- Kids
- Popular products
- New Collections

Users can browse products, open individual product details, and add products to their shopping cart.

## Admin

The admin panel is separated from the main frontend application and communicates with the backend to manage store products.

Administrators can add products and view/manage the available products in the store.

## Purpose

This project was created as a full-stack e-commerce project to practice and demonstrate skills in React, REST APIs, Node.js, Express.js, MongoDB, Mongoose, authentication, state management, routing, and frontend development.

## License

This project is for educational and portfolio purposes.