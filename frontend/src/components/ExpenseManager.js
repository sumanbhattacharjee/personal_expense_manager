import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import './ExpenseManager.css';

export function ExpenseManager() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    categoryId: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await api.expenses.getAll();
      setExpenses(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch expenses: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.categories.getAll();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.amount || !formData.date || !formData.categoryId) {
      setError('All fields are required');
      return;
    }

    try {
      const data = {
        description: formData.description,
        amount: parseFloat(formData.amount),
        date: formData.date,
        categoryId: parseInt(formData.categoryId),
      };

      if (editingId) {
        await api.expenses.update(editingId, data);
      } else {
        await api.expenses.create(data);
      }
      setFormData({ description: '', amount: '', date: '', categoryId: '' });
      setEditingId(null);
      setError('');
      fetchExpenses();
    } catch (err) {
      setError('Failed to save expense: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (expense) => {
    setFormData({
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      categoryId: expense.category?.id || '',
    });
    setEditingId(expense.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;
    try {
      await api.expenses.delete(id);
      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = () => {
    setFormData({ description: '', amount: '', date: '', categoryId: '' });
    setEditingId(null);
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : 'N/A';
  };

  return (
    <div className="expense-manager">
      <h2>Expenses</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'} Expense</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="expenses-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.id}</td>
                <td>{exp.description}</td>
                <td>${exp.amount?.toFixed(2)}</td>
                <td>{exp.date}</td>
                <td>{getCategoryName(exp.category?.id)}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(exp)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(exp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
