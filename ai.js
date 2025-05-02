
const menu = {
    "nasi goreng": 25000,
    "mie ayam": 20000,
    "kopi": 15000,
    "teh": 10000,
    "jus jeruk": 12000,
    "roti bakar": 18000
};



function tampilkanMenu() {
    let output = " Menu Kafe Kami:\n\n";
    for (const [item, harga] of Object.entries(menu)) {
        output += `▸ ${item.padEnd(15)} Rp${harga.toLocaleString()}\n`;
    }
    updateOutput(output);
}

function prosesPesanan(pesanan) {
    const items = pesanan.split(',');
    let total = 0;
    let detail = " Detail Pesanan:\n\n";
    let adaKesalahan = false;

    for (const item of items) {
        const [namaItem, kuantitas] = item.trim().split(':').map(x => x.trim());
        const jumlah = parseInt(kuantitas) || 1;
        const harga = menu[namaItem.toLowerCase()];

        if (harga) {
            const subTotal = harga * jumlah;
            total += subTotal;
            detail += `✓ ${namaItem} (${jumlah}x) = Rp${subTotal.toLocaleString()}\n`;
        } else {
            detail += `✗ ${namaItem}: Item tidak tersedia\n`;
            adaKesalahan = true;
        }
    }

    return { detail, total, adaKesalahan };
}

function mulaiPesan() {
    sedangMemesan = true;
    document.getElementById('userInput').style.display = 'block';
    document.getElementById('userInput').focus();
    updateOutput("Masukkan pesanan (contoh: Nasi Goreng:2, Teh:1)\nKetik 'selesai' ketika sudah selesai");
}

function tampilkanInfo() {
    const info = ` Jam Operasional:
Senin-Minggu: 08:00 - 22:00

 Lokasi:
Jl. Bitung sari, Ciawi , Bogor, Jawa Barat

 Kontak:
Telepon: 08985636848
Email: Ziyad@gmail.com`;

    updateOutput(info);
}

function keluar() {
    updateOutput("Terima kasih telah berkunjung! ");
    document.getElementById('userInput').style.display = 'none';
}

function updateOutput(text) {
    document.getElementById('output').textContent = text;
}

// Event Listener untuk input
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && sedangMemesan) {
        const pesanan = this.value.trim();
        if (pesanan.toLowerCase() === 'selesai') {
            this.style.display = 'none';
            sedangMemesan = false;
            return;
        }

        const { detail, total, adaKesalahan } = prosesPesanan(pesanan);
        let output = detail + '\n';
        
        if (total > 0) {
            output += `\nTotal: Rp${total.toLocaleString()}\n\nPembayaran berhasil! Terima kasih `;
        } else if (adaKesalahan) {
            output += " Terdapat kesalahan dalam pesanan!";
        }
        
        updateOutput(output);
        this.value = '';
    }
});