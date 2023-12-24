package com.example.satoruquizzes.satoquiz.repository;

import com.example.satoruquizzes.satoquiz.model.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {
}