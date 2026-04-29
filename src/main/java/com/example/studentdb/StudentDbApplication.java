package com.example.studentdb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

@SpringBootApplication
public class StudentDbApplication {

    public static void main(String[] args) {
        // Automatically check and create database if missing before Spring boots
        createDatabaseIfNotExist();
        
        SpringApplication.run(StudentDbApplication.class, args);
    }

    private static void createDatabaseIfNotExist() {
        Properties props = new Properties();
        try (InputStream input = StudentDbApplication.class.getClassLoader().getResourceAsStream("application.properties")) {
            if (input != null) {
                props.load(input);
            }
            
            String url = props.getProperty("spring.datasource.url", "jdbc:postgresql://localhost:5432/studentdb");
            String user = props.getProperty("spring.datasource.username", "postgres");
            String password = props.getProperty("spring.datasource.password", "postgres");

            // Extract the base URL and connect to the default 'postgres' database
            // This is required because we cannot connect to 'studentdb' if it doesn't exist yet
            String dbUrl = url.substring(0, url.lastIndexOf('/')) + "/postgres";
            String dbName = url.substring(url.lastIndexOf('/') + 1);
            if (dbName.contains("?")) {
                dbName = dbName.substring(0, dbName.indexOf('?'));
            }

            try (Connection connection = DriverManager.getConnection(dbUrl, user, password);
                 Statement statement = connection.createStatement()) {

                // Check if our target database exists
                ResultSet resultSet = statement.executeQuery("SELECT count(*) FROM pg_database WHERE datname = '" + dbName + "'");
                resultSet.next();
                int count = resultSet.getInt(1);

                if (count <= 0) {
                    statement.executeUpdate("CREATE DATABASE " + dbName);
                    System.out.println("✅ Auto-Initialization: Database '" + dbName + "' created successfully.");
                } else {
                    System.out.println("✅ Auto-Initialization: Database '" + dbName + "' already exists.");
                }
            } catch (Exception e) {
                System.err.println("⚠️ Could not verify or create the database automatically.");
                System.err.println("Error details: " + e.getMessage());
                System.err.println("If the app crashes, ensure PostgreSQL is running and credentials are correct in application.properties.");
            }
        } catch (Exception e) {
            System.err.println("⚠️ Failed to load properties for DB initialization.");
        }
    }
}
