package com.raatus.personalexpensemanager.repository;

import com.raatus.personalexpensemanager.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
