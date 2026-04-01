# API Documentation

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /api/v1/auth/register`

**Description:** Creates a new user account with email and password authentication.

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

---

### 2. Login User
**Endpoint:** `POST /api/v1/auth/login`

**Description:** Authenticates user with email and password credentials.

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

---

### 3. Get Current User
**Endpoint:** `GET /api/v1/auth/me`

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

---

### 4. Logout User
**Endpoint:** `POST /api/v1/auth/logout`

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

---

### 5. Refresh Token
**Endpoint:** `POST /api/v1/auth/refresh`

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
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (access denied)
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication

Authentication is performed using JWT tokens stored in HTTP-only cookies:
- **Access Token:** Used to authenticate API requests (short-lived)
- **Refresh Token:** Used to obtain new access tokens when expired (long-lived)

Include the access token in requests to protected endpoints via:
1. HTTP-only cookies (automatic)
2. Authorization header: `Authorization: Bearer <accessToken>`
