package com.raatus.personalexpensemanager.controller;

import com.raatus.personalexpensemanager.dto.ExpenseRequest;
import com.raatus.personalexpensemanager.model.Expense;
import com.raatus.personalexpensemanager.service.ExpenseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> list() {
        return expenseService.findAll();
    }

    @GetMapping("/{id}")
    public Expense get(@PathVariable Long id) {
        return expenseService.findById(id);
    }

    @PostMapping
    public ResponseEntity<Expense> create(@RequestBody ExpenseRequest req) {
        Expense saved = expenseService.create(req);
        return ResponseEntity.created(URI.create("/api/expenses/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @RequestBody ExpenseRequest req) {
        return expenseService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        expenseService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
