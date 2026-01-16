# 🚀 DevMesh

**DevMesh** is a professional networking platform for developers to connect, collaborate, and mesh their tech stacks. Built with the **MERN Stack**, it features a secure, production-grade architecture.

## ✨ Features

- **Tech-Stack Profiles:** Bento-style layouts highlighting developer skills.
- **Dynamic Search:** Search for developers by name or specific programming languages.
- **Secure Auth:** JWT-based authentication with secure HTTP-only cookies.
- **Connection Logic:** Send, accept, or ignore requests to build your professional mesh.
- **Full Privacy:** Complete control over your data, including profile editing and account deletion.

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, DaisyUI.
- **Backend:** Node.js, Express.js, MongoDB, Mongoose.
- **Security:** Bcrypt for hashing, JWT for session management.

## 📂 Folder Structure

``` bash
DevMesh/
├── backend/
│   ├── src/
│   │   ├── config/         # Database connection (database.js)
│   │   ├── models/         # Mongoose schemas (User.js, ConnectionRequest.js)
│   │   ├── routes/         # Express routers (auth.js, profile.js, request.js, user.js)
│   │   ├── middlewares/    # Authentication & validation (auth.js)
│   │   ├── utils/          # Helper functions (validation.js)
│   │   └── app.js          # Entry point
│   ├── .env                # Environment variables (Secrets)
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Images and logos
│   │   ├── components/     # Reusable UI (UserCard, NavBar, Footer)
│   │   ├── pages/          # Main views (Login, Signup, Feed, Search)
│   │   ├── utils/          # Constants, slices, and API services
│   │   ├── App.jsx         # Routing setup
│   │   └── main.jsx        # Root render
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🚀 Installation

### 1. Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
``` bash 
cd frontend
npm install
```
### 4. Run the App
Terminal 1 (Backend): `npm run dev`

Terminal 2 (Frontend): `npm run dev (or npm start)`

## 🧠 Technical Challenges & Solutions

### 1. Secure Authentication Flow
Implemented a robust authentication system using **JWT (JSON Web Tokens)**. Unlike standard implementations, tokens are stored in **HTTP-only cookies** to prevent XSS (Cross-Site Scripting) attacks, ensuring a secure session management lifecycle.

### 2. State Management with Redux Toolkit
Managed complex global states (User data, Feed, Connection Requests) using **Redux Toolkit**. This ensures a "single source of truth" and allows for seamless UI updates across the Navbar, Profile, and Feed without unnecessary API calls.

### 3. Database Indexing for Search
To ensure the **Search Feature** remains performant as the user base grows, I implemented **Text Indexing** in Mongoose. This allows for fast, case-insensitive regex searches across names and skills.



## 🛣️ API Endpoints

### Auth Router
- `POST /signup`: Register a new developer.
- `POST /login`: Authenticate user & receive cookie.
- `POST /logout`: Clear session cookie.

### Profile Router
- `GET /profile/view`: Fetch logged-in user details.
- `PATCH /profile/edit`: Update profile fields (skills, about, etc.).
- `GET /user/search?query=...`: Partial match search for developers.
- `DELETE /deleteAccount`: Permanent account and data removal.

### Connection Router
- `POST /request/send/:status/:toUserId`: Send 'interested' or 'ignored' request.
- `POST /request/review/:status/:requestId`: Accept or Reject incoming requests.

## 📈 Database Schema (MERN)

The application uses a relational-style approach within MongoDB:
- **User Schema:** Handles core profile data and tech-stack arrays.
- **ConnectionRequest Schema:** Tracks relationships between two User IDs with statuses: `ignored`, `interested`, `accepted`, or `rejected`.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License
MIT License

---

### Why this works:
* **Scalability:** Placing routes and models in separate folders prevents `app.js` from becoming a giant, unreadable file.
* **Security:** Using a `.env` file ensures your `JWT_SECRET` and `MONGODB_URI` aren't exposed on GitHub.
* **Organization:** Keeping your `utils` (like `searchService.js` and `userSlice.js`) together makes debugging much faster.