package com.example.satoruquizzes.satoquiz.controller;


import com.example.satoruquizzes.satoquiz.model.dto.QuestionDTO;
import com.example.satoruquizzes.satoquiz.model.entity.Question;
import com.example.satoruquizzes.satoquiz.service.QuestionService;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;


    @PostMapping("/add")
    public ResponseEntity<QuestionDTO> addQuestion(@RequestBody QuestionDTO questionDTO) {
        QuestionDTO savedQuestionDTO = questionService.save(questionDTO);
        return ResponseEntity.ok(savedQuestionDTO);
    }

    @PostMapping("/add-with-media")
    public ResponseEntity<QuestionDTO> addQuestionWithMedia(@RequestBody QuestionDTO questionDTO) {
        QuestionDTO savedQuestionDTO = questionService.saveWithMedia(questionDTO);
        return ResponseEntity.ok(savedQuestionDTO);
    }

    @GetMapping("/all")
    public List<QuestionDTO> getAllQuestions() {
        return questionService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        QuestionDTO questionDTO = questionService.getById(id);
        return ResponseEntity.ok(questionDTO);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<QuestionDTO> updateQuestion(@PathVariable Long id, @RequestBody QuestionDTO questionDTO) {
        QuestionDTO updatedQuestionDTO = questionService.update(id, questionDTO);
        return ResponseEntity.ok(updatedQuestionDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}