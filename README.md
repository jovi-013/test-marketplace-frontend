# Marketplace Frontend

React-based UI for the Marketplace API, providing a user-friendly experience for buyers and sellers to interact with the marketplace. This project is to fulfill the requirements of a recruitment process.

**Live Site URL:** `https://test-marketplace-frontend.vercel.app/`

---

## Tech Stack

* **Framework/Library:** React
* **Build Tool:** Vite
* **Styling:** MUI (Material-UI)
* **Routing:** React Router v6
* **State Management:** React Context API
* **API Communication:** Axios
* **Deployment:** Vercel

---

## Features

-   **User Authentication:** Login and registration flow with JWT.
-   **Dynamic UI:** Navbar and page access changes based on login status.
-   **Role-Based Routing:** Sellers are automatically redirected to their dashboard after login.
-   **Product Browse:** Buyers can view a list of all products.
-   **Seller Dashboard:** Sellers have a dashboard to see their current inventory and all orders.
-   **Direct Checkout:** Buyers can purchase an item directly from the product listing page.
-   **Real-time Feedback:** Notifications for successful or failed actions (like placing an order).

---

## Connects to API

This frontend application is powered by its corresponding backend service.

* **Live API URL:** `https://test-marketplace-backend-production.up.railway.app/`
* **Documentation:** `https://test-marketplace-backend-production.up.railway.app/docs`
* **Backend GitHub Repo:** `https://github.com/jovi-013/test-marketplace-backend`

---

## Setup and Local Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jovi-013/test-marketplace-frontend.git
    cd test-marketplace-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the environment file:**
    Create a file named `.env.local` in the root directory and add the following variable. This tells the frontend where to find the API in a local environment.
    
    ```.env.local
    VITE_API_URL="http://localhost:8000"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).