package com.example.satoruquizzes.satoquiz.model.dto;

import lombok.Data;

@Data
public class LevelDTO {

    private Long id;
    private String description;
    private double maxPoints;
    private double minPoints;

}