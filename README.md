# Project Setup & Usage Guide

## Getting Started

Follow the steps below to run this project locally on your machine:

### 1. Install Dependencies
Run the following command in your terminal to install all necessary packages:
- `npm i -f`  
This ensures forceful installation, useful if there are lock or peer dependency issues.

### 2. Configure Environment Variables
Make sure to:
- Reverify your `.env.local` or `.env` file.
- Include all necessary keys (e.g., Supabase project URL and anon/public keys).
- Double-check values for correctness.

### 3. Start the Development Server
Once your environment is set, start the app with:
- `npm run dev`  
This launches your local development server.

## Account Workflow

### 4. Create an Account
- Visit the signup page on the frontend.
- Enter valid email and password to create an account.

### 5. Email Verification
- After signing up, check your inbox for a Supabase verification email.
- Click the link in the email to verify your account.

### 6. Login & Access
- After verification, log in with your credentials.
- Once authenticated, you can use:
  - All protected APIs
  - All protected client-side pages (e.g., user dashboard, post creation, etc.)

## Route Access

### Public Routes (No Login Required)
- `/`
- `/signup`

### Protected Routes (Login Required)
- `/user`
- `/user/posts`
- `/user/posts/create`

If a non-logged-in user attempts to access protected routes, they will be redirected.

---

