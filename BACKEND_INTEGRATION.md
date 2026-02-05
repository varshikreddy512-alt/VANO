# Backend Integration Guide

This document provides detailed information about the API endpoints that your Node.js backend must implement.

## API Endpoints Reference

### 1. Authentication Endpoints

#### Create Team
```
POST /api/auth/create-team
```

**Request Body:**
```json
{
  "teamName": "string",
  "password": "string",
  "leadName": "string",
  "eventName": "string",
  "eventDate": "YYYY-MM-DD",
  "eventEndTime": "HH:MM",
  "numberOfMembers": number
}
```

**Success Response:**
```json
{
  "teamId": "string",
  "message": "Team created successfully"
}
```

#### Join Team
```
POST /api/auth/join-team
```

**Request Body:**
```json
{
  "teamName": "string",
  "password": "string",
  "memberName": "string"
}
```

**Success Response:**
```json
{
  "teamId": "string",
  "message": "Successfully joined team"
}
```

---

### 2. Team Management Endpoints

#### Setup Team
```
POST /api/team/setup
```

**Request Body:**
```json
{
  "teamId": "string",
  "problemStatement": "string",
  "members": [
    {
      "name": "string",
      "interest": "Frontend | Backend | AI | Design | DevOps | Full Stack"
    }
  ]
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Team setup completed"
}
```

#### Get Team Data
```
GET /api/team/:teamId
```

**Success Response:**
```json
{
  "teamId": "string",
  "teamName": "string",
  "eventName": "string",
  "eventDate": "YYYY-MM-DD",
  "eventEndTime": "HH:MM",
  "numberOfMembers": number,
  "members": [
    {
      "id": "string",
      "name": "string",
      "interest": "string",
      "progress": number,
      "tasks": [
        {
          "id": "string",
          "description": "string",
          "fileName": "string (optional)",
          "completed": boolean
        }
      ]
    }
  ],
  "projectData": {
    "problemStatement": "string",
    "explanation": "string",
    "whatIs": "string",
    "whyNeeded": "string",
    "whereUsed": "string",
    "roadmap": ["string"]
  },
  "overallProgress": number
}
```

---

### 3. AI Generation Endpoint

#### Generate Project Roadmap
```
POST /api/ai/generate-project
```

**Request Body:**
```json
{
  "teamId": "string",
  "problemStatement": "string",
  "members": [
    {
      "name": "string",
      "interest": "string"
    }
  ]
}
```

**Success Response:**
```json
{
  "problemStatement": "string (refined)",
  "explanation": "string",
  "whatIs": "string",
  "whyNeeded": "string",
  "whereUsed": "string",
  "roadmap": ["string"],
  "members": [
    {
      "id": "string",
      "name": "string",
      "interest": "string",
      "tasks": [
        {
          "id": "string",
          "description": "string",
          "fileName": "string (optional)",
          "completed": false
        }
      ]
    }
  ]
}
```

---

### 4. Task Management Endpoints

#### Get Tasks
```
GET /api/task/:teamId
```

**Success Response:**
```json
{
  "teamId": "string",
  "members": [
    {
      "id": "string",
      "name": "string",
      "tasks": [
        {
          "id": "string",
          "description": "string",
          "fileName": "string (optional)",
          "completed": boolean
        }
      ]
    }
  ]
}
```

#### Complete Task
```
POST /api/task/complete
```

**Request Body:**
```json
{
  "teamId": "string",
  "memberId": "string",
  "taskId": "string"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Task updated successfully"
}
```

---

## Error Responses

All endpoints should return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (incorrect credentials)
- `404` - Not Found (team/resource doesn't exist)
- `500` - Internal Server Error

---

## Implementation Notes

### Authentication
- Store team passwords securely (use bcrypt or similar)
- Validate team name uniqueness
- Generate unique team IDs (UUID recommended)

### AI Generation
- Use OpenAI API or similar for generating project data
- Generate tasks based on member roles (Frontend, Backend, etc.)
- Create 3-5 tasks per member
- Include file names where applicable (e.g., "auth.js", "Login.tsx")

### Progress Calculation
- Member progress = (completed tasks / total tasks) × 100
- Overall progress = average of all member progress values

### Data Persistence
- Store team data in database (MongoDB, PostgreSQL, etc.)
- Support real-time updates
- Consider WebSocket for live updates (optional)

### CORS Configuration
Make sure to enable CORS in your backend:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // or your frontend URL
  credentials: true
}));
```

---

## Testing Your Backend

Use this sample request flow to test your endpoints:

1. **Create Team**
   ```bash
   curl -X POST http://localhost:3000/api/auth/create-team \
     -H "Content-Type: application/json" \
     -d '{
       "teamName": "Test Team",
       "password": "test123",
       "leadName": "John Doe",
       "eventName": "Hackathon 2026",
       "eventDate": "2026-03-15",
       "eventEndTime": "18:00",
       "numberOfMembers": 4
     }'
   ```

2. **Generate AI Roadmap**
   ```bash
   curl -X POST http://localhost:3000/api/ai/generate-project \
     -H "Content-Type: application/json" \
     -d '{
       "teamId": "team-123",
       "problemStatement": "Build a task management app",
       "members": [
         {"name": "Alice", "interest": "Frontend"},
         {"name": "Bob", "interest": "Backend"}
       ]
     }'
   ```

3. **Get Team Data**
   ```bash
   curl http://localhost:3000/api/team/team-123
   ```

4. **Complete Task**
   ```bash
   curl -X POST http://localhost:3000/api/task/complete \
     -H "Content-Type: application/json" \
     -d '{
       "teamId": "team-123",
       "memberId": "member-1",
       "taskId": "task-1"
     }'
   ```

---

## Environment Variables

Your backend should use these environment variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ai-team-manager
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
```

---

## Need Help?

If you encounter any issues integrating the backend:
1. Check the browser console for API errors
2. Verify CORS is enabled on your backend
3. Ensure all endpoints return JSON responses
4. Test endpoints with Postman or cURL first
5. Check that your backend is running on the correct port
