package com.example.studentdb.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class Student {
    
    private Integer id;
    
    @NotBlank(message = "Name cannot be empty")
    private String name;
    
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email format is not valid")
    private String email;
    
    @NotBlank(message = "Course cannot be empty")
    private String course;

    // Default constructor
    public Student() {
    }

    // Parameterized constructor
    public Student(Integer id, String name, String email, String course) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.course = course;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }
}
