package com.raatus.personalexpensemanager.service;

import com.raatus.personalexpensemanager.exception.ResourceNotFoundException;
import com.raatus.personalexpensemanager.model.Category;
import com.raatus.personalexpensemanager.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + id));
    }

    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category updated) {
        Category existing = findById(id);
        existing.setName(updated.getName());
        return categoryRepository.save(existing);
    }

    public void delete(Long id) {
        Category existing = findById(id);
        categoryRepository.delete(existing);
    }
}
