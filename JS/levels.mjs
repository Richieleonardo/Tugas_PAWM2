//Sample map Level 1 (Tileset 1 = Barrier, Tileset 0 = path[walkable])
const map1 = [
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','1','1','1','1','1',' ',' ',' '],
    [' ',' ','1','p',' ','2','1',' ',' ',' '],
    [' ',' ','1','1','1','1','1',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
]

const map2 = [
    ['1','1','1','1','1','1','1','1','1','1'],
    ['1','p',' ',' ',' ',' ',' ',' ','1','1'],
    ['1',' ','.',' ',' ',' ',' ',' ','1','1'],
    ['1',' ',' ',' ',' ',' ',' ',' ','1','1'],
    ['1','1','1','1','1','1',' ',' ','1','1'],
    ['1',' ',' ',' ',' ',' ',' ',' ','1','1'],
    ['1',' ',' ',' ',' ',' ',' ',' ','1','1'],
    ['1',' ','.','.',' ',' ',' ',' ',' ','1'],
    ['1','1','1','1','1','1','1','1','2','1'],
    ['1','1','1','1','1','1','1','1','1','1'],
];

//LEVEL OBJECT
export const levels = [
    {
        levelNumber: 1,
        map: map1,
        description: 
        `Selamat datang di Deco-Think, sebuah virtual lab kecil yang menggunakan permainan sebagai media pembelajaran sederhana agar kalian dapat memahami pemrograman dasar. 
        Sebelum kita memulai, saya akan mengajarkan anda cara bermain. 
        Kalian dapat menggunakan kolom input dibawah untuk mengetikkan instruksi agar bola kuning disebelah kanan dapat berpindah.
        Gunakan instruksi <code>move(direction)</code> untuk menggerakkan bola.
        Harap diperhatikan kalau kamu memiliki batas energi untuk bergerak, jika energi kamu 0, kamu tidak akan bisa bergerak.
        Jadi kamu harus berhati-hati. Untuk fungsi lebih lengkap akan diberikan di bawah:\n
        <ul>
        <li><code>move('right')</code>: Bola bergerak ke kanan</li>
        <li><code>move('left')</code>: Bola bergerak ke kiri</li>
        <li><code>move('up')</code>: Bola bergerak ke atas</li>
        <li><code>move('down')</code>: Bola bergerak ke bawah</li>
        <li><code>player.setEnergy(value)</code>: Value merupakan integer(boleh berupa ekspresi). Mengubah nilai energy player.
        </ul>
        `,
        beforetemplate: 
        `a=1\nb=1\n//Ketikan player.setEnergy(a+b) untuk menbambahkan energi\nfunction main() {
        `,
        aftertemplate:
        `\nsetEnergy(c)\n}
        `

    },
    {
        levelNumber: 2,
        map: map2,
        description: `Nah, sekarang kamu sudah mengetahui cara untuk bergerak, 
        untuk level 2 ini kamu akan diberikan energy yang banyak, silahkan bereksperimen dengan command move().
        Sebagai perhatian box biru disekitar player (bola kuning) jika tertabrak akan menyebabkan player kalah
        dan mengubah level menjadi level 1. Jadi berhati-hatilah saat memberikan instruksi <code>move()</code>.
        Berikut instruksi yang dapat kamu gunakan :
        <ul>
        <li><code>move('right')</code>: Bola bergerak ke kanan</li>
        <li><code>move('left')</code>: Bola bergerak ke kiri</li>
        <li><code>move('up')</code>: Bola bergerak ke atas</li>
        <li><code>move('down')</code>: Bola bergerak ke bawah</li>
        <li><code>player.setEnergy(value)</code>: Value merupakan integer(boleh berupa ekspresi). Mengubah nilai energy player.
        </ul>
        Sebagai tambahan opsional, kamu bisa mengambil pellet berwarna putih yang tersebar di map.
        Selamat berekplorasi.
        `,
        beforetemplate: 
        `function main() {
        `,
        aftertemplate:
        `}
        `
    }
]