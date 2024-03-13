## Issue Tracker

[Live Demo](https://darlegui-issue-tracker.vercel.app/)

This is a fullstack CRUD issue tracker project built using Next.js, Prisma, and various other modern technologies. It provides functionalities for users to log in, create, view, edit, and delete issues. Uses a custom server-side API for handling some of the CRUD operations and authentication.

## Features

- **Authentication:** Users can log in using their credentials or via Google OAuth.
- **Issue Management:** Create, view, edit, and delete issues associated with projects.
- **Dashboard:** View a summary of project issues with charts and statistics.
- **Pagination:** Issues are displayed with pagination for better navigation.
- **Responsive Design:** The application is designed to work well on various devices and screen sizes.
- **Custom API:** Utilizes a custom server-side API for handling some of the CRUD operations and authentication.
- **Dynamic Routing:** Different pages are dynamically rendered based on the URL route.
- **Data Validation:** Form data is validated to ensure accuracy and prevent errors.

## Installation Guide

**Server-side needs to run** in order for some CRUD functionalities to work since it uses a custom API. The server-side code can be found in the **_server-side_** folder.
Check **_.env.example_** files for both folders to easily input the environment variables

To set up and run the project locally, follow these steps:

1. **Clone the Repository:** Clone the project repository to your local machine using the following command:

   ```bash
   git clone <repository_url>
   ```

2. **Install Dependencies:** Navigate to the project directory and install the required dependencies using npm or yarn:

   ```bash
   cd <project_directory>
   npm install
   ```

3. **Set up Environment Variables:** Create a `.env` file in the root directory of the project and add the necessary environment variables, including database connection details, API keys, and authentication secrets.

4. **Database Setup:** Set up your database using Prisma. Make sure to update the `schema.prisma` file with your database schema.

5. **Run Migrations:** Apply any pending database migrations using Prisma:

   ```bash
   npx prisma migrate dev
   ```

6. **Start the Development Server:** Start the development server to run the application locally:

   ```bash
   npm run dev
   ```

7. **Access the Application:** Once the server is running, access the application in your web browser at `http://localhost:3000` (or the specified port).

8. **Log In:** If required, log in to the application using your credentials or via Google OAuth.

9. **Explore the Application:** Navigate through the different pages and features of the application, including issue management, dashboard, and user settings.

By following these steps, you should be able to set up and run the fullstack CRUD issue tracker project locally on your machine. Enjoy exploring and using the application!
