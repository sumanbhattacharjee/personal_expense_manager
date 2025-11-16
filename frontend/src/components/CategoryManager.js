import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import './CategoryManager.css';

export function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.categories.getAll();
      setCategories(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch categories: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      if (editingId) {
        await api.categories.update(editingId, formData);
      } else {
        await api.categories.create(formData);
      }
      setFormData({ name: '' });
      setEditingId(null);
      setError('');
      fetchCategories();
    } catch (err) {
      setError('Failed to save category: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await api.categories.delete(id);
      fetchCategories();
    } catch (err) {
      setError('Failed to delete category: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleCancel = () => {
    setFormData({ name: '' });
    setEditingId(null);
  };

  return (
    <div className="category-manager">
      <h2>Categories</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Category name"
          value={formData.name}
          onChange={(e) => setFormData({ name: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Category</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(cat)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(cat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
