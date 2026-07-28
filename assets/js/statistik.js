document.addEventListener("DOMContentLoaded", function () {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzGy9Pxzz8lSXdrCBmrBiKGE6UOYWZtO55952n9mFJ6ypmm8LXfvcexZveUm8tzm0sx/exec";

    fetch(WEB_APP_URL)
        .then(response => response.json())
        .then(responseObj => {
            const stats = responseObj.stats;
            if (stats) {
                loadStatCard("stat_1", stats.stat_1);
                loadStatCard("stat_2", stats.stat_2);
                loadStatCard("stat_3", stats.stat_3);
                loadStatCard("stat_4", stats.stat_4);
            }
        })
        .catch(error => {
            console.error("Gagal memuat konten Statistik:", error);
        });

    function loadStatCard(prefix, statData) {
        if (statData && statData.value !== undefined) {
            const originalText = statData.value.toString();
            
            // Ambil hanya angka di awal string untuk target hitung (misal "100+" jadi 100)
            const matchedNum = originalText.match(/\d+/);
            const targetNumber = matchedNum ? parseInt(matchedNum[0], 10) : 0;

            // 1. Jalankan animasi hitung angka
            animateValue(prefix + "-val", 0, targetNumber, 800, originalText);

            // 2. Title dan Sub menggunakan efek fade mandiri
            fadeInText(prefix + "-title", statData.title);
            fadeInText(prefix + "-sub", statData.sub);
        }
    }

    // Fungsi animasi angka berjalan dari 0 ke nilai akhir yang aman
    function animateValue(elementId, start, end, duration, originalText) {
        const el = document.getElementById(elementId);
        if (!el) return;

        // Pastikan elemen angka terlihat
        el.style.opacity = "1";

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const currentVal = Math.floor(progress * (end - start) + start);
            
            // Jika teks asli mengandung simbol tambahan (seperti "+"), kita bisa sesuaikan tampilannya selama counting
            if (originalText.includes('+')) {
                el.innerText = currentVal + "+";
            } else if (originalText.includes(',')) {
                el.innerText = currentVal.toLocaleString();
            } else {
                el.innerText = currentVal;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.innerText = originalText; // Kembalikan ke format asli persis dari sheet di akhir animasi
            }
        };
        window.requestAnimationFrame(step);
    }

    // Fungsi efek muncul mandiri untuk teks (Title & Sub)
    function fadeInText(elementId, textValue) {
        const el = document.getElementById(elementId);
        if (!el || textValue === undefined) return;

        el.style.opacity = "0";
        el.style.transform = "translateY(8px)";
        el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
        
        el.innerText = textValue;

        requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    }
});