# Booking System API

A modern REST API for managing bookings, built with Node.js, Express, TypeScript, and PostgreSQL.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **Prisma** - ORM for database operations
- **JWT** - Authentication
- **Zod** - Schema validation

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your database URL and other configs

4. Run database migrations:
```bash
npm run prisma:migrate
```

5. Start development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user details

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - List all bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Cancel a booking

## Project Structure

```
src/
├── index.ts           # Entry point
├── config/            # Configuration
├── controllers/       # Route handlers
├── middleware/        # Express middleware
├── routes/            # API routes
├── services/          # Business logic
├── utils/             # Utility functions
├── types/             # TypeScript types
└── prisma/            # Database schema
```

## Development

- `npm run dev` - Start dev server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run compiled project
- `npm run prisma:studio` - Open Prisma Studio for database inspection

## License

MIT
