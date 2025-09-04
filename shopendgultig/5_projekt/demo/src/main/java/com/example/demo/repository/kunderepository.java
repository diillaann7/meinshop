package com.example.demo.repository;

import com.example.demo.entity.kunde;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface kunderepository extends JpaRepository<kunde, Long> {
    Optional<kunde> findByUsername(String username);
}
