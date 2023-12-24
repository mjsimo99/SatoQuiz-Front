package com.example.satoruquizzes.satoquiz;

import com.example.satoruquizzes.satoquiz.exception.NotFoundException;
import com.example.satoruquizzes.satoquiz.model.entity.Question;
import com.example.satoruquizzes.satoquiz.repository.QuestionRepository;
import com.example.satoruquizzes.satoquiz.service.QuestionService;
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
class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @InjectMocks
    private QuestionService questionService;

    @Test
    void testSaveQuestion() {
        Question questionToSave = new Question();
        Mockito.when(questionRepository.save(questionToSave)).thenReturn(questionToSave);

        Question savedQuestion = questionService.save(questionToSave);

        Mockito.verify(questionRepository, Mockito.times(1)).save(questionToSave);
        assertNotNull(savedQuestion);
        assertEquals(questionToSave, savedQuestion);
    }

    @Test
    void testGetAllQuestions() {
        List<Question> questions = Arrays.asList(new Question(), new Question());
        Mockito.when(questionRepository.findAll()).thenReturn(questions);

        List<Question> result = questionService.getAll();

        Mockito.verify(questionRepository, Mockito.times(1)).findAll();
        assertEquals(2, result.size());
    }

    @Test
    void testGetQuestionById() {
        Long questionId = 1L;
        Question expectedQuestion = new Question();
        Mockito.when(questionRepository.findById(questionId)).thenReturn(Optional.of(expectedQuestion));

        Question result = questionService.getById(questionId);

        Mockito.verify(questionRepository, Mockito.times(1)).findById(questionId);
        assertNotNull(result);
        assertEquals(expectedQuestion, result);
    }

    @Test
    void testGetQuestionByIdNotFound() {
        Long questionId = 1L;
        Mockito.when(questionRepository.findById(questionId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> questionService.getById(questionId));
    }

    @Test
    void testUpdateQuestion() {
        Long questionId = 1L;
        Question existingQuestion = new Question();
        Question updatedQuestion = new Question();

        updatedQuestion.setAnswersNumber(4);
        updatedQuestion.setAnswersNumberCorrect(2);
        updatedQuestion.setText("Updated Question Text");
        // set other fields as needed

        Mockito.when(questionRepository.findById(questionId)).thenReturn(Optional.of(existingQuestion));
        Mockito.when(questionRepository.save(existingQuestion)).thenReturn(updatedQuestion);

        Question result = questionService.update(questionId, updatedQuestion);

        Mockito.verify(questionRepository, Mockito.times(1)).findById(questionId);
        Mockito.verify(questionRepository, Mockito.times(1)).save(existingQuestion);

        assertNotNull(result);
        assertEquals(updatedQuestion.getText(), result.getText());
        assertEquals(updatedQuestion.getAnswersNumber(), result.getAnswersNumber());
        assertEquals(updatedQuestion.getAnswersNumberCorrect(), result.getAnswersNumberCorrect());
    }

    @Test
    void testDeleteQuestion() {
        Long questionId = 1L;
        questionService.delete(questionId);

        Mockito.verify(questionRepository, Mockito.times(1)).deleteById(questionId);
    }
}
