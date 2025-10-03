# The Gold Star

A simple, **QR code–driven customer feedback system** that lets customers choose to share reviews **publicly or privately** — designed to be **transparent and Google-compliant**.  
This software is trusted by thousands of businesses.

---

## 🚀 Features

- **QR-Code Feedback** – Customers scan a code to share quick feedback.
- **Public or Private Reviews** – Users can choose whether their feedback is visible publicly or sent privately to the business.
- **Google-Compliant Publishing** – Fully compliant with Google’s review policies.
- **Modern UI/UX** – Smooth animations with [Framer Motion](https://www.framer.com/motion/) and responsive layouts using [Tailwind CSS](https://tailwindcss.com/).
- **Fast & Lightweight Frontend** – Built with [React + Vite](https://vitejs.dev/) for blazing-fast performance.
- **Secure Backend** – [Express.js](https://expressjs.com/) API with SQL persistence.
- **Admin Dashboard** – Manage reviews, view analytics, and moderate submissions.
- **Scalable Deployment** – Hosted on [Vercel](https://vercel.com/).

---

## 🛠️ Tech Stack

| Layer          | Technology Used              |
|----------------|------------------------------|
| Frontend       | React (Vite), Tailwind CSS, Framer Motion |
| Backend        | Express.js, REST APIs        |
| Database       | SQL (Postgres/MySQL compatible) |
| State & Forms  | React Hook Form, Zod, Redux Toolkit |
| Routing        | React Router DOM             |
| UI Components  | Radix-UI, Shadcn Components  |
| Animations     | Framer Motion                |
| Deployment     | Vercel                        |

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd vite_react_shadcn_ts



Install dependencies

npm install


Set up environment variables
Create a .env file in the root directory and configure:

DATABASE_URL=your_database_url
API_KEY=your_api_key


(Adjust as needed for your backend and third-party services.)

Run the development server

npm run dev


Build for production

npm run build


Preview production build locally

npm run preview

📂 Project Structure
vite_react_shadcn_ts/
├── public/            # Static assets
├── src/
│   ├── components/    # UI components
│   ├── pages/         # Page-level components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utility functions
│   ├── store/         # Redux store setup
│   └── styles/        # Tailwind + global CSS
├── .env.example       # Example environment variables
├── vite.config.ts     # Vite configuration
└── package.json
