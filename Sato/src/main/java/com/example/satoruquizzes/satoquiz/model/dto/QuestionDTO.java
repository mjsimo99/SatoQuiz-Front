package com.example.satoruquizzes.satoquiz.model.dto;

import com.example.satoruquizzes.satoquiz.model.enums.TypeAnswer;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
public class QuestionDTO {

    private Long questionId;
    private int answersNumber;
    private int answersNumberCorrect;
    private String text;
    private LocalTime duration;
    private TypeAnswer type;
    private double scorePoints;
    /*
      private SubjectDTO subjectDTO;
      private LevelDTO levelDTO;
     */
    private Long subjectId;
    private Long levelId;

    private List<MediaDTO> mediaList;


}