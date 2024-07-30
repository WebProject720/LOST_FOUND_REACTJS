## LOST_FOUND_FRONTEND

Welcome to the LOST_FOUND_FRONTEND repository. This is the frontend for the Lost & Found web application, built using Vite and React. This project is part of the MERN stack (MongoDB, Express, React, Node.js).

### Project Overview

This frontend project is designed to work with the backend server to create a lost and found system used by organizations. Users can report lost items and find messages from those who have found items. The frontend provides a user-friendly interface to interact with the backend services.

- **Backend Repository:** [LOST_FOUND_SERVER](https://github.com/WebProject720/LOST_FOUND_SERVER)
- **Demo:** [https://lostfound720.netlify.app/](https://lostfound720.netlify.app/)

### Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Dependencies](#dependencies)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

### Getting Started

These instructions will help you set up the frontend application on your local machine for development and testing purposes.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/WebProject720/LOST_FOUND_FRONTEND.git
   cd LOST_FOUND_FRONTEND
   ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) and [Vite](https://vitejs.dev/) installed. Then, run:

   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory and add the necessary environment variables. Example:

```plaintext
VITE_API_URL=http://localhost:3000/api
REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>
```

### Running the Application

Start the development server using the following command:

```bash
npm run dev
```

The application should now be running on `http://localhost:3000`.

### Dependencies

- `@react-oauth/google`: ^0.12.1
- `@reduxjs/toolkit`: ^2.2.6
- `@tinymce/tinymce-react`: ^5.1.1
- `axios`: ^1.7.2
- `dompurify`: ^3.1.6
- `html-react-parser`: ^5.1.10
- `js-cookie`: ^3.0.5
- `navigate`: ^0.3.6
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-hook-form`: ^7.52.1
- `react-redux`: ^9.1.2
- `react-router`: ^6.24.1
- `react-router-dom`: ^6.24.1
- `redux-persist`: ^6.0.0

### Styling

We use Tailwind CSS for styling. Make sure to install the necessary Tailwind CSS dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then, configure Tailwind in your `tailwind.config.js` and `src/index.css`:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Deployment

This frontend is deployed using Netlify. You can view the live demo at [https://lostfound720.netlify.app/](https://lostfound720.netlify.app/).

### Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/WebProject720) file for more details.
