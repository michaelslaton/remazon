## Remazon Community Management App  

### 📌 Project Overview  
The **Remazon Community Management App** is a web application designed for a Discord community structured like a faux business. It allows members to:  
- Register and list their personal information.  
- Gain access to events and create events (if they have the appropriate rank).  
- Earn points distributed by the community owner as rewards, fostering friendly competition.  

This project is built to help the client efficiently manage and engage their community members.  

---  

### 🛠 Tech Stack  
The project is built using **React, TypeScript, and Firebase**, with state management powered by **Redux Toolkit**.  

#### Dependencies:  
- React & React Router: UI and navigation.  
- Redux Toolkit & Redux Persist: State management and persistence.  
- Firebase: Authentication, database, and hosting.  
- FontAwesome: Icons for UI enhancement.  
- React Loader Spinner: Loading indicators.  

#### Development & Testing:  
- TypeScript: Static typing for better maintainability.  
- Vite: Fast development environment.  
- Vitest & Testing Library: Unit and integration testing.  
- ESLint & Prettier: Code quality and formatting.  

---  

### 🔧 Setup  

#### Set Up Environment Variables  
Create a `.env` file in the project root and add the following:  
```sh  
VITE_FIREBASE_REMAZON_API_KEY=your-api-key  
VITE_FIREBASE_REMAZON_AUTH_DOMAIN=your-auth-domain  
VITE_FIREBASE_REMAZON_PROJECT_ID=your-project-id  
VITE_FIREBASE_REMAZON_STORAGE_BUCKET=your-storage-bucket  
VITE_FIREBASE_REMAZON_MESSAGING_SENDER_ID=your-messaging-sender-id  
VITE_FIREBASE_REMAZON_APP_ID=your-app-id  
VITE_REMAZON_API_URL=your-api-url  
```

---  

### 🚀 Usage  

#### For Regular Users:  
- Create an account using Firebase authentication.  
- Fill out profile details.  
- Browse and join community events.  
- Earn and track points distributed by the admin.  

#### For Admins:  
- Access an **admin panel** with management tools.  
- Post the **message of the day** to keep members informed.  
- Manage member **ranks** and event permissions.  
- Assign **points** to encourage participation.  

---  

### 🤝 Contributing  
If you'd like to contribute to this project, feel free to fork the repo and submit a pull request.  

---  

### 📩 Contact & Links  
- **GitHub Repository**: [Remazon GitHub Repo](https://github.com/michaelslaton/remazon)  
- **Contact Email**: [michael.slaton.dev@gmail.com](mailto:michael.slaton.dev@gmail.com)  

---
