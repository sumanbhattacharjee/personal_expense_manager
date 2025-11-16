import React from 'react';
import { CategoryManager } from './components/CategoryManager';
import { ExpenseManager } from './components/ExpenseManager';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Personal Expense Manager</h1>
        <p>Manage your expenses and categories</p>
      </header>
      <main className="app-main">
        <CategoryManager />
        <ExpenseManager />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Personal Expense Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
