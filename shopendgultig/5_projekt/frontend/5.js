function warenkorbanzeigen() {
    const warenkorb = document.getElementById("waren");

    // Warenkorb ein-/ausblenden
    if (warenkorb.style.display === 'none' || warenkorb.style.display === '') {
        warenkorb.style.display = 'block';
    } else {
        warenkorb.style.display = 'none';
        return;
    }

    // Vorher alten Inhalt löschen
    warenkorb.innerHTML = "<h3>Dein Warenkorb</h3>";

    fetch("http://localhost:9090/api/getprodukte?name=dilan")
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                warenkorb.innerHTML += "<p>Dein Warenkorb ist leer.</p>";
                return;
            }

            let table = document.createElement("table");
            table.innerHTML = `
                <tr>
                    <th>Produkt</th>
                    <th>Anzahl</th>
                    <th>Gesamtpreis</th>
                </tr>
            `;

            let summe = 0;

            data.forEach(item => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.produkt.name}</td>
                    <td>${item.anzahl}</td>
                    <td>${item.gesamtpreis} €</td>
                `;
                summe += item.gesamtpreis;
                table.appendChild(row);
            });

            // Gesamtsumme unten einfügen
            let sumRow = document.createElement("tr");
            sumRow.innerHTML = `
                <td colspan="2"><strong>Gesamtsumme</strong></td>
                <td><strong>${summe} €</strong></td>
            `;
            table.appendChild(sumRow);

            warenkorb.appendChild(table);
        })
        .catch(err => {
            console.error(err);
            warenkorb.innerHTML += "<p>Fehler beim Laden des Warenkorbs.</p>";
        });
}



function produktkaufen(produktname) {
    fetch(`http://localhost:9090/api/buyprodukt?name=${encodeURIComponent(produktname)}&username=dilan`, {
        method: "POST"
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Fehler beim Kauf");
        }
        return res.json();
    })
    .then(data => {
        console.log("Produkt erfolgreich hinzugefügt:", data);
        alert(produktname + " wurde in den Warenkorb gelegt!");
    })
    .catch(err => {
        console.error(err);
        alert("Fehler beim Kauf des Produkts");
    });
}

