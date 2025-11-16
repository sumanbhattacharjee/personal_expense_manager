# Frontend README

## Installation

```bash
cd frontend
npm install
```

## Running the Application

Start the Spring Boot backend first:

```bash
# From project root
mvn spring-boot:run
```

Then start the React frontend in a new terminal:

```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000` and communicate with the backend at `http://localhost:8080/api`.

## Features

### Categories
- View all categories
- Create new categories
- Edit existing categories
- Delete categories

### Expenses
- View all expenses with their associated categories
- Create new expenses (linked to a category)
- Edit existing expenses
- Delete expenses
- Search/filter by category, amount, and date

## Architecture

- **Frontend**: React with Axios for API calls
- **Backend**: Spring Boot with JPA repositories
- **Communication**: REST API with CORS enabled
- **Database**: H2 (in-memory for development)

## Components

- `App.js`: Main application component with layout
- `CategoryManager.js`: CRUD operations for categories
- `ExpenseManager.js`: CRUD operations for expenses
- `services/api.js`: Centralized API client

## Styling

Basic CSS files provided for each component with responsive design support.
