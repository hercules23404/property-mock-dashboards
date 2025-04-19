# Property Management Dashboard

A modern web application for managing housing societies, built with React, TypeScript, and Firebase.

## Features

- User authentication and authorization
- Property management
- Tenant management
- Payment tracking
- Maintenance request handling
- Notice board
- Document management
- Analytics and reporting

## Tech Stack

- React
- TypeScript
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS
- Shadcn UI
- React Router
- React Query
- Zod (Schema validation)
- React Hook Form

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Firebase account and project

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # Firebase service functions
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── integrations/  # Third-party integrations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
