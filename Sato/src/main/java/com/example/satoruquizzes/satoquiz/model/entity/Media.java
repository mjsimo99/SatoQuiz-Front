package com.example.satoruquizzes.satoquiz.model.entity;
import com.example.satoruquizzes.satoquiz.model.enums.MediaType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "Media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mediaId;
    private String link;
    private MediaType type;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;



}
