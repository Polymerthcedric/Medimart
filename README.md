# Medimart — Medical Supplies E-Commerce

A full-stack clinical supplies e-commerce platform with **M-Pesa mobile payments**, **AI chatbot support**, and **dark mode**. Frontend built with React 19, backend powered by Django REST API.

🔗 **Live:** https://Polymerthcedric.github.io/Medimart

## Features

- **Product Catalog** — Browse medical supplies with live search and image carousel
- **User Authentication** — Sign up / sign in with session persistence
- **Add Products** — Submit new products with name, description, price, and photo
- **M-Pesa Payments** — Send STK push to Kenyan phone numbers for checkout
- **AI Chatbot** — Floating assistant for customer support queries
- **Dark Mode** — Toggle between light and dark themes (persisted in localStorage)
- **Responsive Design** — Mobile-first with hamburger navigation
- **GitHub Pages Deploy** — One-command deployment via `gh-pages`

## Tech Stack

| | |
|---|---|
| **Frontend** | React 19, React Router 7, Tailwind CSS 3 |
| **HTTP Client** | Axios |
| **Icons** | Lucide React |
| **Backend** | Django REST API (PythonAnywhere) |
| **Deployment** | GitHub Pages via `gh-pages` |

## Getting Started

```bash
npm install
npm start            # → http://localhost:3000
```

### Backend API

The app connects to a Django REST API at:
`https://polymerthcedric.pythonanywhere.com/api`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/get_product_details` | GET | Fetch all products |
| `/api/add_product` | POST | Add a new product |
| `/api/mpesa_payment` | POST | Initiate M-Pesa STK push |
| `/api/signin` | POST | User login |
| `/api/signup` | POST | User registration |
| `/api/chat` | POST | AI chatbot message |

### Deploy

```bash
npm run deploy        # builds + pushes to gh-pages branch
```

## License

MIT
