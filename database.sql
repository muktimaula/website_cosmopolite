-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 10:27 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cosmopolite`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categories`
--

CREATE TABLE `tbl_categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_categories`
--

INSERT INTO `tbl_categories` (`id`, `title`, `subtitle`, `created_at`, `updated_at`) VALUES
(3, 'Splash Screen', 'Splash Screen ini adalah bagian saat aplikasi mulai dijalankan dengan memperlihatkan brand logo aplikasi dan mulainya aplikasi.', '2023-12-11 20:17:28', '2023-12-11 20:17:28'),
(4, 'Login & Sign In', 'Sign In, yaitu membuat akun menggunakan email dan password, sementara login akan mengisi email dan password yang sudah terdaftar. Di login juga terdapat pembuatan password baru karena lupa password. Terakhir tedapat login pendukung tentang profil anak.', '2023-12-11 20:23:52', '2023-12-11 20:23:52'),
(5, 'Buku', 'Disini, terdapat rekomendasi buku yang dapat dibaca contohnya buku baru terbit, deskripsi dari buku, rangkuman karya tulis atau rangkuman buku dari salah satu penulis, dan terakhir bagian membaca buku yang bisa dibuat speaker atau mengeluarkan suara.', '2023-12-11 20:24:08', '2023-12-11 20:24:08'),
(6, 'Video', 'Bagian ini adalah rekomendasi dari video atau tampilan home video, deskripsi dari video yang inging ditonton jika di klik videonya, rangkuman karya author atau rangkuman video dari salah satu author, terakhir menonton videonya ditambah dengan teks yang ad', '2023-12-11 20:24:26', '2023-12-11 20:24:26'),
(7, 'Search', 'Search adalah bagian pencarian buku menurut kategori, entah berdasarkan keluaran terbaru, dongeng dan sebagainya, contohnya jika yang dicari keluaran terbaru akan tampil buku-buku keluaran terbaru.', '2023-12-11 20:24:39', '2023-12-11 20:24:39'),
(8, 'Profil Anak', 'Profil anak adalah berisi tentang nama dan umur, lalu berisi buku, video ataupun bookmark yang sementara progress ataupun sudah selesai dibaca.', '2023-12-11 20:24:53', '2023-12-11 20:24:53'),
(9, 'Profil Orang Tua', 'Profil Orang Tua adalah informasi pribadi dari Orang Tua, juga terdapat pengaturan, dapat mempublish karya dan mengontrol akun anak.\r\n\r\n', '2023-12-11 20:25:08', '2023-12-11 20:39:14');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_features`
--

CREATE TABLE `tbl_features` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedbacks`
--

CREATE TABLE `tbl_feedbacks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_feedbacks`
--

INSERT INTO `tbl_feedbacks` (`id`, `user_id`, `feedback`, `created_at`) VALUES
(1, 2, 'Good Nice', '2023-12-09 23:59:45'),
(3, 2, 'Good', '2023-12-10 03:56:26'),
(4, 2, 'test', '2023-12-10 03:58:07'),
(5, 2, 'test', '2023-12-10 04:00:30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jk` varchar(255) DEFAULT NULL,
  `nik` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'pengguna',
  `refresh_token` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `name`, `username`, `email`, `password`, `no_telp`, `alamat`, `tanggal_lahir`, `jk`, `nik`, `image`, `url`, `role`, `refresh_token`) VALUES
(2, 'test', NULL, 'testing@gmail.com', '$2b$10$iCJ6UG.gZ222yeRYGFqAzeMP98qlHQtad7K1IgPXvI4arb2xPm..C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pengguna', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOm51bGwsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6InRlc3RpbmdAZ21haWwuY29tIiwibm9fdGVscCI6bnVsbCwiaWF0IjoxNzAyMzI5MzgyLCJleHAiOjE3MDI0MTU3ODJ9.CkhKfad7KazQPc7FKqv9gS70d0hNcOYKnScCTG_6UBg'),
(3, 'test', NULL, 'testing1@gmail.com', '$2b$10$DIY.R5kxU2FsDOkdTJ56F.QEmqwC6IPDG8B3QABa8DXbjEE0biT8.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'admin', NULL, 'admin@gmail.com', '$2b$10$Z.tZp8ENzjUZFgmeaMPYgOceBQ3mBJZEj2nKy/1SKSlo9U45Z.j/i', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsIm5hbWUiOiJhZG1pbiIsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIm5vX3RlbHAiOm51bGwsImlhdCI6MTcwMjMyODQ5NiwiZXhwIjoxNzAyNDE0ODk2fQ.SaSPdpPkFRLg4G2rWKiBQlDwutyxsYf3sDqVLC6D9bs'),
(8, 'test', NULL, 'testing1@gmail.com', '$2b$10$fhe8g25i9pQIGrX3/gqXSewyMqagjvesNCF1Ls5Sh317GXUGsyR9G', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pengguna', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_features`
--
ALTER TABLE `tbl_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `tbl_feedbacks`
--
ALTER TABLE `tbl_feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_features`
--
ALTER TABLE `tbl_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_feedbacks`
--
ALTER TABLE `tbl_feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_features`
--
ALTER TABLE `tbl_features`
  ADD CONSTRAINT `tbl_features_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `tbl_categories` (`id`);

--
-- Constraints for table `tbl_feedbacks`
--
ALTER TABLE `tbl_feedbacks`
  ADD CONSTRAINT `tbl_feedbacks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
