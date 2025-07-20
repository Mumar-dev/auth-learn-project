# 🛡️ Auth Role-Based API – Token + Cookie Authorization

This is a **Node.js + Express** backend project that demonstrates a secure **authentication system** using **JWT tokens stored in HTTP-only cookies**, with **role-based access control** for different user types: `buyer`, `seller`, and `admin`.

---

## 📚 Features

- ✅ User Signup with hashed passwords (bcrypt)
- ✅ User Login with JWT token generation
- ✅ Token stored in secure HTTP-only cookies
- ✅ Middleware for token verification (`Authorization`)
- ✅ Role-based middlewares (`isBuyer`, `isSeller`, `isAdmin`)
- ✅ Protected routes for different roles
- ✅ Clean structure for learning & extension

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **cookie-parser**

---

## Set Up .env File

 - Create a .env file in the root folder:
 - PORT=5000
 - MONGO_URI=your_mongodb_connection_string
 - JWT_SECREAT_KEY=your_jwt_secret

   

### Clone the Repository

```bash
git clone https://github.com/your-username/auth-role-based-api.git
cd auth-learn-project
npm install
```



