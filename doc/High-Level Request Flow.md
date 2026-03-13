POST /api/users
        ↓
  userRoutes.js       → defines the URL
        ↓
  userController.js   → handles req/res, validates input
        ↓
  userService.js      → talks to the database
        ↓
  User.js (model)     → defines the table schema
        ↓
  SQLite database
