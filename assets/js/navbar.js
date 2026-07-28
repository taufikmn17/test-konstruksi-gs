document.addEventListener("DOMContentLoaded", function () {
    // 1. Tentukan path relatif ke folder assets berdasarkan lokasi halaman saat ini
    // Jika file berada di root (index.html utama), path ke assets adalah 'assets/'
    // Jika di dalam subfolder (about/, contact/, dll.), path ke assets adalah '../assets/'
    const isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') && window.location.pathname.split('/').filter(Boolean).length === 0;
    
    // Cara alternatif yang lebih aman mendeteksi kedalaman folder:
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    // Jika path berisi nama folder selain root (misal: /about/index.html -> length 2 atau lebih, atau tergantung hosting)
    // Mari gunakan deteksi otomatis berdasarkan level folder:
    const depth = pathSegments.length > 0 && !window.location.pathname.endsWith('index.html') ? pathSegments.length : pathSegments.length - 1;
    
    // Atau cara paling gampang dan akurat: kita buat fungsi helper atau cek path string
    const currentPath = window.location.pathname;
    let assetsPath = 'assets/';
    let rootPath = './';
    
    // Jika berada di dalam subfolder (ada kata /about/, /project/, /blog/, /contact/, /blog-detail/)
    if (currentPath.includes('/about/') || 
        currentPath.includes('/project/') || 
        currentPath.includes('/blog/') || 
        currentPath.includes('/blog-detail/') || 
        currentPath.includes('/contact/')) {
        assetsPath = '../assets/';
        rootPath = '../';
    }

    // 2. Fetch file navbar.html
    fetch(assetsPath + 'components/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Gagal memuat navbar');
            return response.text();
        })
        .then(data => {
            // Masukkan navbar ke dalam placeholder
            const placeholder = document.getElementById('navbar-placeholder');
            if (placeholder) {
                placeholder.innerHTML = data;

                // 3. Perbaiki link href secara dinamis agar sesuai dengan posisi halaman
                const navLinks = placeholder.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    const page = link.getAttribute('data-page');
                    if (page === 'index') {
                        link.href = rootPath;
                    } else if (page === 'testimoni') {
                        link.href = rootPath + '#testimoni'; // sesuaikan jika berupa section ID
                    } else {
                        link.href = rootPath + page + '/';
                    }
                });

                // 4. Aktifkan Toggle Mobile Menu
                const menuBtn = document.getElementById('menu-btn');
                const mobileMenu = document.getElementById('mobile-menu');
                
                if (menuBtn && mobileMenu) {
                    menuBtn.addEventListener('click', () => {
                        mobileMenu.classList.toggle('hidden');
                    });
                }
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
});