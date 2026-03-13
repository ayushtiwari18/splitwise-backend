# Splitwise Backend

A Splitwise-like expense splitting backend built with Node.js, Express, Sequelize ORM and SQLite.

## Tech Stack

- Node.js
- Express v4
- Sequelize ORM
- SQLite

## Setup

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

### Users
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/users | Create user |
| GET | /api/users/:id | Get user by ID |
| PUT | /api/users/:id | Update email or currency |
| DELETE | /api/users/:id | Delete user |

### Expenses
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/expenses | Create expense |
| GET | /api/expenses | List all expenses |
| GET | /api/expenses/:id | Get expense by ID |
| PUT | /api/expenses/:id | Update expense |
| DELETE | /api/expenses/:id | Delete expense |
| GET | /api/expenses/activity/:userId | Activity log grouped by month |
| GET | /api/expenses/activity/:userId?startDate=&endDate= | Activity log by date range |

### Balances
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/balances | All balances |
| GET | /api/balances/:userId | Balances for a specific user |

## Postman Collection

Import `postman_collection.json` from the root of this repo.
