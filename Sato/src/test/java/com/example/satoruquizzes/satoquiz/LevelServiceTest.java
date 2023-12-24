package com.example.satoruquizzes.satoquiz;

import com.example.satoruquizzes.satoquiz.exception.NotFoundException;
import com.example.satoruquizzes.satoquiz.model.entity.Level;
import com.example.satoruquizzes.satoquiz.repository.LevelRepository;
import com.example.satoruquizzes.satoquiz.service.LevelService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class LevelServiceTest {

    @Mock
    private LevelRepository levelRepository;

    @InjectMocks
    private LevelService levelService;

    @Test
    void testSaveLevel() {
        Level levelToSave = new Level();
        Mockito.when(levelRepository.save(levelToSave)).thenReturn(levelToSave);

        Level savedLevel = levelService.save(levelToSave);

        Mockito.verify(levelRepository, Mockito.times(1)).save(levelToSave);
        assertNotNull(savedLevel);
        assertEquals(levelToSave, savedLevel);
    }

    @Test
    void testGetAllLevels() {
        List<Level> levels = Arrays.asList(new Level(), new Level());
        Mockito.when(levelRepository.findAll()).thenReturn(levels);

        List<Level> result = levelService.getAll();

        Mockito.verify(levelRepository, Mockito.times(1)).findAll();
        assertEquals(2, result.size());
    }

    @Test
    void testGetLevelById() {
        Long levelId = 1L;
        Level expectedLevel = new Level();
        Mockito.when(levelRepository.findById(levelId)).thenReturn(Optional.of(expectedLevel));

        Level result = levelService.getById(levelId);

        Mockito.verify(levelRepository, Mockito.times(1)).findById(levelId);
        assertNotNull(result);
        assertEquals(expectedLevel, result);
    }

    @Test
    void testGetLevelByIdNotFound() {
        Long levelId = 1L;
        Mockito.when(levelRepository.findById(levelId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> levelService.getById(levelId));
    }

    @Test
    void testUpdateLevel() {
        Long levelId = 1L;
        Level existingLevel = new Level();
        Level updatedLevel = new Level();

        updatedLevel.setDescription("Updated Description");
        updatedLevel.setMaxPoints(100);
        updatedLevel.setMinPoints(50);

        Mockito.when(levelRepository.findById(levelId)).thenReturn(Optional.of(existingLevel));
        Mockito.when(levelRepository.save(existingLevel)).thenReturn(updatedLevel);

        Level result = levelService.update(levelId, updatedLevel);

        Mockito.verify(levelRepository, Mockito.times(1)).findById(levelId);
        Mockito.verify(levelRepository, Mockito.times(1)).save(existingLevel);

        assertNotNull(result);
        assertEquals(updatedLevel.getDescription(), result.getDescription());
        assertEquals(updatedLevel.getMaxPoints(), result.getMaxPoints());
        assertEquals(updatedLevel.getMinPoints(), result.getMinPoints());
    }

    @Test
    void testDeleteLevel() {
        Long levelId = 1L;
        levelService.delete(levelId);

        Mockito.verify(levelRepository, Mockito.times(1)).deleteById(levelId);
    }
}
