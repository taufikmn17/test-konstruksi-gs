document.addEventListener("DOMContentLoaded", function () {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzGy9Pxzz8lSXdrCBmrBiKGE6UOYWZtO55952n9mFJ6ypmm8LXfvcexZveUm8tzm0sx/exec";
    const container = document.getElementById('blog-container');

    if (!container) return;

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

    async function loadBlogPosts() {
        try {
            const response = await fetch(SCRIPT_URL);
            const data = await response.json();
            
            if (data.blog && data.blog.length > 0) {
                container.innerHTML = ''; // Hapus skeleton loader
                
                data.blog.forEach(post => {
                    const card = document.createElement('div');
                    card.className = "bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-xl transition duration-300";
                    
                    card.innerHTML = `
                        <div>
                            <div class="h-52 overflow-hidden bg-gray-100">
                                <img src="${post.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'}" alt="${post.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                            </div>
                            <div class="p-6">
                                <div class="text-xs text-gray-400 mb-2">${formatDate(post.date)}</div>
                                <h3 class="text-blue-950 font-bold text-xl mb-3 leading-snug">
                                    ${post.title}
                                </h3>
                                <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                    ${post.excerpt}
                                </p>
                            </div>
                        </div>
                        <div class="p-6 pt-0">
                            <a href="blog-detail.html?id=${post.id}" class="inline-block bg-blue-950 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-blue-900 transition">
                                Read More
                            </a>
                        </div>
                    `;
                    container.appendChild(card);
                });
            } else {
                container.innerHTML = '<p class="col-span-3 text-center text-gray-500">Belum ada artikel blog tersedia.</p>';
            }
        } catch (error) {
            console.error("Gagal memuat data blog:", error);
            container.innerHTML = '<p class="col-span-3 text-center text-red-500">Gagal memuat artikel dari server.</p>';
        }
    }

    loadBlogPosts();
});