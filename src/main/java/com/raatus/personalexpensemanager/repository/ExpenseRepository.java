package com.raatus.personalexpensemanager.repository;

import com.raatus.personalexpensemanager.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
