const catImageElement = document.getElementById('catImage');
const getCatBtn = document.getElementById('getCatBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const imagePlaceholder = document.getElementById('imagePlaceholder');

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

// --- (Opsional) Masukkan API Key Anda di sini! ---
// Daftar gratis di: https://thecatapi.com/signup
// TheCatAPI bisa digunakan tanpa key untuk pencarian dasar.
const apiKey = "";

// Fungsi untuk mengambil dan menampilkan gambar kucing
async function fetchCatPicture() {
    // Tampilkan loading, sembunyikan gambar lama
    loadingSpinner.style.display = 'block';
    imagePlaceholder.style.display = 'flex'; // Tampilkan placeholder (yg berisi spinner)
    catImageElement.style.display = 'none'; // Sembunyikan tag img
    getCatBtn.disabled = true;
    getCatBtn.textContent = 'Loading Meow...';

    const headers = {};
    if (apiKey && apiKey.trim() !== "" && apiKey !== "MASUKKAN_API_KEY_ANDA_DISINI") {
        headers['x-api-key'] = apiKey;
    }

    try {
        const response = await fetch(CAT_API_URL, {
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Gagal fetch! Status: ${response.status}`);
        }

        const data = await response.json();

        // TheCatAPI mengembalikan array, kita ambil elemen pertama
        if (data && data.length > 0 && data[0].url) {
            const imageUrl = data[0].url;
            console.log("URL Gambar Kucing:", imageUrl); // Log URL

            // Set src gambar dan tunggu sampai gambar dimuat
            catImageElement.src = imageUrl;
             // Event listener untuk saat gambar selesai dimuat
            catImageElement.onload = () => {
                console.log("Gambar berhasil dimuat.");
                catImageElement.style.display = 'block'; // Tampilkan gambar
                loadingSpinner.style.display = 'none'; // Sembunyikan spinner
                imagePlaceholder.style.display = 'none'; // Sembunyikan placeholder
                getCatBtn.disabled = false; // Aktifkan tombol kembali
                getCatBtn.textContent = 'Lagi, dong! 😻';
            };
             // Event listener jika gambar gagal dimuat
            catImageElement.onerror = () => {
                console.error("Gagal memuat gambar dari URL:", imageUrl);
                throw new Error("Gagal memuat gambar kucing."); // Lemparkan error baru
            };

        } else {
             throw new Error("Data gambar tidak valid dari API.");
        }

    } catch (error) {
        console.error("Error saat mengambil gambar kucing:", error);
        alert("Oops! Gagal mengambil gambar kucing. Coba lagi nanti.");
        loadingSpinner.style.display = 'none'; // Sembunyikan spinner jika error
        imagePlaceholder.style.display = 'flex'; // Tampilkan placeholder lagi
        // Tampilkan pesan error di placeholder
        imagePlaceholder.innerHTML = '<p style="color:red; text-align:center;">Gagal memuat gambar.</p>';
        catImageElement.style.display = 'none'; // Pastikan img disembunyikan
        getCatBtn.disabled = false; // Aktifkan tombol kembali
        getCatBtn.textContent = 'Lagi, dong! 😻';
    }
}

// Event listener untuk tombol
getCatBtn.addEventListener('click', fetchCatPicture);

// Ambil gambar kucing pertama saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchCatPicture);
