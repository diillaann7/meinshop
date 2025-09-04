package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;

@Entity
public class warenkorb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private produkte produkt;
    @ManyToOne
    private kunde kunde;

    @Min(1)
    private int anzahl;

    public warenkorb() {
    }

    public warenkorb(produkte produkt, kunde k) {
        this.produkt = produkt;
        this.anzahl = 1;
        this.kunde = k;
    }

    public void anzahlErhoehen() {
        this.anzahl += 1;
    }

    @JsonProperty("gesamtpreis")
    public int gesamtpreis() {
        return this.getAnzahl() * this.produkt.getPreis();
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public produkte getProdukt() {
        return produkt;
    }

    public void setProdukt(produkte produkt) {
        this.produkt = produkt;
    }

    public int getAnzahl() {
        return anzahl;
    }

    public void setAnzahl(int anzahl) {
        this.anzahl = anzahl;
    }
}
