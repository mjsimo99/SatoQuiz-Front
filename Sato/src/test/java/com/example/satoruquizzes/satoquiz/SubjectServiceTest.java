package com.example.satoruquizzes.satoquiz;


import com.example.satoruquizzes.satoquiz.exception.NotFoundException;
import com.example.satoruquizzes.satoquiz.model.entity.Subject;
import com.example.satoruquizzes.satoquiz.repository.SubjectRepository;
import com.example.satoruquizzes.satoquiz.service.SubjectService;
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
class SubjectServiceTest {

    @Mock
    private SubjectRepository subjectRepository;

    @InjectMocks
    private SubjectService subjectService;

    @Test
    void testSaveSubject() {
        Subject subjectToSave = new Subject();
        Mockito.when(subjectRepository.save(subjectToSave)).thenReturn(subjectToSave);

        Subject savedSubject = subjectService.save(subjectToSave);

        Mockito.verify(subjectRepository, Mockito.times(1)).save(subjectToSave);
        assertNotNull(savedSubject);
        assertEquals(subjectToSave, savedSubject);
    }

    @Test
    void testGetAllSubjects() {
        List<Subject> subjects = Arrays.asList(new Subject(), new Subject());
        Mockito.when(subjectRepository.findAll()).thenReturn(subjects);

        List<Subject> result = subjectService.getAll();

        Mockito.verify(subjectRepository, Mockito.times(1)).findAll();
        assertEquals(2, result.size());
    }

    @Test
    void testGetSubjectById() {
        Long subjectId = 1L;
        Subject expectedSubject = new Subject();
        Mockito.when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(expectedSubject));

        Subject result = subjectService.getSubjectById(subjectId);

        Mockito.verify(subjectRepository, Mockito.times(1)).findById(subjectId);
        assertNotNull(result);
        assertEquals(expectedSubject, result);
    }

    @Test
    void testGetSubjectByIdNotFound() {
        Long subjectId = 1L;
        Mockito.when(subjectRepository.findById(subjectId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> subjectService.getSubjectById(subjectId));
    }

    @Test
    void testUpdateSubject() {
        Long subjectId = 1L;
        String newIntitule = "Updated Intitule";

        Subject existingSubject = new Subject();
        existingSubject.setIntitule("Original Intitule");

        Mockito.when(subjectRepository.findById(subjectId)).thenReturn(Optional.of(existingSubject));
        Mockito.when(subjectRepository.save(existingSubject)).thenReturn(existingSubject);

        Subject result = subjectService.updateSubject(subjectId, newIntitule);

        Mockito.verify(subjectRepository, Mockito.times(1)).findById(subjectId);
        Mockito.verify(subjectRepository, Mockito.times(1)).save(existingSubject);

        assertNotNull(result);
        assertEquals(newIntitule, result.getIntitule());
    }

    @Test
    void testDeleteSubject() {
        Long subjectId = 1L;
        subjectService.delete(subjectId);

        Mockito.verify(subjectRepository, Mockito.times(1)).deleteById(subjectId);
    }
}
