package com.example.satoruquizzes.satoquiz.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Validations")
@IdClass(ValidationId.class)
public class Validation {


    @Id
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @Id
    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @JsonIgnore
    private double points;


}