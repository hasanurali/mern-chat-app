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

## Chat Endpoints

### 1. Create One-to-One Chat
**Endpoint:** `POST /chat/one/:id`

**Description:** Creates or retrieves a one-to-one chat with another user.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - ID of the user to chat with

**Response:**
```json
{
  "statusCode": 201,
  "message": "Chat created",
  "success": true,
  "data": {
    "_id": "string",
    "chatName": "string",
    "isGroupChat": false,
    "members": ["string"],
    "latestMessage": "object",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 201 Created

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)
- `404` - User not found

---

### 2. Create Group Chat
**Endpoint:** `POST /chat/group`

**Description:** Creates a new group chat with multiple members.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Request Body:**
```json
{
  "name": "string (group name)",
  "members": ["string (array of user IDs)"]
}
```

**Response:**
```json
{
  "statusCode": 201,
  "message": "Group created",
  "success": true,
  "data": {
    "_id": "string",
    "chatName": "string",
    "isGroupChat": true,
    "members": ["string"],
    "groupAdmin": "string",
    "latestMessage": "object",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 201 Created

**Error Responses:**
- `400` - Validation failed (missing name or members)
- `401` - Unauthorized (missing or invalid token)

---

### 3. Fetch All Chats
**Endpoint:** `GET /chat`

**Description:** Retrieves all chats for the logged-in user.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Response:**
```json
{
  "statusCode": 200,
  "message": "Chats fetched",
  "success": true,
  "data": [
    {
      "_id": "string",
      "chatName": "string",
      "isGroupChat": "boolean",
      "members": ["string"],
      "latestMessage": "object",
      "createdAt": "ISO 8601 timestamp",
      "updatedAt": "ISO 8601 timestamp"
    }
  ]
}
```

**Status Code:** 200 OK

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)

---

### 4. Fetch Specific Chat
**Endpoint:** `GET /chat/:id`

**Description:** Retrieves details of a specific chat.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Chat ID

**Response:**
```json
{
  "statusCode": 200,
  "message": "Chat fetched",
  "success": true,
  "data": {
    "_id": "string",
    "chatName": "string",
    "isGroupChat": "boolean",
    "members": ["string"],
    "latestMessage": "object",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 200 OK

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)
- `404` - Chat not found

---

### 5. Join Group Chat
**Endpoint:** `POST /chat/join/:id`

**Description:** Join an existing group chat.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Group chat ID

**Response:**
```json
{
  "statusCode": 200,
  "message": "User joined group",
  "success": true,
  "data": {
    "_id": "string",
    "chatName": "string",
    "isGroupChat": true,
    "members": ["string"],
    "groupAdmin": "string",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 200 OK

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)
- `404` - Group chat not found

---

### 6. Leave Group Chat
**Endpoint:** `POST /chat/leave/:id`

**Description:** Leave an existing group chat.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Group chat ID

**Response:**
```json
{
  "statusCode": 200,
  "message": "User left group",
  "success": true,
  "data": {
    "_id": "string",
    "chatName": "string",
    "isGroupChat": true,
    "members": ["string"],
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 200 OK

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)
- `404` - Group chat not found

---

### 7. Change Group Name
**Endpoint:** `PUT /chat/name/:id`

**Description:** Update the name of a group chat.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Group chat ID

**Request Body:**
```json
{
  "name": "string (new group name)"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Group name updated",
  "success": true,
  "data": {
    "_id": "string",
    "chatName": "string",
    "isGroupChat": true,
    "members": ["string"],
    "groupAdmin": "string",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 200 OK

**Error Responses:**
- `400` - Validation failed (missing or invalid name)
- `401` - Unauthorized (missing or invalid token)
- `404` - Group chat not found

---

### 8. Delete Chat
**Endpoint:** `DELETE /chat/:id`

**Description:** Delete a chat (one-to-one or group).

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Chat ID

**Response:**
```json
{
  "statusCode": 200,
  "message": "Chat deleted",
  "success": true,
  "data": null
}
```

**Status Code:** 200 OK

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)
- `404` - Chat not found

---

## Message Endpoints

### 1. Create Message
**Endpoint:** `POST /message/:id`

**Description:** Send a new message in a chat.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Chat ID

**Request Body:**
```json
{
  "content": "string (message content)"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "message": "Message sent",
  "success": true,
  "data": {
    "_id": "string",
    "sender": "string (user ID)",
    "content": "string",
    "chat": "string (chat ID)",
    "status": "sent",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 201 Created

**Error Responses:**
- `400` - Validation failed (empty content)
- `401` - Unauthorized (missing or invalid token)
- `404` - Chat not found

---

### 2. Fetch Messages
**Endpoint:** `GET /message/:id`

**Description:** Retrieve all messages from a chat.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Chat ID

**Response:**
```json
{
  "statusCode": 200,
  "message": "Messages fetched",
  "success": true,
  "data": [
    {
      "_id": "string",
      "sender": "string (user ID)",
      "content": "string",
      "chat": "string (chat ID)",
      "status": "string (sent/delivered/read)",
      "createdAt": "ISO 8601 timestamp",
      "updatedAt": "ISO 8601 timestamp"
    }
  ]
}
```

**Status Code:** 200 OK

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)
- `404` - Chat not found

---

### 3. Update Message Status
**Endpoint:** `PUT /message/:id`

**Description:** Update the read/delivery status of a message.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Message ID

**Request Body:**
```json
{
  "status": "string (sent/delivered/read)"
}
```

**Response:**
```json
{
  "statusCode": 200,
  "message": "Message status updated",
  "success": true,
  "data": {
    "_id": "string",
    "sender": "string (user ID)",
    "content": "string",
    "chat": "string (chat ID)",
    "status": "string",
    "createdAt": "ISO 8601 timestamp",
    "updatedAt": "ISO 8601 timestamp"
  }
}
```

**Status Code:** 200 OK

**Error Responses:**
- `400` - Validation failed (invalid status)
- `401` - Unauthorized (missing or invalid token)
- `404` - Message not found

---

### 4. Delete Message
**Endpoint:** `DELETE /message/:id`

**Description:** Delete a message from a chat.

**Authentication Required:** Yes (Bearer token or accessToken cookie)

**Path Parameters:**
- `id` (string) - Message ID

**Response:**
```json
{
  "statusCode": 200,
  "message": "Message deleted",
  "success": true,
  "data": null
}
```

**Status Code:** 200 OK

**Error Responses:**
- `401` - Unauthorized (missing or invalid token)
- `404` - Message not found

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
- `403` - Forbidden (no permission)
- `404` - Not Found (user not found)
- `409` - Conflict (duplicate key, user already exists)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error