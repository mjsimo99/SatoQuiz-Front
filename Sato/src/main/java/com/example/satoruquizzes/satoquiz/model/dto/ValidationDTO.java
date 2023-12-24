package com.example.satoruquizzes.satoquiz.model.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ValidationDTO {
    private Long answerId;
    private Long questionId;
    private double points;
}