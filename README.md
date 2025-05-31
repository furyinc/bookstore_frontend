# 📘 Bookstore Frontend — React + Vite

This is the **frontend** of the Bookstore web application, built with **React** and **Vite** for lightning-fast development. It communicates with a Node.js/Express backend via RESTful APIs to deliver a seamless book shopping experience.

## 🚀 Features

- ⚡ Fast builds & HMR using Vite
- 🧠 Functional React components
- 🛒 Fully-featured cart & wishlist
- 🔐 Authentication with JWT
- 📦 Axios for API communication
- 🎯 Project-structured for scalability
- 🎨 Responsive UI ready for production

## 📂 Project Structure

```

/public             → Static assets
/src
/components       → Reusable UI components
/pages            → Route pages (Home, BookDetails, etc.)
/context          → Auth and Cart context providers
/utils            → Axios config and helpers
main.jsx          → App entry
App.jsx           → Main app wrapper

````

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [Context API](https://reactjs.org/docs/context.html)

## 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/bookstore-frontend.git
cd bookstore-frontend

# Install dependencies
npm install

# Start development server
npm run dev
````

The frontend will be served at `http://localhost:5173`

> ⚠️ **Make sure the backend server is also running** and API URLs are correctly configured in your `.env` file.

## 🧾 Environment Variables

Create a `.env` file in the root with:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

> Adjust the API base URL according to your backend settings.

## 📑 Linting & Formatting

* ESLint rules are pre-configured
* Add your own rules in `.eslintrc` if needed

## 📄 License

This project is open-source under the [MIT License](LICENSE).

---

Built with 💙 by \[S.Anvar]

```