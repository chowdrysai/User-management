# User Management System

This project is a simple MERN application for managing a list of users. The application includes various features for displaying, adding, and removing users, along with additional functionality such as sorting, filtering, and pagination. The README provides an overview of the project structure, features, and instructions for running the application.


## Project Structure

The project is organized into two main parts:

1. **Node.js Backend:**
   - Located in the `server` directory.
   - Manages the server-side logic for user data.
   - Utilizes Express for routing and handling requests.
   - Handles user data storage, retrieval, addition, and removal.

2. **React Frontend:**
   - Located in the `client` directory.
   - Implements the user interface using React.
   - Utilizes React Router for client-side routing.
   - Manages state using React state for user data, form input, and modal visibility.
   - Implements components for user list, user details, form, and other reusable elements.

## Features

### User List

- Displays a list of users with their usernames, email addresses, and brief descriptions.
- Provides a "Edit" button for each user to see more information.
- Implements sorting, filtering (Search Bar), and pagination for the user list.

### User Details

- Shows detailed information about a selected user when clicking the "Edit" button.
- Includes additional information such as user role, DOB, and other relevant details.

### Add and Remove Users

- Allows users to add new users with username, email address, description and other information.
- Provides functionality to remove users from the list.


### Routing

- Implements client-side routing to navigate between the user list and user details views.
- Enables linking from each user in the list to their details page.

### Form Handling

- Implements a form for adding new users with proper form validation.
- Uses controlled components to manage form input.

### Component Composition

- Breaks down the application into reusable components (e.g., user list, user details, form).
- Utilizes props to pass data between parent and child components.

### CSS Styling

- Applies CSS styling to enhance the visual appeal of the application.
- Uses CSS modules or another styling approach of choice for a modular and maintainable design.

### Error Handling

- Implements basic error handling, such as displaying an error message for incomplete user information, invalide Email.

### Password Encryption
- Ensured the security of user's data by employing robust password encryption technique `bcrypt hashing` in application, safeguarding sensitive information with one-way, salted algorithms.

## How to Run the Application

## MongoDB Setup for UserManagement

### 1. Install MongoDB:

Download and install MongoDB from the [official MongoDB website](https://www.mongodb.com/try/download/community).

### 2. Start MongoDB Server using Mongo Compass:

Open Compass in the URL enter `mongodb://localhost:27017/Usermanagement` and click on connect.

![Demo of MongoDB Setup](./Screenshot%202023-11-27%20141123.png)

1. **Backend:**
   - Navigate to the `server` directory.
   - Install dependencies: `npm install`
   - Run the server: `npm start`

2. **Frontend:**
   - Navigate to the `client` directory.
   - Install dependencies: `npm install --force`
   - Run the development server: `npm start`

3. **Access the Application:**
   - Open your browser and visit [http://localhost:3000](http://localhost:3000) to interact with the User Management Application.

