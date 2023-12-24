package com.example.satoruquizzes.satoquiz.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "AssignTests")
public class AssignTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long AssignTestId;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private String raison;
    private double score;
    private Integer attemptNumber;
    private double finalResult;

}


