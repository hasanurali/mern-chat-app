# API Documentation

**Base URL:** `http://localhost:2000/api/v1`

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Description:** Creates a new user account with email and password authentication.

**Rate Limit:** 3 requests per hour

**Request Body:**
```json
{
  "name": "string (3-30 characters, letters only)",
  "email": "string (valid email format)",
  "phone": "string (valid phone number)",
  "password": "string (min 8 characters, must contain uppercase, lowercase, number, and special character)"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

**Response:**
```json
{
  "statusCode": 201,
  "message": "User created",
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "bio": "string",
    "profilePic": "string (URL)",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 201 Created

**Cookies Set:**
- `accessToken` - JWT token for authentication (short-lived)
- `refreshToken` - JWT token for refreshing access token (long-lived)

**Error Responses:**
- `400` - Validation failed (invalid name, email, phone, or password format)
- `409` - User already exists
- `429` - Too many requests (rate limit exceeded)

---

### 2. Login User
**Endpoint:** `POST /auth/login`

**Description:** Authenticates user with email and password credentials.

**Rate Limit:** 5 requests per 15 minutes

**Request Body:**
```json
{
  "email": "string (valid email format)",
  "password": "string"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "User logged in",
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "bio": "string",
    "profilePic": "string (URL)",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 200 OK

**Cookies Set:**
- `accessToken` - JWT token for authentication (short-lived)
- `refreshToken` - JWT token for refreshing access token (long-lived)

**Error Responses:**
- `400` - Validation failed (invalid email or missing password)
- `401` - Invalid credentials or user not found
- `429` - Too many requests (rate limit exceeded)
- `404` - User not found

---

### 3. Get Current User
**Endpoint:** `GET /auth/me`

**Description:** Retrieves the currently authenticated user's information.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Response:**
```json
{
  "statusCode": 200,
  "message": "User fetched",
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "bio": "string",
    "profilePic": "string (URL)",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 200 OK

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)

---

### 4. Logout User
**Endpoint:** `POST /auth/logout`

**Description:** Logs out the current user and invalidates their session.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Response:**
```json
{
  "statusCode": 200,
  "message": "User logged out",
  "success": true,
  "data": null
}
```

**Status Code:** 200 OK

**Cookies Cleared:**
- `accessToken`
- `refreshToken`

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)

---

### 5. Refresh Token
**Endpoint:** `POST /auth/refresh`

**Description:** Generates a new access token using the refresh token.

**Request:** 
- Requires `refreshToken` in cookies

**Response:**
```json
{
  "statusCode": 200,
  "message": "Token refreshed",
  "success": true,
  "data": null
}
```

**Status Code:** 200 OK

**Cookies Set:**
- `accessToken` - New JWT token for authentication
- `refreshToken` - New JWT token for future refresh requests

**Error Responses:**
- `401` - No token provided, invalid token, expired token, user not found, or invalid refresh token

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

**Register Endpoint:**
- **Limit:** 3 requests per hour
- **Window:** 60 minutes
- **Response on Limit Exceeded:** 429 Too Many Requests
- **Message:** "Too many accounts created, try again later"

**Login Endpoint:**
- **Limit:** 5 requests per 15 minutes
- **Window:** 15 minutes
- **Response on Limit Exceeded:** 429 Too Many Requests
- **Message:** "Too many login attempts, try again later"

When rate limit is exceeded, the response includes an `RateLimit-*` header with information about the limit.

---

## Authentication

Authentication is performed using JWT tokens stored in HTTP-only cookies:
- **Access Token:** Used to authenticate API requests (short-lived)
- **Refresh Token:** Used to obtain new access tokens when expired (long-lived)

Include the access token in requests to protected endpoints via:
1. HTTP-only cookies (automatic)
2. Authorization header: `Authorization: Bearer <accessToken>`

---

## Error Handling

All endpoints return error responses in the following format:

```json
{
  "statusCode": "HTTP status code",
  "message": "Error description",
  "success": false,
  "errors": []
}
```

### Common Status Codes:
- `400` - Bad Request (validation errors or user already exists)
- `401` - Unauthorized (missing or invalid token, invalid credentials)
- `404` - Not Found (user not found)
- `409` - Conflict (duplicate key, user already exists)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error