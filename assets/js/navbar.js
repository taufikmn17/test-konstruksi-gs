document.addEventListener("DOMContentLoaded", function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    fetch('/assets/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            // --- PENYESUAIAN OTOMATIS SEMUA LINK UNTUK GITHUB PAGES / CPANEL ---
            const isGitHubPages = window.location.hostname.includes("github.io");
            const basePath = isGitHubPages ? "/test-konstruksi-gs" : "";

            // 1. Atur Link Home
            const homeLinks = navbarPlaceholder.querySelectorAll('#home-link');
            homeLinks.forEach(link => {
                link.setAttribute("href", basePath + "/");
            });

            // 2. Atur Link Menu Lainnya (About, Project, Blog, Contact, dll)
            const navLinksAll = navbarPlaceholder.querySelectorAll('.nav-link');
            navLinksAll.forEach(link => {
                const currentHref = link.getAttribute('href');
                // Jika href berawal dari garis miring dan bukan link '#' atau eksternal
                if (currentHref && currentHref.startsWith('/') && currentHref !== '#') {
                    link.setAttribute('href', basePath + currentHref);
                }
            });
            // -----------------------------------------------------------------

            // Logika otomatis mendeteksi halaman aktif
            const pathSegments = window.location.pathname.split("/").filter(Boolean);
            // Sesuaikan indeks jika di GitHub Pages karena ada segmen tambahan nama repo
            const pageIndex = isGitHubPages ? 1 : 0;
            const currentPage = pathSegments.length > pageIndex ? pathSegments[pathSegments.length - 1] : "index";

            navLinksAll.forEach(link => {
                const dataPage = link.getAttribute('data-page');
                if (dataPage === currentPage || (pathSegments.length <= pageIndex && dataPage === "index")) {
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