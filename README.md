# Gentleman Jones

A modern full-stack web application for managing and tracking phishing URLs, built with Next.js, React, MongoDB, and Firebase Authentication.

---

## 🚀 Overview
Gentleman Jones is a production-ready, beginner-friendly web app that demonstrates best practices in full-stack development. It features user authentication, admin management, and a clean, responsive UI. The backend uses MongoDB for data storage, replacing the original Firestore integration.

---

## 🛠️ Tools & Technologies Used

- **Next.js** (React Framework): Fast, scalable, and SEO-friendly web app framework.
- **React**: Component-based UI library for building interactive interfaces.
- **TypeScript**: Type-safe JavaScript for robust code and easier maintenance.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **MongoDB**: NoSQL database for scalable, flexible data storage.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Firebase Authentication**: Secure, easy-to-use user authentication and management.
- **Radix UI**: Accessible, unstyled UI primitives for building custom components.
- **Lucide Icons**: Beautiful, open-source icon library for React.
- **Turbopack**: Next.js's new fast bundler for development.

---

## 📦 Project Structure

```
webFS/
├── src/
│   ├── app/            # Next.js app routes (pages, API endpoints)
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers (e.g., cart)
│   ├── firebase/       # Firebase Auth integration & legacy Firestore hooks
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility libraries (e.g., MongoDB connection)
│   ├── models/         # Mongoose models (MongoDB schemas)
│   └── ...
├── public/             # Static assets (images, favicon)
├── .env.local          # Environment variables (MongoDB URI, etc.)
├── package.json        # Project metadata and dependencies
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

---

## 📝 Features

- **User Authentication**: Sign up, login, and manage users securely with Firebase Auth.
- **Admin Dashboard**: Admins can log in and manage user roles.
- **MongoDB Backend**: All user and app data is stored in MongoDB via Mongoose models.
- **Responsive UI**: Works great on desktop and mobile devices.
- **Accessible Components**: Built with Radix UI and Tailwind for best-in-class accessibility.
- **API Endpoints**: Next.js API routes for user CRUD operations.
- **Error Handling**: Friendly error messages and robust error handling throughout the app.

---

## 🧑‍💻 Getting Started (For Beginners)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/atlas) (or local MongoDB)
- [Firebase Project](https://console.firebase.google.com/) (for Auth)

### 2. Clone the Repository
```sh
# Clone the repo
git clone https://github.com/SHINU4RATHOD/Gentleman-Jones.git
cd Gentleman-Jones/webFS
```

### 3. Install Dependencies
```sh
npm install
```

### 4. Set Up Environment Variables
Create a `.env.local` file in the project root:
```
MONGO_URI=your_mongodb_connection_string
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```
Replace the values with your actual MongoDB and Firebase credentials.

### 5. Run the Development Server
```sh
npm run dev
```
Visit [http://localhost:9002](http://localhost:9002) in your browser.

---

## 🗂️ Key Files & Folders
- `src/app/api/users/route.ts` — API endpoint for creating/updating users in MongoDB.
- `src/app/api/users/[uid]/route.ts` — API endpoint for fetching/updating a user by UID.
- `src/models/User.ts` — Mongoose schema for user data.
- `src/lib/mongodb/connection.ts` — MongoDB connection helper.
- `src/firebase/` — Firebase Auth integration and legacy Firestore hooks.
- `src/components/` — All UI components (cards, buttons, forms, etc).

---

## 🧩 Extending & Customizing
- Add more Mongoose models in `src/models/` for new collections.
- Create new API routes in `src/app/api/` for additional backend features.
- Customize UI in `src/components/` and styles in `tailwind.config.ts`.
- Secure API routes with Firebase ID token verification for production.

---

## 🛡️ Security & Best Practices
- Never commit your `.env.local` file or secrets to version control.
- Use HTTPS and secure cookies in production.
- Validate and sanitize all user input in API routes.
- Regularly update dependencies for security patches.

---

## 💡 Troubleshooting
- **MongoDB connection errors**: Check your `MONGO_URI` in `.env.local`.
- **Firebase Auth issues**: Verify your Firebase credentials and project setup.
- **Hydration mismatch**: Disable browser extensions like Dark Reader when testing.
- **Port conflicts**: Change the port in `package.json` script if needed.

---

## 📚 Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs)

---

## 🏆 Credits
- Project by [SHINU4RATHOD](https://github.com/SHINU4RATHOD)
- Migration & code assistance by GitHub Copilot

---

## 📬 Need Help?
If you get stuck, open an issue on GitHub or ask for help in the project discussions!
