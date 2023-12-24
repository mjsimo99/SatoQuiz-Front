package com.example.satoruquizzes.satoquiz.model.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class ValidationId implements Serializable {

    private Long question;
    private Long answer;


}