document.addEventListener("DOMContentLoaded", function () {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzGy9Pxzz8lSXdrCBmrBiKGE6UOYWZtO55952n9mFJ6ypmm8LXfvcexZveUm8tzm0sx/exec";

    fetch(WEB_APP_URL)
        .then(response => response.json())
        .then(responseObj => {
            const data = responseObj.home;
            if (data) {
                if (data.title) {
                    const titleEl = document.getElementById("home-title");
                    if (titleEl) { titleEl.innerText = data.title; titleEl.classList.add("loaded"); }
                }
                if (data.subtitle) {
                    const subtitleEl = document.getElementById("home-subtitle");
                    if (subtitleEl) { subtitleEl.innerText = data.subtitle; subtitleEl.classList.add("loaded"); }
                }
                if (data.cta_text) {
                    const ctaEl = document.getElementById("home-cta");
                    if (ctaEl) { ctaEl.innerText = data.cta_text + ' →'; ctaEl.classList.add("loaded"); }
                }
            }
        })
        .catch(error => {
            console.error("Gagal memuat konten :", error);
        });
});