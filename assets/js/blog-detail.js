document.addEventListener("DOMContentLoaded", function () {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGy9Pxzz8lSXdrCBmrBiKGE6UOYWZtO55952n9mFJ6ypmm8LXfvcexZveUm8tzm0sx/exec";
    
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const container = document.getElementById('article-content-box');
    const titleEl = document.getElementById('article-title');
    const pageTitleEl = document.getElementById('page-title');

    if (!container) return;

    if (!articleId) {
        container.innerHTML = '<p class="text-center text-red-500 py-10">Artikel tidak ditemukan.</p>';
        return;
    }

    // Fungsi helper untuk merapikan tanggal
    function formatDate(dateString) {
        if (!dateString) return '';
        if (dateString.includes('T')) {
            const dateObj = new Date(dateString);
            return dateObj.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        }
        return dateString;
    }

    // Fungsi otomatis mengubah teks biasa dari Google Sheets menjadi HTML yang rapi
    function smartFormatContent(text) {
        if (!text) return '';
        
        // Jika sudah ada tag HTML bawaan, biarkan
        if (text.includes('<p>') || text.includes('<h2>')) {
            return text;
        }

        // Pecah teks berdasarkan baris baru (enter)
        const lines = text.split('\n');
        let htmlOutput = '';

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return; // Lewati baris kosong

            // Deteksi otomatis: Jika baris diawali angka (misal "1. ") atau pendek dan penting, jadikan Sub-judul (<h2>)
            // Atau Anda bisa sesuaikan aturannya sesuai kebutuhan klien
            if (/^\d+\.\s/.test(trimmed) || (trimmed.length < 60 && !trimmed.endsWith('.'))) {
                htmlOutput += `<h2 class="text-xl md:text-2xl font-bold text-blue-950 pt-4 mb-2">${trimmed}</h2>`;
            } else {
                // Jika teks biasa, jadikan paragraf (<p>)
                htmlOutput += `<p class="mb-4 leading-relaxed">${trimmed}</p>`;
            }
        });

        return htmlOutput;
    }

    async function loadArticleDetail() {
        try {
            const response = await fetch(SCRIPT_URL);
            const data = await response.json();

            if (data.blog) {
                const post = data.blog.find(item => String(item.id) === String(articleId));

                if (post) {
                    if (titleEl) titleEl.innerText = post.title;
                    if (pageTitleEl) pageTitleEl.innerText = `WEB Contractor | ${post.title}`;

                    const formattedContent = smartFormatContent(post.content);

                    container.innerHTML = `
                        <div class="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-100 text-sm text-gray-500">
                            <div class="flex items-center space-x-2">
                                <i class="far fa-calendar-alt text-blue-900"></i>
                                <span>${formatDate(post.date)}</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <i class="far fa-user text-blue-900"></i>
                                <span>${post.author || 'Admin WEB Contractor'}</span>
                            </div>
                        </div>

                        <div class="mb-8 rounded-xl overflow-hidden shadow-md h-72 md:h-96 bg-gray-100">
                            <img src="${post.image_url || ''}" alt="${post.title}" class="w-full h-full object-cover">
                        </div>

                        <div class="text-gray-700 text-base md:text-lg">
                            ${formattedContent}
                        </div>

                        <div class="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <a href="blog.html" class="inline-flex items-center text-blue-950 font-semibold hover:text-blue-600 transition">
                                <i class="fas fa-arrow-left mr-2"></i> Kembali ke Blog
                            </a>
                            <a href="index.html#contact" class="inline-block bg-blue-950 text-white text-sm font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-900 transition">
                                Konsultasi Gratis &rarr;
                            </a>
                        </div>
                    `;
                } else {
                    container.innerHTML = '<p class="text-center text-gray-500 py-10">Artikel dengan ID tersebut tidak ditemukan.</p>';
                }
            }
        } catch (error) {
            console.error("Gagal memuat detail artikel:", error);
            container.innerHTML = '<p class="text-center text-red-500 py-10">Terjadi kesalahan saat memuat data artikel.</p>';
        }
    }

    loadArticleDetail();
});