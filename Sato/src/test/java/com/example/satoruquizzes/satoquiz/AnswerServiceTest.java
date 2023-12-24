package com.example.satoruquizzes.satoquiz;


import com.example.satoruquizzes.satoquiz.model.entity.Answer;
import com.example.satoruquizzes.satoquiz.repository.AnswerRepository;
import com.example.satoruquizzes.satoquiz.service.AnswerService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AnswerServiceTest {

    @Mock
    private AnswerRepository answerRepository;

    @InjectMocks
    private AnswerService answerService;

    @Test
    void testGetAllAnswers() {
        when(answerRepository.findAll()).thenReturn(List.of(new Answer(), new Answer()));

        List<Answer> result = answerService.getAllAnswers();

        assertEquals(2, result.size());
    }

    @Test
    void testSaveAnswer() {
        Answer answerToSave = new Answer();

        when(answerRepository.save(answerToSave)).thenReturn(answerToSave);

        Answer savedAnswer = answerService.save(answerToSave);

        assertNotNull(savedAnswer);
        assertEquals(answerToSave, savedAnswer);
    }

    @Test
    void testGetAnswerById() {
        long answerId = 1;
        Answer expectedAnswer = new Answer();

        when(answerRepository.findById(answerId)).thenReturn(Optional.of(expectedAnswer));

        Answer result = answerService.getAnswerById(answerId);

        assertNotNull(result);
        assertEquals(expectedAnswer, result);
    }

    @Test
    void testDeleteAnswer() {
        long answerId = 1;
        answerService.deleteAnswer(answerId);

        verify(answerRepository, times(1)).deleteById(answerId);
    }
}
