package com.example.satoruquizzes.satoquiz.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "TestQuestions")
@IdClass(TestQuestion.TestQuestionId.class)
public class TestQuestion implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "test_id")
    private Test test;

    @Id
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private double score;

    public static class TestQuestionId implements Serializable {
        private Test test;
        private Question question;

    }
}
