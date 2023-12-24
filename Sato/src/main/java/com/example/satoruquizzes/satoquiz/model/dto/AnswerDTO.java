package com.example.satoruquizzes.satoquiz.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class AnswerDTO {

    private Long answerId;
    private String answerText;
    private List<Long> validationIds;


}