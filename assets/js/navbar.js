document.addEventListener("DOMContentLoaded", function () {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    // Ambil file navbar.html (sesuaikan path foldernya jika berbeda)
    fetch('assets/components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarPlaceholder.innerHTML = data;

            // Logika otomatis untuk mendeteksi halaman aktif & memberi warna biru
            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            const navLinks = navbarPlaceholder.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                if (link.getAttribute('data-page') === currentPage) {
                    link.classList.add('text-blue-300', 'font-semibold');
                }
            });

            // Re-inisialisasi tombol hamburger menu mobile setelah elemen dimuat
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