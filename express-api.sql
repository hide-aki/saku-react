-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Mar 2020 pada 16.05
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express-api`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `coa`
--

CREATE TABLE `coa` (
  `no_coa` varchar(255) NOT NULL,
  `nama` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `coa`
--

INSERT INTO `coa` (`no_coa`, `nama`) VALUES
('1101', 'Kas'),
('1102', 'Persediaan Barang Dagang'),
('4000', 'Penjualan'),
('4401', 'Retur Penjualan'),
('4402', 'Potongan Penjualan'),
('5000', 'Pembelian'),
('5501', 'Beban Angkut Pembelian'),
('5502', 'Potongan Pembelian');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_pembelian`
--

CREATE TABLE `detail_pembelian` (
  `id` int(11) NOT NULL,
  `id_transaksi` varchar(255) DEFAULT NULL,
  `id_produk` varchar(255) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jurnal`
--

CREATE TABLE `jurnal` (
  `id` int(11) NOT NULL,
  `id_transaksi` varchar(255) DEFAULT NULL,
  `no_coa` varchar(255) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembelian`
--

CREATE TABLE `pembelian` (
  `id_transaksi` varchar(255) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `id_produk` varchar(255) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `harga_jual` int(11) DEFAULT NULL,
  `harga_beli` int(11) NOT NULL,
  `stok` int(11) DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`id_produk`, `nama`, `harga_jual`, `harga_beli`, `stok`, `deskripsi`) VALUES
('PRD000001', 'Sampoerna A-Mild', 14000, 7000, 0, '-'),
('PRD000002', 'Djarum Super', 13500, 6750, 0, '-'),
('PRD000003', 'Gudang Garam', 15000, 7500, 0, '-'),
('PRD000004', 'Indomie Goreng', 2500, 1250, 0, '-'),
('PRD000005', 'Indomie Kari Ayam', 2000, 1000, 0, '-'),
('PRD000006', 'Mie Sedap Goreng', 3000, 1500, 0, '-'),
('PRD000007', 'Mie Goreng Kari Spesial', 3500, 1750, 0, '-'),
('PRD000008', 'Sari Roti Sandwich', 5000, 2500, 0, '-'),
('PRD000009', 'Lifeboy sabun batang', 2000, 1000, 0, '-'),
('PRD000010', 'Clear shampoo', 1000, 500, 0, '-'),
('PRD000011', 'Pepsodent blue mint', 3000, 1500, 0, '-'),
('PRD000012', 'Dove white', 1500, 750, 0, '-'),
('PRD000013', 'Pensil Faber Custel', 4000, 2000, 0, '-'),
('PRD000014', 'Pulpen Pilot', 3000, 1500, 0, '-'),
('PRD000015', 'Beras 1 kg', 5000, 2500, 0, '-'),
('PRD000016', 'Royco ayam', 1000, 500, 0, '-'),
('PRD000017', 'Royco sapi', 1500, 750, 0, '-'),
('PRD000018', 'Gula putih 1 kg', 4000, 2000, 0, '-'),
('PRD000019', 'Gula merah 1 kg', 3000, 1500, 0, '-'),
('PRD000020', 'Aqua 1000 ml', 3000, 1500, 0, '-'),
('PRD000021', 'Vit 1000 ml', 2000, 1000, 0, '-'),
('PRD000022', 'Amidis 1000 ml', 1500, 750, 0, '-'),
('PRD000023', 'Teh Botol 500 ml', 4000, 2000, 0, '-'),
('PRD000024', 'Fruit tea 500 ml', 3500, 1750, 0, '-'),
('PRD000025', 'Good Day 500 ml', 5000, 2500, 0, '-');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` varchar(255) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `coa`
--
ALTER TABLE `coa`
  ADD PRIMARY KEY (`no_coa`);

--
-- Indeks untuk tabel `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `jurnal`
--
ALTER TABLE `jurnal`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- Indeks untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `jurnal`
--
ALTER TABLE `jurnal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
