# Venuora — Professional & Clean

MERN Stack Admin Panel for an Event Registration Application.

## Stack

- MongoDB Atlas
- Express.js
- React.js
- Node.js
- Axios
- React Router

## Repository layout

```text
Venuora_Management_Platform/
├── frontend/
├── backend/
└── render.yaml
```

## Local setup

### Backend

```bash
cd backend
npm install
```

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/venuora?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

Start:

```bash
npm run dev
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The local frontend normally opens at:

```text
http://localhost:5173
```

## MongoDB Atlas

Create a test database named `venuora`. Create a dedicated exam/test database user and allow the IP address required by your deployment. Put the Atlas connection string in the Render environment variable `MONGODB_URI`.

Do not use personal production credentials.

## Render deployment

Create a new Web Service from the GitHub repository.

Use:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Add environment variables:

```text
MONGODB_URI = your MongoDB Atlas connection string
CLIENT_URL = your deployed Vercel frontend URL
PORT = 10000
```

Example:

```text
CLIENT_URL=https://your-project.vercel.app
```

## Vercel deployment

Import the repository into Vercel.

Set the project root directory to:

```text
frontend
```

Build command:

```text
npm run build
```

Output directory:

```text
dist
```

Add this environment variable:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```

The included `vercel.json` keeps React Router routes working after refresh.

## Features

- Event dashboard
- Event ID
- Event name
- Event date
- Venue
- Total registrations
- Add event
- Update event
- Delete event
- Responsive professional UI
- React routing
- Express REST APIs
- MongoDB Atlas persistence

## Important assessment note

The `.env` files included in this archive contain placeholders, not working database credentials. Before running the backend, replace `MONGODB_URI` in `backend/.env` with your own MongoDB Atlas connection string. Never commit `.env` files or share database passwords. If a real connection string was previously shared or uploaded, rotate its database password in MongoDB Atlas before using it again.

The frontend includes an error boundary so an unexpected React rendering error is shown on the page instead of leaving a silent blank screen. If the dashboard reports an API error, confirm that the backend is running and MongoDB is connected.
