document.addEventListener("DOMContentLoaded", function () {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");

    if (navbarPlaceholder) {
        // Template Navbar HTML
        navbarPlaceholder.innerHTML = `
        <header class="bg-blue-950/85 backdrop-blur-md p-6 flex items-center justify-between text-white shadow-md">
            <div class="font-bold text-2xl tracking-tighter">WEB <span class="font-light">CONTRACTOR</span></div>
            
            <div class="hidden md:flex items-center space-x-6 text-sm font-medium">
                <nav class="space-x-6">
                    <a href="index.html" class="nav-link hover:text-blue-300 transition" data-page="index.html">Home</a>
                    <a href="about.html" class="nav-link hover:text-blue-300 transition" data-page="about.html">About Us</a>
                    <a href="project.html" class="nav-link hover:text-blue-300 transition" data-page="project.html">Project</a>
                    <a href="#" class="nav-link hover:text-blue-300 transition" data-page="testimoni.html">Testimoni</a>
                    <a href="blog.html" class="nav-link hover:text-blue-300 transition" data-page="blog.html">Blog</a>
                    <a href="contact.html" class="nav-link hover:text-blue-300 transition" data-page="contact.html">Contact</a>
                </nav>
            </div>

            <button id="menu-btn" class="md:hidden focus:outline-none">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </header>

        <nav id="mobile-menu" class="hidden md:hidden bg-blue-950/90 backdrop-blur-lg text-white flex flex-col p-6 space-y-4 shadow-lg border-t border-white/10">
            <a href="index.html" class="nav-link block py-2 border-b border-white/10" data-page="index.html">Home</a>
            <a href="about.html" class="nav-link block py-2 border-b border-white/10" data-page="about.html">About Us</a>
            <a href="project.html" class="nav-link block py-2 border-b border-white/10" data-page="project.html">Project</a>
            <a href="#" class="nav-link block py-2 border-b border-white/10" data-page="testimoni.html">Testimoni</a>
            <a href="blog.html" class="nav-link block py-2 border-b border-white/10" data-page="blog.html">Blog</a>
            <a href="contact.html" class="nav-link block py-2 border-b border-white/10" data-page="contact.html">Contact</a>
        </nav>
        `;

        // 1. Logika Toggle Mobile Menu
        const menuBtn = document.getElementById("menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener("click", () => {
                mobileMenu.classList.toggle("hidden");
            });
        }

        // 2. Tandai Menu Aktif Berdasarkan URL Halaman Saat Ini
        const currentLocation = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach((link) => {
            const pageAttr = link.getAttribute("href");
            if (pageAttr === currentLocation) {
                link.classList.add("text-blue-400", "font-bold");
            }
        });
    }
});