# NEXORA — All-in-One E-Commerce Marketplace

NEXORA is a student e-commerce project that brings multiple shopping categories together in one place. This version is a front-end demo built with HTML, CSS and vanilla JavaScript.

## Features
- Responsive home page for desktop and mobile
- Multi-category product catalogue: Tech, Fashion, Home, Beauty, Accessories and Grocery
- Search by product name, category or description
- Category filtering and price sorting
- Add/remove products and change cart quantities
- Automatic cart count and subtotal calculation
- Cart persists in the same browser using `localStorage`
- Demo checkout form with order confirmation
- Newsletter form interaction
- Accessible labels and reduced-motion support

## Technology
- HTML5 for structure
- CSS3 for layout and responsive styling
- Vanilla JavaScript for interactions
- Browser `localStorage` for cart persistence

## Run the project
1. Download and extract this repository.
2. Open the `nexora-ecommerce` folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Try the search, category filters, sorting, cart and demo checkout.

## Files
- `index.html` — page structure and checkout dialog
- `style.css` — visual design and responsive layout
- `script.js` — product data and interactive behaviour
- `README.md` — project information and setup guide

## Important limitations
This is an educational front-end project. It does not include a server, real database, user authentication, inventory management or a payment gateway. Checkout is simulated and no payment is taken. Product photos load from Unsplash and require an internet connection. Cart contents are stored only in the current browser.

## Future scope
- Connect a backend API and database
- Add customer accounts and order history
- Add an admin panel for products and stock
- Add server-side validation
- Integrate a payment provider in test mode

## GitHub upload
Create a repository named `nexora-ecommerce`, then upload the files in this folder. Or, with Git installed, run:

```bash
git init
git add .
git commit -m "Build NEXORA e-commerce marketplace"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nexora-ecommerce.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.
