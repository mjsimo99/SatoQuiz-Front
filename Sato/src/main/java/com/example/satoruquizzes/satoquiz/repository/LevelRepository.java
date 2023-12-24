package com.example.satoruquizzes.satoquiz.repository;

import com.example.satoruquizzes.satoquiz.model.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface LevelRepository extends JpaRepository<Level, Long> {
}
