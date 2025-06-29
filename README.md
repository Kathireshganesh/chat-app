# 💬 Chat App

A simple full-stack real-time chat application built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🔐 Features

- ✅ User registration & login  
- ✅ JWT-based authentication  
- ✅ Message sending and fetching  
- ✅ Stores messages in MongoDB  
- ✅ Bootstrap styled interface  
- ✅ Logout functionality  

---

## ⚙️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React, Bootstrap        |
| Backend   | Node.js, Express        |
| Database  | MongoDB (via Mongoose)  |
| Auth      | JWT, bcrypt             |

---

## 🚀 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Kathireshganesh/chat-app.git
cd chat-app
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm start
```

✅ Create a `.env` file in the `server/` directory with the following content:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 3️⃣ Frontend Setup

```bash
cd ../client
npm install
npm start
```

✅ This will start the React app on [http://localhost:3000](http://localhost:3000)

Make sure your backend (server) is running at `http://localhost:5000`

---

## 📸 Screenshots

_Add your screenshots here (login page, chat UI, etc.)_

---

## 🧠 Future Improvements

- 🔄 Real-time messaging using Socket.io  
- 🎨 Dark mode and emoji support  
- ✅ Message delete & edit features  
- 👥 Online users status  

---

## 👨‍💻 Author

GitHub: [@Kathireshganesh](https://github.com/Kathireshganesh)

---

## 📃 License

This project is licensed for learning and portfolio use. No warranties provided.
