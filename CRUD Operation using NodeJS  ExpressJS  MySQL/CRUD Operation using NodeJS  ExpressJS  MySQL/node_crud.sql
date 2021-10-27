SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `university` (
  `id` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `cname` varchar(150) NOT NULL,
  `dname` varchar(150) NOT NULL,
  `iname` varchar(150) NOT NULL,
  `uname` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `university`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `university`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

