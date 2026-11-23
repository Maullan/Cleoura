/* ==========================================================
   CleOura — KONFIGURASI WEBSITE
   Semua yang perlu diubah pemilik website ada di file ini:
   nomor WhatsApp, harga, jadwal, dan foto galeri.
   Tidak perlu menyentuh app.js.
   ========================================================== */
window.CLEOURA_CONFIG = {

  /* ---------- 1. WHATSAPP BISNIS ----------
     Isi dengan nomor resmi CleOura, format internasional tanpa "+" dan tanpa spasi.
     Contoh format: "628xxxxxxxxxx"  (08xx... otomatis diubah menjadi 62...)
     Selama masih kosong, tombol "Konfirmasi Pesanan" tetap membuat pesan otomatis,
     tetapi pelanggan harus memilih sendiri kontak tujuan di WhatsApp. */
  whatsapp: {
    number: "6289506826464",
    displayNumber: "0895-0682-6464"
  },

  /* ---------- 2. HARGA ----------
     PENTING: angka di bawah adalah CONTOH. Ganti dengan harga resmi CleOura
     (satuan Rupiah, angka saja tanpa titik). */
  roomSizes: [
    { id: "small",  name: "Small Room",  label: "Kamar kecil",  desc: "Cocok untuk kamar kos berukuran kecil dengan perabot minimal.",        price: 35000 },
    { id: "medium", name: "Medium Room", label: "Kamar sedang", desc: "Untuk kamar kos berukuran standar dengan tempat tidur, meja, dan lemari.", price: 50000 },
    { id: "large",  name: "Large Room",  label: "Kamar besar",  desc: "Untuk kamar yang luas atau berisi lebih banyak perabot.",              price: 70000 }
  ],

  roomScope: [
    "Menyapu lantai",
    "Mengepel lantai",
    "Membersihkan debu",
    "Merapikan tempat tidur",
    "Memberikan pengharum ruangan"
  ],

  addons: [
    {
      id: "wardrobe", name: "Wardrobe Care", icon: "wardrobe", price: 25000,
      desc: "Merapikan pakaian agar lemari kembali tertata.",
      items: ["Melipat pakaian", "Merapikan pakaian di lemari", "Menyetrika pakaian"]
    },
    {
      id: "bathroom", name: "Bathroom Cleaning", icon: "bathroom", price: 20000,
      desc: "Membersihkan kamar mandi agar segar dan nyaman dipakai.",
      items: ["Membersihkan toilet", "Membersihkan wastafel", "Membersihkan lantai kamar mandi", "Membersihkan area shower"]
    },
    {
      id: "dishes", name: "Dishwashing Service", icon: "dish", price: 15000,
      desc: "Mencuci perlengkapan makan dan masak yang menumpuk.",
      items: ["Mencuci piring", "Mencuci gelas", "Mencuci peralatan makan dan memasak"]
    }
  ],

  /* ---------- 3. JADWAL & KETERSEDIAAN ---------- */
  schedule: {
    openDays: [0, 1, 2, 3, 4, 5, 6],   // 0 = Minggu, 1 = Senin, ... 6 = Sabtu
    timeSlots: ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
    maxAdvanceDays: 30,                // pelanggan boleh memesan sampai N hari ke depan
    minLeadHours: 2,                   // pemesanan hari ini minimal N jam dari sekarang
    closedDates: [],                   // tanggal libur penuh, mis. ["2026-12-25"]
    fullSlots: {                       // slot yang sudah penuh pada tanggal tertentu
      // "2026-11-25": ["09:00", "10:00"],
    }
  },

  /* ---------- 4. GALERI "HASIL PENGERJAAN" ----------
     category: "before" | "after" | "organization" | "process"
     Tambahkan foto asli pekerjaan CleOura di folder assets/, lalu daftarkan di sini.
     Kategori yang belum punya foto otomatis menampilkan kartu "segera hadir". */
  gallery: [
    { src: "assets/before.jpg", category: "before", caption: "Contoh kondisi kamar sebelum dibersihkan" },
    { src: "assets/after.jpg",  category: "after",  caption: "Contoh kondisi kamar setelah dibersihkan" },
    /* Foto ilustrasi berlisensi bebas (Unsplash License), dimuat langsung dari Unsplash. Foto: Slaapwijsheid.nl */
    { src: "https://images.unsplash.com/photo-1686828751885-040f0a0fb77a?auto=format&fit=crop&w=900&q=75", category: "process", caption: "Foto ilustrasi: merapikan tempat tidur" }
  ],

  /* ---------- 5. WILAYAH ---------- */
  areas: ["Sapen", "Timoho", "Sorowajan", "Sekitar UIN Sunan Kalijaga Yogyakarta"],

  /* ---------- 6. CARA KERJA (4 langkah, tampil di beranda) ---------- */
  howItWorks: [
    ["Pilih layanan", "Tentukan ukuran kamar dan layanan tambahan yang kamu perlukan."],
    ["Atur jadwal", "Pilih tanggal dan jam yang tersedia, lalu kirim pesanan lewat WhatsApp."],
    ["Dibersihkan", "Petugas datang sesuai jadwal dan mengerjakan kamarmu dengan teliti."]
  ],


  /* ---------- 7. TESTIMONI ----------
     Isi di bawah adalah CONTOH (sample: true) dan tampil dengan label "Contoh ulasan".
     Ganti dengan ulasan pelanggan asli lalu hapus "sample: true".
     Hapus semua isi array ini jika ingin menyembunyikan bagian testimoni. */
  testimonials: [
    { sample: true, name: "Rina Maharani", role: "Mahasiswa, Sapen", text: "Pulang kuliah kamar sudah rapi dan wangi. Jadi bisa langsung istirahat tanpa mikirin nyapu dan ngepel." },
    { sample: true, name: "Dimas Prakoso", role: "Penghuni kos, Timoho", text: "Pesannya gampang, harganya jelas dari awal, dan petugasnya sopan. Lemari yang berantakan juga jadi tertata." },
    { sample: true, name: "Bu Sari", role: "Pemilik kos, Sorowajan", text: "Kamar kosong jadi cepat siap disewakan lagi setelah dibersihkan. Hasilnya bersih dan tidak bikin repot." }
  ],


  /* ---------- 8. FAQ ---------- */
  faq: [
    ["Area mana saja yang dilayani?", "Saat ini CleOura melayani Sapen, Timoho, Sorowajan, dan sekitar UIN Sunan Kalijaga Yogyakarta."],
    ["Apakah harus memesan Room Cleaning?", "Tidak. Wardrobe Care, Bathroom Cleaning, dan Dishwashing Service bisa dipesan tanpa Room Cleaning. Pilih \"Hanya layanan tambahan\" saat memesan."],
    ["Bagaimana dengan barang pribadi saya?", "Petugas meminta persetujuanmu sebelum memindahkan atau memilah barang. Tidak ada barang yang dibuang tanpa izin, dan privasimu dijaga selama pengerjaan."],
    ["Bagaimana cara memesan dan membayar?", "Pilih layanan dan jadwal di halaman Pesan Sekarang, lalu kirim rincian pesanan ke WhatsApp CleOura. Jadwal dan pembayaran dikonfirmasi lewat WhatsApp."],
    ["Bagaimana jika saya perlu mengubah jadwal?", "Hubungi CleOura lewat WhatsApp secepatnya agar jadwal bisa disesuaikan dengan slot yang tersedia."]
  ],
};
