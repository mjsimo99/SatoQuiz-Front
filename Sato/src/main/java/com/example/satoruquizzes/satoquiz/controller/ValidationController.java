package com.example.satoruquizzes.satoquiz.controller;


import com.example.satoruquizzes.satoquiz.model.dto.ValidationDTO;
import com.example.satoruquizzes.satoquiz.model.entity.Validation;
import com.example.satoruquizzes.satoquiz.service.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/validations")
public class ValidationController {

    @Autowired
    private ValidationService validationService;

    @PostMapping("/add")
    public ResponseEntity<Validation> addValidation(@RequestBody ValidationDTO validationDTO) {
        Validation savedValidation = validationService.save(validationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedValidation);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Validation>> getAllValidations() {
        List<Validation> validations = validationService.getAllValidations();
        return ResponseEntity.ok(validations);
    }

    @GetMapping("/{questionId}/{answerId}")
    public ResponseEntity<Validation> getValidationByIds(
            @PathVariable Long questionId,
            @PathVariable Long answerId) {
        Validation validation = validationService.getValidationByIds(questionId, answerId);
        return ResponseEntity.ok(validation);
    }

    @PutMapping("/update/{questionId}/{answerId}")
    public ResponseEntity<Validation> updateValidation(
            @PathVariable Long questionId,
            @PathVariable Long answerId,
            @RequestBody ValidationDTO updatedValidationDTO) {
        Validation updatedValidation = validationService.updateValidation(questionId, answerId, updatedValidationDTO);
        return ResponseEntity.ok(updatedValidation);
    }

}