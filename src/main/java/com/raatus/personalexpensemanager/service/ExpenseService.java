package com.raatus.personalexpensemanager.service;

import com.raatus.personalexpensemanager.dto.ExpenseRequest;
import com.raatus.personalexpensemanager.exception.ResourceNotFoundException;
import com.raatus.personalexpensemanager.model.Category;
import com.raatus.personalexpensemanager.model.Expense;
import com.raatus.personalexpensemanager.repository.CategoryRepository;
import com.raatus.personalexpensemanager.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseService(ExpenseRepository expenseRepository, CategoryRepository categoryRepository) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Expense> findAll() {
        return expenseRepository.findAll();
    }

    public Expense findById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found: " + id));
    }

    public Expense create(ExpenseRequest req) {
        Expense e = new Expense();
        e.setDescription(req.getDescription());
        e.setAmount(req.getAmount());
        e.setDate(req.getDate());
        if (req.getCategoryId() != null) {
            Category c = categoryRepository.findById(req.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + req.getCategoryId()));
            e.setCategory(c);
        }
        return expenseRepository.save(e);
    }

    public Expense update(Long id, ExpenseRequest req) {
        Expense existing = findById(id);
        existing.setDescription(req.getDescription());
        existing.setAmount(req.getAmount());
        existing.setDate(req.getDate());
        if (req.getCategoryId() != null) {
            Category c = categoryRepository.findById(req.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + req.getCategoryId()));
            existing.setCategory(c);
        } else {
            existing.setCategory(null);
        }
        return expenseRepository.save(existing);
    }

    public void delete(Long id) {
        Expense existing = findById(id);
        expenseRepository.delete(existing);
    }
}
