
package com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.produkte;
import com.example.demo.entity.warenkorb;
import com.example.demo.entity.kunde;
import com.example.demo.repository.kunderepository;
import com.example.demo.repository.produkterepository;
import com.example.demo.repository.warenkorbrepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DemoController {

    private final produkterepository produkteRepository;
    private final warenkorbrepository warenkorbRepository;
    private final kunderepository kunderepository;

    @Autowired
    public DemoController(produkterepository produkteRepository, warenkorbrepository warenkorbRepository,
            kunderepository kunderepository) {
        this.produkteRepository = produkteRepository;
        this.warenkorbRepository = warenkorbRepository;
        this.kunderepository = kunderepository;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello World!";
    }

    // POST /api/buyprodukt?name=xyz
    @PostMapping("/buyprodukt")
    public ResponseEntity<?> buyProdukt(@RequestParam String name, @RequestParam String username) {
        Optional<produkte> produktOpt = produkteRepository.findByName(name);
        Optional<kunde> userOpt = kunderepository.findByUsername(username);

        if (produktOpt.isEmpty() || userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        produkte produkt = produktOpt.get();
        kunde user = userOpt.get();

        if (produkt.getAnzahl() <= 0) {
            return ResponseEntity.badRequest().body("Produkt nicht verfügbar");
        }

        produkt.setAnzahl(produkt.getAnzahl() - 1);
        produkteRepository.save(produkt);

        Optional<warenkorb> itemOpt = warenkorbRepository.findByProduktandUser(produkt, user);

        if (itemOpt.isPresent()) {
            warenkorb item = itemOpt.get();
            item.anzahlErhoehen();
            warenkorbRepository.save(item);
            return ResponseEntity.ok(item);
        } else {
            warenkorb w = new warenkorb(produkt, user);
            warenkorbRepository.save(w);
            return ResponseEntity.ok(w);
        }
    }

    @GetMapping("/getprodukte")
    public ResponseEntity<List<warenkorb>> getProdukte(@RequestParam String name) {
        kunde user = kunderepository.findByUsername(name)
                .orElseThrow(() -> new RuntimeException("Kunde nicht gefunden"));

        List<warenkorb> arr = warenkorbRepository.findByUser(user);
        return ResponseEntity.ok(arr);
    }

}
