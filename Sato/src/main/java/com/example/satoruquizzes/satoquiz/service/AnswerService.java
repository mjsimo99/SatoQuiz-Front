package com.example.satoruquizzes.satoquiz.service;

import com.example.satoruquizzes.satoquiz.exception.NotFoundException;
import com.example.satoruquizzes.satoquiz.model.dto.AnswerDTO;
import com.example.satoruquizzes.satoquiz.model.entity.Answer;
import com.example.satoruquizzes.satoquiz.repository.AnswerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private ModelMapper modelMapper;

    public AnswerDTO save(AnswerDTO answerDTO) {
        Answer answer = modelMapper.map(answerDTO, Answer.class);
        answer = answerRepository.save(answer);
        return modelMapper.map(answer, AnswerDTO.class);
    }

    public List<AnswerDTO> getAllAnswers() {
        List<Answer> answers = answerRepository.findAll();
        return answers.stream()
                .map(answer -> modelMapper.map(answer, AnswerDTO.class))
                .collect(Collectors.toList());
    }

    public AnswerDTO getAnswerById(Long answerId) {
        Answer answer = answerRepository.findById(answerId).orElse(null);
        return modelMapper.map(answer, AnswerDTO.class);
    }

    public AnswerDTO update(Long answerId, AnswerDTO updatedAnswerDTO) {
        Optional<Answer> existingAnswer = answerRepository.findById(answerId);

        if (existingAnswer.isPresent()) {
            Answer answerToUpdate = existingAnswer.get();
            answerToUpdate.setAnswerText(updatedAnswerDTO.getAnswerText());

            answerToUpdate = answerRepository.save(answerToUpdate);
            return modelMapper.map(answerToUpdate, AnswerDTO.class);
        } else {
            throw new NotFoundException("Answer not found for id: " + answerId);
        }
    }

    public void deleteAnswer(Long answerId) {
        answerRepository.deleteById(answerId);
    }
}