#AI-CV Maker Website

Welcome to the CV Maker Website repository! This project leverages advanced AI tools and modern web development frameworks to create a user-friendly platform for generating professional CVs. Below, you'll find an overview of the technologies used, how to set up the project, and other relevant information.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## Features

- AI-powered CV generation using Gemini AI
- User-friendly interface
- Customizable templates
- Secure data handling
- Fast and responsive design

## Technologies Used

- **Frontend:**
  - [Vite](https://vitejs.dev/)
  - [React](https://reactjs.org/)
  - [Next.js](https://nextjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcn UI](https://shadcn.dev/)
- **Backend:**
  - [Strapi](https://strapi.io/)
  - [MySQL](https://www.mysql.com/)
- **AI Service:**
  - [Gemini AI](https://gemini.ai/)

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)
- MySQL
- Gemini AI API key
- Vercel account for database hosting

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Lansarbac2020/ai-cv-maker.git
    cd ai-cv-maker
    ```

4. **Set up MySQL database on Vercel:**
    - Log in to your Vercel account.
    - Create a new MySQL database from the Vercel dashboard.
    - Note the database credentials provided by Vercel (host, username, password, database name).

5. **Configure Strapi to connect to Vercel MySQL database:**
    - Update the database configuration in  strapi with your Vercel MySQL credentials:
      ```js
      module.exports = ({ env }) => ({
        connection: {
          client: 'mysql',
          connection: {
            host: env('DATABASE_HOST', 'your-vercel-database-host'),
            port: env.int('DATABASE_PORT', 3306),
            database: env('DATABASE_NAME', 'your-database-name'),
            user: env('DATABASE_USERNAME', 'your-database-username'),
            password: env('DATABASE_PASSWORD', 'your-database-password'),
            ssl: env.bool('DATABASE_SSL', true),
          },
        },
      });
      ```

6. **Configure Gemini AI:**
    - Obtain your Gemini AI API key from [Gemini AI](https://gemini.ai/).
    - Create a `.env` file in the `backend` directory and add your API key
     

7. **Run the backend (strapi) server:**
    ```sh
    npm run develop
    ```

8. **Run the frontend server:**
    ```sh 
    npm run dev
    ```

## Usage

1. **Access the website:**
    Open your browser and navigate to `https://aicvmaker.vercel.app/`.

2. **Generate a CV:**
    - Fill the fields with information to generate your CV and save the process
    - Customize the theme color,
    - Download or save your CV.
    - Use the "Generate With AI" option to generate suggestions for descriptions

## Contributing

All contributions are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.


## Contact

- **Author:** Lansar
- **Email:** lansarbacoro@gmail.com
- **GitHub:** [Lansarbac2020](https://github.com/Lansarbac2020)

---

Feel free to open issues or submit pull requests to improve the project. Thank you for your interest in the CV Maker with ai Website!
