# ReCareer
A dynamic web application introducing a unique approach to career orientation and transitioning into new fields. Leveraging product psychology principles, it uses ChatGPT to analyze user inputs and provide tailored career recommendations.

## 🚀 Start the application locally
To run this project locally, follow these steps:

### 1️⃣ Install dependencies (one-time setup)
Before starting the application, install all necessary dependencies.

#### 1.1. Dependencies
Run this in your project root directory (recareer/):
```
npm install --prefix backend express cors dotenv openai
npm install --prefix backend --save-dev nodemon
npm install --prefix frontend
```

| Dependency       | Used in  | Purpose |
|-----------------|---------|---------|
| `express`       | Backend  | Creates the API server |
| `cors`         | Backend  | Enables CORS for frontend-backend communication |
| `dotenv`       | Backend  | Loads environment variables from `.env` |
| `openai`       | Backend  | Connects to the OpenAI API |
| `nodemon` (dev) | Backend  | Automatically restarts the server on file changes |
| Frontend dependencies | Frontend  | Installs all dependencies from `package.json` in the frontend |


#### 1.2. Backend Setup
Navigate to the backend directory and install the required Node.js packages:
```
cd recareer/backend
npm install
```

#### 1.3. Frontend Setup
Navigate to the main project directory and install the required packages for the frontend
```
cd recareer
npm install
```

### 2️⃣ Start the application
Once all dependencies are installed, start both the backend and frontend.

#### 2.1. Start the backend
Open a terminal and run:
```
cd recareer/backend
node server.js
```

#### 2.2. Start the frontend
In a new (/another) terminal window, run:
```
cd recareer
npm run dev
```
🔹 This starts the frontend on port 5173.

### ⚠️ Missing `.env` Files
The `.env` files are not included in this repository for security reasons.  
To use the OpenAI API and connect the frontend to the backend, you need to create **two separate `.env` files** in the respective directories.

---

#### **✅ 1. Backend: Create `.env` in `backend/`**
Create a `.env` file inside the `backend/` directory and add the following environment variables:

```
OPENAI_API_KEY=your-api-key-here # Your Project API Key (sk-proj-...) 
OPENAI_ORG_ID=your-organization-id # Your Organization ID (org-...) 
OPENAI_PROJECT_ID=your-project-id # Your Project ID (proj-...)
FRONTEND_URL=https//:your-fontend-id # Your Frontend Domain
```
🔹 Without this file, the backend cannot connect to OpenAI.
🔹 Ensure that .env is listed in .gitignore to prevent accidental leaks.

#### **✅ 2. Frontend: Create `.env` in `frontend/`**
Create a .env file inside the frontend/ directory and add:

```
VITE_API_URL=https://your-backend-domain

```
🔹 This ensures that the frontend correctly connects to the deployed backend.
🔹 VITE variables must start with VITE_ to be accessible in the frontend.


### ✅ Ready to go!
Once both the backend and frontend are running, open your browser and go to:
👉 http://localhost:5173

Now you can use the application! 🎉

### 📖 Project Structure
The project follows a simple structure:
```
/recareer
│── /backend        # Node.js & Express backend with OpenAI API
│   ├── server.js   # Main backend server file
│   ├── .env        # Environment variables (not included)
│   ├── package.json # Backend dependencies
│── /src            # React frontend (Vite)
│   ├── App.jsx     # Main React component
│   ├── components/ # UI components
│── package.json    # Frontend dependencies
│── README.md       # Project documentation
```

### 🛠 Technologies Used
Frontend: React, Vite, JavaScript
Backend: Node.js, Express, OpenAI API
