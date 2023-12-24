package com.example.satoruquizzes.satoquiz.service;

import com.example.satoruquizzes.satoquiz.exception.NotFoundException;
import com.example.satoruquizzes.satoquiz.model.dto.LevelDTO;
import com.example.satoruquizzes.satoquiz.model.entity.Level;
import com.example.satoruquizzes.satoquiz.repository.LevelRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LevelService {

    @Autowired
    private LevelRepository levelRepository;

    @Autowired
    private ModelMapper modelMapper;

    public LevelDTO save(LevelDTO levelDTO) {
        Level level = modelMapper.map(levelDTO, Level.class);
        level = levelRepository.save(level);
        return modelMapper.map(level, LevelDTO.class);
    }

    public List<LevelDTO> getAll() {
        List<Level> levels = levelRepository.findAll();
        return levels.stream()
                .map(level -> modelMapper.map(level, LevelDTO.class))
                .collect(Collectors.toList());
    }

    public LevelDTO getById(Long id) {
        Level level = levelRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Level not found for id: " + id));
        return modelMapper.map(level, LevelDTO.class);
    }

    public LevelDTO update(Long id, LevelDTO newLevelDTO) {
        Level existingLevel = levelRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Level not found for id: " + id));

        existingLevel.setDescription(newLevelDTO.getDescription());
        existingLevel.setMaxPoints(newLevelDTO.getMaxPoints());
        existingLevel.setMinPoints(newLevelDTO.getMinPoints());

        return modelMapper.map(levelRepository.save(existingLevel), LevelDTO.class);
    }

    public void delete(Long id) {
        levelRepository.deleteById(id);
    }
}