package com.example.satoruquizzes.satoquiz.controller;

import com.example.satoruquizzes.satoquiz.model.dto.SubjectDTO;
import com.example.satoruquizzes.satoquiz.model.entity.Subject;
import com.example.satoruquizzes.satoquiz.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @PostMapping("/add")
    public ResponseEntity<SubjectDTO> addSubject(@RequestBody SubjectDTO subjectDTO) {
        SubjectDTO savedSubjectDTO = subjectService.save(subjectDTO);
        return ResponseEntity.ok(savedSubjectDTO);
    }

    @GetMapping("/all")
    public List<SubjectDTO> getAllSubjects() {
        return subjectService.getAll();
    }

    @GetMapping("/{subjectId}")
    public ResponseEntity<SubjectDTO> getSubjectById(@PathVariable Long subjectId) {
        SubjectDTO subjectDTO = subjectService.getSubjectById(subjectId);
        return ResponseEntity.ok(subjectDTO);
    }

    @PutMapping("/{subjectId}")
    public ResponseEntity<SubjectDTO> updateSubject(@PathVariable Long subjectId, @RequestBody SubjectDTO updatedSubjectDTO) {
        SubjectDTO updatedSubject = subjectService.update(subjectId, updatedSubjectDTO);
        return ResponseEntity.ok(updatedSubject);
    }

    @DeleteMapping("/{subjectId}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long subjectId) {
        subjectService.delete(subjectId);
        return ResponseEntity.noContent().build();
    }
}