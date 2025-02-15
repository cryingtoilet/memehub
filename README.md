# MemeHub

MemeHub is a web application for sharing and discovering memes. It allows users to upload, browse, like, and comment on memes, creating a vibrant community around internet humor.

## Features

- **Meme Upload:** Users can upload their own memes with titles and descriptions.
- **Meme Browsing:** Browse a feed of trending and latest memes.
- **User Authentication:** Secure user authentication using Clerk.
- **Like and Dislike:** Users can express their opinions on memes with likes and dislikes.
- **User Profiles:** View user profiles with their uploaded memes.
- **Notifications:** Stay updated with meme activity.
- **Search:** Find memes based on keywords and tags.
- **Responsive Design:** Enjoy a seamless experience on various devices.

## Technologies Used

- **Next.js:** A React framework for building server-rendered web applications.
- **Clerk:** User authentication and management.
- **Drizzle ORM:** TypeScript ORM for database interactions.
- **PostgreSQL:** Relational database for storing meme data.
- **Tailwind CSS:** CSS framework for styling the application.
- **UploadThing:** File uploading service.
- **browser-image-compression:** Image compression library for client-side optimization.
- **Lucide React:** Icon library.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Setup Instructions

Follow these steps to set up the MemeHub project locally:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd MemeHub
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```
    DATABASE_URL=<your_postgresql_connection_string>
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
    CLERK_SECRET_KEY=<your_clerk_secret_key>
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    UPLOADTHING_SECRET=<your_uploadthing_secret>
    UPLOADTHING_APP_ID=<your_uploadthing_app_id>
    NEXT_PUBLIC_API_URL=http://localhost:3000 # Adjust if your API runs on a different port
    ```

    Replace the placeholder values with your actual credentials.

4.  **Run database migrations:**

    ```bash
    npm run db:push
    # or
    yarn drizzle-kit push:pg
    ```

    This will create the necessary tables in your PostgreSQL database.

5.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
