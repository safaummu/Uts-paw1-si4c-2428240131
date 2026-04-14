function SimpanBarang() {
    const namaBarang = document.getElementById('namaBarang').value;
    const jumlahBarang = document.getElementById('jumlahBarang').value;
    const keterangan = document.getElementById('keterangan').value;
    const imageUrl = document.getElementById('imageUrl').value;

    if (!namaBarang || !jumlahBarang || !keterangan) {
        alert('Semua field harus diisi!');
        return;
    }

    const barang = {
        id: Date.now(),
        namaBarang: namaBarang,
        jumlahBarang: parseInt(jumlahBarang),
        keterangan: keterangan,
        imageUrl: imageUrl
    };

    let daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];
    daftarBarang.push(barang);
    localStorage.setItem('daftarBarang', JSON.stringify(daftarBarang));

    
    document.getElementById('namaBarang').value = '';
    document.getElementById('jumlahBarang').value = '';
    document.getElementById('keterangan').value = '';
    document.getElementById('imageUrl').value = '';

    TampilkanData();
    alert('Barang berhasil disimpan!');
}

function TampilkanData() {
    const daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];
    const containerData = document.getElementById('containerData');
    containerData.innerHTML = '';

    daftarBarang.forEach(barang => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${barang.imageUrl}" class="card-img-top" alt="${barang.namaBarang}">
                <div class="card-body">
                    <h5 class="card-title">${barang.namaBarang}</h5>
                    <p class="card-text">${barang.keterangan}</p>
                    <p class="text-muted">Jumlah: ${barang.jumlahBarang}</p>
                    <button class="btn btn-danger btn-sm" onclick="HapusBarang(${barang.id})">Hapus</button>
                </div>
            </div>
        `;
        containerData.appendChild(card);
    });
}

function HapusBarang(id) {
    let daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];
    daftarBarang = daftarBarang.filter(barang => barang.id !== id);
    localStorage.setItem('daftarBarang', JSON.stringify(daftarBarang));
    TampilkanData();
}

window.addEventListener('DOMContentLoaded', TampilkanData);