# Medimart — Medical Supplies E-Commerce

A full-stack clinical supplies e-commerce platform with **M-Pesa mobile payments**, **AI chatbot support**, **product management**, and **dark mode**.

**Live:** https://Polymerthcedric.github.io/Medimart  
**Backend API:** https://polymerthcedric.pythonanywhere.com/api  
**Backend Repo:** [Polymerthcedric/medimart-backend](https://github.com/Polymerthcedric/medimart-backend)

---

## Features

- **Product Catalog** — Browse medical supplies with live search, image carousel, and responsive grid layout
- **User Authentication** — Sign up / sign in with persistent session stored in localStorage; username displayed in navbar with logout dropdown
- **Admin Product Management** — Add new products (name, description, price, photo) directly from the frontend; delete products with confirmation modal
- **M-Pesa Payments** — STK push to Kenyan Safaricom phone numbers; auto-formats phone input to 254XXXXXXXXX; uses actual product amount
- **AI Chatbot** — Floating NLTK-based assistant for customer support queries
- **Dark Mode** — Toggle between light/dark themes persisted in localStorage; follows system preference by default
- **Responsive Design** — Mobile-first with hamburger navigation, touch-friendly cards
- **GitHub Actions CI/CD** — Auto-builds and deploys to GitHub Pages on every push to `main`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, React Router 7 (HashRouter), Tailwind CSS 3 |
| **Icons** | Lucide React |
| **HTTP Client** | Axios (multipart form data for uploads) |
| **State** | React Context (ThemeContext, AuthContext) |
| **Deployment** | GitHub Pages via `peaceiris/actions-gh-pages` |

## Getting Started

```bash
npm install
npm start
# Opens at http://localhost:3000
```

The app connects to the production backend by default. To use a local backend, update `src/api/apiService.js`:

```js
const BASE_URL = 'http://localhost:5000';
```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

Push to `main` — a GitHub Action automatically builds and deploys to the `gh-pages` branch.

Manual deploy:

```bash
npm run deploy
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signup` | Create account |
| POST | `/api/signin` | User login |
| POST | `/api/add_product` | Add product (multipart form with image) |
| GET | `/api/get_product_details` | List all products |
| POST | `/api/delete_product` | Delete a product by ID |
| POST | `/api/mpesa_payment` | Initiate M-Pesa STK push |
| POST | `/api/chat` | AI chatbot (JSON body) |

---

## Project Structure

```
src/
├── api/
│   └── apiService.js        # Axios client with all API calls
├── Components/
│   ├── Navbar.jsx            # Responsive nav with auth state
│   ├── GetProduct.jsx        # Product grid + search + delete
│   ├── AddProduct.jsx        # Admin product creation form
│   ├── MakePayment.jsx       # M-Pesa checkout page
│   ├── Signin.jsx / Signup.jsx
│   ├── Chatbot.jsx           # Floating AI assistant
│   ├── Carousel.jsx          # Image carousel
│   ├── ThemeContext.jsx      # Dark mode provider
│   └── ThemeToggle.jsx       # Dark mode switch
├── Context/
│   └── AuthContext.jsx       # Auth state + localStorage persistence
├── App.js                    # Root with providers + routing
└── index.js                  # Entry point
```

## Buttons & Icons

Delete product (hover over any product card → red Trash2 icon → confirmation modal). Requires the backend delete endpoint to be deployed.

---

*Built by [Fidel Cedric Odoyo](https://polymerthcedric.github.io/portfolio)*
