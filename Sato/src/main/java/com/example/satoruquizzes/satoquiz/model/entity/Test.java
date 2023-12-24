package com.example.satoruquizzes.satoquiz.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "Tests")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testId;
    private String successScore;
    private boolean viewAnswer;
    private Boolean viewResult;
    private Integer maxAttempt;
    private String remark;
    private String instructions;
}
