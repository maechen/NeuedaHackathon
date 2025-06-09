# Firebase Authentication Project

This project implements a simple authentication system using Firebase. It includes a login page and a signup page, allowing users to create accounts and log in to the application.

## Project Structure

```
firebase-auth-project
├── public
│   ├── index.html        # Main entry point of the application
│   ├── login.html        # Login page for user authentication
│   └── signup.html       # Signup page for new user registration
├── src
│   ├── app.js            # JavaScript logic for handling authentication
│   └── firebase-config.js # Firebase configuration details
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd firebase-auth-project
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then run:
   ```
   npm install
   ```

3. **Firebase Configuration**:
   Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/). Obtain your Firebase configuration details (API key, project ID, etc.) and add them to the `src/firebase-config.js` file.

4. **Run the application**:
   You can serve the application using a local server. For example, you can use the `http-server` package:
   ```
   npx http-server public
   ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:8080` (or the port specified by your server) to access the application.

## Usage

- Navigate to the login page to log in with your credentials.
- If you don't have an account, you can sign up on the signup page.
- After logging in, you will be able to access the main features of the application.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.