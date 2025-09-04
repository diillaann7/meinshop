package com.example.demo.repository;

import com.example.demo.entity.kunde;
import com.example.demo.entity.produkte;
import com.example.demo.entity.warenkorb;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface warenkorbrepository extends JpaRepository<warenkorb, Long> {
    Optional<warenkorb> findByProduktandUser(produkte produkt, kunde kunde);
    List<warenkorb> findByUser(kunde user);
    
}
