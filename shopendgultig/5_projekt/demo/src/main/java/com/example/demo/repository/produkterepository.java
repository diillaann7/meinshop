package com.example.demo.repository;

import com.example.demo.entity.produkte;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface produkterepository extends JpaRepository<produkte, Long> {
    Optional<produkte> findByName(String name);
}
