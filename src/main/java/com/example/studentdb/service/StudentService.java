package com.example.studentdb.service;

import com.example.studentdb.exception.ResourceNotFoundException;
import com.example.studentdb.model.Student;
import com.example.studentdb.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Create a new student
    public Student createStudent(Student student) {
        return studentRepository.insertStudent(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.getAllStudents();
    }

    // Get a single student by id
    public Student getStudentById(Integer id) {
        return studentRepository.getStudentById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    // Update a student
    public Student updateStudent(Integer id, Student studentDetails) {
        // First check if student exists
        studentRepository.getStudentById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        
        studentRepository.updateStudent(id, studentDetails);
        studentDetails.setId(id);
        return studentDetails;
    }

    // Delete a student
    public void deleteStudent(Integer id) {
        // First check if student exists
        studentRepository.getStudentById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        
        studentRepository.deleteStudentById(id);
    }
}
