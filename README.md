# Cinema Booking System API 🎬🍿

A RESTful API for managing movie theaters, screenings, and seat bookings built with Node.js, Express, and MongoDB.


## Features ✨

- **User Authentication**: Register/login with JWT token-based authentication
- **Role-Based Access**: User and Admin roles with different permissions
- **Movie Management**: CRUD operations for movies
- **Room Management**: Create and manage theater rooms with seat configurations
- **Screening Scheduling**: Schedule movie screenings with time conflict detection
- **Seat Booking**: Reserve seats for screenings with validation
- **Comprehensive Documentation**: Full API documentation with Swagger UI
- **Error Handling**: Custom error codes and messages for all scenarios

## Technologies Used 🛠️

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger UI
- **Logging**: Custom logging system with file rotation
- **Environment Management**: Dotenv

## API Documentation 📚

Interactive API documentation is available at:

`http://localhost:3000/api-docs`

## Installation ⚙️

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cinema-booking-api.git
   cd cinema-booking-api
   
2. Install dependencies
    ```bash
    npm install

3. Create a `.env` file based on the sample:
    ```bash
    cp sample.env .env 

4. Update the `.env` file with your configuration:
    ```bash
    DB_CONFIG=mongodb://localhost:27017/cinema-booking
    PORT=3000
    ACCESS_TOKEN_SECRET=your-secret-key-here
    ADMIN_USERNAME=superadmin
    ADMIN_PASSWORD=admin123

5. Start the development server:
    ```bash
   npm run dev

## Project Structure 📂

    libs/
        config/          # Environment configurations
        database/        # Database models and queries
        middlewares/     # Authentication and authorization
        modules/         # Utility modules
        routes/          # All API routes
        scripts/         # Database scripts
        init.js          # Server initialization
    app.js             # Main application entry
    package.json

## API Endpoints 🌐

### Users 👥

* `POST /user/register` - Register a new user
* `POST /user/register-admin` - Register new admin (admin only)
* `POST /user/login` - Login user

### Movies 🎥

* `POST /movie` - Create new movie (admin only)
* `GET /movie` - Get all movies
* `GET /movie/:id` - Get movie details
* `PUT /movie/:id` - Update movie (admin only)
* `DELETE /movie/:id` - Delete movie (admin only)

### Rooms 🏢

* `POST /room` - Create new room (admin only)
* `GET /room` - Get all rooms
* `GET /room/:id` - Get room details
* `PUT /room/:id` - Update room (admin only)
* `DELETE /room/:id` - Delete room (admin only)

### Screenings 🕒

* `POST /screening` - Create new screening (admin only)
* `GET /screening` - Get all screenings
* `GET /screening/movie/:movieId` - Get screenings by movie
* `GET /screening/room/:roomId` - Get screenings by room
* `GET /screening/:id` - Get screening details
* `PUT /screening/:id` - Update screening (admin only)
* `DELETE /screening/:id` - Delete screening (admin only)

### Bookings 🎟️

* `POST /booking` - Book a seat (user only)
* `GET /booking/mine` - Get user's bookings
* `GET /booking/:id` - Get booking details
* `DELETE /booking/:id` - Cancel booking (user only)

## Error Handling ⚠️

The API uses consistent error codes:

* ### User Errors (2000-2099)

   * 2001: Username already exists
   * 2003: Wrong username/password
   * 2004: Admin access required

* ### Room Errors (2100-2199)

   * 2101: Duplicate room name
   * 2102: Room not found

* ### Movie Errors (2200-2299)

   * 2201: Duplicate movie name
   * 2202: Movie not found

* ### Screening Errors (2300-2399)

   * 2301: Screening not found
   * 2302: Time slot conflict

* ### Booking Errors (2400-2499)

   * 2401: Booking not found
   * 2402: Invalid seat
   * 2403: Seat already booked
   * 2404: Not authorized to cancel

## Authentication 🔐

Most endpoints require JWT authentication. Include the token in the Authorization header:

   ```
   Authorization: Bearer your.jwt.token.here
   ```

## Examples 💡

**Register a User**
   ```
   curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
   ```
**Create a Movie (Admin)**
   ```
   curl -X POST http://localhost:3000/movie \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your.jwt.token" \
  -d '{"name":"Inception","poster":"http://example.com/poster.jpg","duration":148}'
   ```
