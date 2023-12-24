package com.example.satoruquizzes.satoquiz.service;

import com.example.satoruquizzes.satoquiz.exception.NotFoundException;
import com.example.satoruquizzes.satoquiz.model.dto.SubjectDTO;
import com.example.satoruquizzes.satoquiz.model.entity.Subject;
import com.example.satoruquizzes.satoquiz.repository.SubjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ModelMapper modelMapper;

    public SubjectDTO save(SubjectDTO subjectDTO) {
        Subject subject = modelMapper.map(subjectDTO, Subject.class);
        return modelMapper.map(subjectRepository.save(subject), SubjectDTO.class);
    }
    /*
    public SubjectDTO save(SubjectDTO subjectDTO) {
        Subject subject = modelMapper.map(subjectDTO, Subject.class);

        if (subjectDTO.getParentId() != null) {
            Subject parent = subjectRepository.findById(subjectDTO.getParentId())
                    .orElseThrow(() -> new NotFoundException("Parent subject not found for ID: " + subjectDTO.getParentId()));
            subject.setParent(parent);
        }

        Subject savedSubject = subjectRepository.save(subject);
        return modelMapper.map(savedSubject, SubjectDTO.class);
    }

     */

    public List<SubjectDTO> getAll() {
        List<Subject> subjects = subjectRepository.findAll();
        return subjects.stream()
                .map(subject -> modelMapper.map(subject, SubjectDTO.class))
                .collect(Collectors.toList());
    }

    public SubjectDTO getSubjectById(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new NotFoundException("Subject not found for ID: " + subjectId));
        return modelMapper.map(subject, SubjectDTO.class);
    }

    public void delete(Long subjectId) {
        subjectRepository.deleteById(subjectId);
    }
    public SubjectDTO update(Long subjectId, SubjectDTO newSubjectDTO) {
        Subject existingSubject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new NotFoundException("Subject not found for ID: " + subjectId));

        existingSubject.setIntitule(newSubjectDTO.getIntitule());

        return modelMapper.map(subjectRepository.save(existingSubject), SubjectDTO.class);
    }



}