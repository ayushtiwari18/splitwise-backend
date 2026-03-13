Client Request
     ↓
server.js  (starts the HTTP server)
     ↓
app.js     (Express app config, middleware, routes)
     ↓
routes/    (defines URL paths)
     ↓
controllers/ (handles request/response logic)
     ↓
services/    (business logic lives here)
     ↓
models/      (database table definitions via Sequelize)
     ↓
MySQL / SQLite Database
