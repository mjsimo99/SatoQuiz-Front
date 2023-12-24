package com.example.satoruquizzes.satoquiz.model.dto;

import lombok.Data;

@Data
public class SubjectDTO {

    private Long id;
    private String intitule;
    private SubjectDTO parent;
}