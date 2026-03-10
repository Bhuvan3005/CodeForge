# 🚀 CodeForge

<div align="center">
  <h3>A Modern Platform for Algorithmic Problems, Progress Tracking, and Learning Analytics</h3>
</div>

---

## 📖 Overview

**CodeForge** is an advanced coding practice platform designed to help developers enhance their algorithmic skills. Whether you're preparing for technical interviews or simply looking to improve your problem-solving abilities, CodeForge provides an interactive, feature-rich environment with comprehensive analytics.

## ✨ Features

- **💻 Interactive Code Editor**: Write and run your code with a fully-integrated editor supporting multiple languages (JavaScript, Python) powered by CodeMirror.
- **📚 Extensive Problem Library**: Browse through a wide variety of algorithmic challenges categorized by difficulty and topic.
- **📊 Real-time Analytics & Progress Tracking**: Keep track of your coding journey with interactive charts and visualizations.
- **🔐 Secure User Authentication**: Robust signup and login flow powered by JWT and bcrypt.
- **🎨 Modern UI/UX**: A sleek, responsive, and beautifully animated user interface built with React, Tailwind CSS, and Framer Motion.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React.js](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Routing**: React Router DOM
- **UI & Animations**: Tailwind CSS, Framer Motion, Lucide React
- **Editor**: UIW React CodeMirror
- **Charts**: Recharts

### Backend
- **Environment**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Security & Auth**: JSON Web Tokens (JWT), bcryptjs
- **Utilities**: Nodemailer for email services

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your local machine:
- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/CodeForge.git
   cd CodeForge
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your environment variables (e.g., `MONGO_URI`, `JWT_SECRET`, `PORT`).
   
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application in action.

## 📄 License

This project is licensed under the MIT License.
