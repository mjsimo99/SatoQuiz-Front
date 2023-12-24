package com.example.satoruquizzes.satoquiz.repository;


import com.example.satoruquizzes.satoquiz.model.entity.Validation;
import com.example.satoruquizzes.satoquiz.model.entity.ValidationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidationRepository extends JpaRepository<Validation, ValidationId> {
}