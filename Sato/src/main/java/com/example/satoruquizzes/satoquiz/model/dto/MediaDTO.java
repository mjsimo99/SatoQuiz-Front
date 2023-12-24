package com.example.satoruquizzes.satoquiz.model.dto;

import com.example.satoruquizzes.satoquiz.model.enums.MediaType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
public class MediaDTO {
    private Long mediaId;
    private String link;
    private MediaType type;


    // @JsonProperty("questionDTO")
    // private QuestionDTO questionDTO;
}