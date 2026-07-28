document.addEventListener("DOMContentLoaded", function () {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzGy9Pxzz8lSXdrCBmrBiKGE6UOYWZtO55952n9mFJ6ypmm8LXfvcexZveUm8tzm0sx/exec";
    const container = document.getElementById("3projects-container");

    if (!container) return;

    fetch(WEB_APP_URL)
        .then(response => response.json())
        .then(responseObj => {
            // Mengambil 3 data terbaru dari properti latestProjects backend
            let projects = responseObj.latestProjects;
            
            if (projects && Array.isArray(projects)) {
                // Bersihkan skeleton loader / isi lama
                container.innerHTML = ""; 

                projects.forEach(proj => {
                    const card = document.createElement("div");
                    card.className = "group cursor-pointer flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300";

                    card.innerHTML = `
                        <div class="overflow-hidden h-64 sm:h-72 w-full bg-gray-100">
                            <img src="${proj.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'}" 
                                 alt="${proj.title}" 
                                 class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <h3 class="text-xl font-bold text-blue-950 group-hover:text-blue-600 transition mb-1">${proj.title}</h3>
                            <p class="text-gray-500 text-sm mb-3 font-medium">📍 ${proj.location}</p>
                            <p class="text-gray-600 text-sm leading-relaxed mt-auto line-clamp-2">${proj.description || ''}</p>
                        </div>
                    `;

                    container.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error("Gagal memuat projects di beranda:", error);
            container.innerHTML = "<p class='text-red-500 col-span-3 text-center'>Gagal memuat data proyek.</p>";
        });
});