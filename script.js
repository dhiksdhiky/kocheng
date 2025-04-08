const catImageElement = document.getElementById('catImage');
const getCatBtn = document.getElementById('getCatBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const imagePlaceholder = document.getElementById('imagePlaceholder');

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

// --- PENTING: Masukkan API Key Anda di sini! ---
// Daftar gratis di: https://thecatapi.com/signup
// JANGAN BAGIKAN KODE INI SECARA PUBLIK JIKA MENGANDUNG API KEY ASLI
const apiKey = "MASUKKAN_API_KEY_ANDA_DISINI"; // <<< GANTI INI!

// Fungsi untuk mengambil dan menampilkan gambar kucing
async function fetchCatPicture() {
    // Tampilkan loading, sembunyikan gambar lama
    loadingSpinner.style.display = 'block';
    imagePlaceholder.style.display = 'flex'; // Tampilkan placeholder (yg berisi spinner)
    catImageElement.style.display = 'none'; // Sembunyikan tag img
    getCatBtn.disabled = true;
    getCatBtn.textContent = 'Loading Meow...';

    // Cek apakah API Key sudah dimasukkan
    if (apiKey === "live_q2naG2Oz4LVMyEFWHirQnzrPgCQ9Lbfld1A3Rlhqmony3Gfi2HnqLY9nhZq46ryq" || apiKey.trim() === "") {
        console.error("API Key belum dimasukkan ke dalam script.js!");
        alert("Mohon masukkan API Key dari TheCatAPI.com ke dalam file script.js");
        loadingSpinner.style.display = 'none';
        getCatBtn.disabled = false;
        getCatBtn.textContent = 'Lagi, dong! 😻';
        // Tampilkan pesan error di placeholder
        imagePlaceholder.innerHTML = '<p style="color:red; text-align:center;">Error: API Key dibutuhkan!</p>';
        return; // Hentikan fungsi
    }


    try {
        const response = await fetch(CAT_API_URL, {
            headers: {
                'x-api-key': apiKey // Kirim API key via header
            }
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