document.addEventListener("DOMContentLoaded", function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    fetch('/assets/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            // --- OTOMATISASI LINK HOME BERDASARKAN LINGKUNGAN ---
            const homeLinks = navbarPlaceholder.querySelectorAll('#home-link');
            homeLinks.forEach(link => {
                if (window.location.hostname.includes("github.io")) {
                    link.setAttribute("href", "/test-konstruksi-gs/");
                } else {
                    link.setAttribute("href", "/");
                }
            });
            // ----------------------------------------------------

            // Logika otomatis mendeteksi halaman aktif
            const pathSegments = window.location.pathname.split("/").filter(Boolean);
            const currentPage = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "index";

            const navLinks = navbarPlaceholder.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                const dataPage = link.getAttribute('data-page');
                if (dataPage === currentPage || (pathSegments.length === 0 && dataPage === "index")) {
                    link.classList.add('text-blue-300', 'font-semibold');
                }
            });

            // Re-inisialisasi tombol hamburger menu mobile
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        })
        .catch(error => console.error("Gagal memuat navbar:", error));
});