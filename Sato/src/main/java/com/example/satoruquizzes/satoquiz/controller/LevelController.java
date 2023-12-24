package com.example.satoruquizzes.satoquiz.controller;

import com.example.satoruquizzes.satoquiz.model.dto.LevelDTO;
import com.example.satoruquizzes.satoquiz.model.entity.Level;
import com.example.satoruquizzes.satoquiz.service.LevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/levels")
public class LevelController {

    @Autowired
    private LevelService levelService;

    @PostMapping("/add")
    public ResponseEntity<LevelDTO> addLevel(@RequestBody LevelDTO levelDTO) {
        LevelDTO savedLevelDTO = levelService.save(levelDTO);
        return ResponseEntity.ok(savedLevelDTO);
    }

    @GetMapping("/all")
    public List<LevelDTO> getAllLevels() {
        return levelService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LevelDTO> getLevelById(@PathVariable Long id) {
        LevelDTO levelDTO = levelService.getById(id);
        return ResponseEntity.ok(levelDTO);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<LevelDTO> updateLevel(@PathVariable Long id, @RequestBody LevelDTO levelDTO) {
        LevelDTO updatedLevelDTO = levelService.update(id, levelDTO);
        return ResponseEntity.ok(updatedLevelDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLevel(@PathVariable Long id) {
        levelService.delete(id);
        return ResponseEntity.noContent().build();
    }
}