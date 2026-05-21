# 🏟️ BookNPlay — Smart Sports Facility Booking

> Discover, book, and manage premium sports facilities with ease.

---

## 🎯 Purpose

**BookNPlay** is a full-stack sports facility booking platform that eliminates the friction of manual reservations. Whether you're looking to book a cricket ground, football arena, swimming pool, or badminton court — BookNPlay lets you find the perfect facility, check real-time availability, and confirm your booking in seconds. Facility owners can list and manage their venues through a clean, modern dashboard.

---

## 🌐 Live URL

🔗 **[https://book-n-play.vercel.app](https://book-n-play.vercel.app)**

---

## ✨ Features

### 👤 Authentication
- Email & password registration and login
- Google OAuth one-click sign-in
- Secure session management via Better Auth
- Account linking for users who register with multiple methods

### 🏟️ Facilities
- Browse all available sports facilities with images, pricing, and details
- Search and filter by sport type, location, and availability
- Detailed facility page with hero image, stats, description, and opening hours

### 📅 Booking System
- Select booking date, time slot, and duration
- Live total price calculation based on hours × price per hour
- Booking saved with `status: "pending"` by default
- Success confirmation screen after booking

### 📋 My Bookings Dashboard
- View all personal bookings in one place
- Track booking status (Pending / Approved)
- Cancel any booking instantly
- Stats overview — total, pending, and approved counts

### 🛠️ Facility Management
- Add new sports facilities with full details and image URL
- Edit existing facility details via a smooth modal form
- Delete facilities with a confirmation prompt
- Manage all your own facilities from a private dashboard

### 🔒 Private Routes
- My Bookings, Add Facility, and Manage My Facilities are protected
- Unauthenticated users are redirected to login

### 🎨 UI & UX
- Fully responsive — mobile, tablet, and desktop
- Modern green-themed design consistent across all pages
- Smooth hover effects, animated loading states, and toast notifications
- Trust badges and social proof on booking form

---

## 📦 NPM Packages Used

### 🖥️ Frontend — Next.js

| Package | Purpose |
|---|---|
| `next` | React framework with App Router and server components |
| `react` / `react-dom` | Core React library |
| `@heroui/react` | UI component library — buttons, modals, selects, separators |
| `better-auth` | Authentication — email/password + Google OAuth |
| `tailwindcss` | Utility-first CSS framework |
| `lucide-react` | Clean SVG icon library |
| `react-icons` | Extended icon packs — BiArrowBack, LuMapPin, PiCalendarBold, FcGoogle |
| `react-hot-toast` | Elegant toast notification system |

### ⚙️ Backend — Express

| Package | Purpose |
|---|---|
| `express` | Node.js HTTP server and routing |
| `mongodb` | Official MongoDB Node.js driver |
| `dotenv` | Loads environment variables from `.env` |
| `cors` | Enables cross-origin requests from the Next.js frontend |

---

## 🚀 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/cseanwar/BookNPlay.git
cd booknplay
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Start the Express API server

```bash
cd server
node index.js
# Server running on http://localhost:5000
```

### 5. Start the Next.js dev server

```bash
npm run dev
# App running on http://localhost:3000
```

---

## 🗂️ Project Structure

```
booknplay/
├── src/
│   ├── app/
│   │   ├── page.jsx                    # Home page
│   │   ├── facilities/
│   │   │   ├── page.jsx                # All facilities listing
│   │   │   └── [id]/page.jsx           # Facility details + booking
│   │   ├── my-bookings/page.jsx        # User booking dashboard
│   │   ├── add-facility/page.jsx       # Add new facility (private)
│   │   ├── manage-my-facilities/       # Manage facilities (private)
│   │   ├── login/page.jsx              # Login page
│   │   └── register/page.jsx           # Register page
│   ├── components/
│   │   ├── BookingCard.jsx             # Booking form with live pricing
│   │   ├── EditFacilityModal.jsx       # Edit facility modal
│   │   ├── DeleteFacility.jsx          # Delete confirmation
│   │   ├── Navbar.jsx                  # Responsive navbar with profile dropdown
│   │   ├── NavLink.jsx                 # Active-aware nav link
│   │   └── FacilityCard.jsx            # Facility listing card
│   └── lib/
│       ├── auth.js                     # Better Auth server config
│       └── auth-client.js              # Better Auth client config
└── server/
    └── index.js                        # Express + MongoDB REST API
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/facilities` | Get all facilities |
| `GET` | `/facilities/:id` | Get single facility |
| `POST` | `/facilities` | Add new facility |
| `PATCH` | `/facilities/:id` | Update facility |
| `DELETE` | `/facilities/:id` | Delete facility |
| `POST` | `/booking` | Create a booking |
| `GET` | `/booking?email=` | Get bookings by user email |
| `DELETE` | `/booking/:id` | Cancel a booking |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).