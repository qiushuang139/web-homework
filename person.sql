CREATE TABLE `admin` (
  `admin_id` varchar(15) NOT NULL COMMENT '用户登录时的账号',
  `password` char(32) DEFAULT NULL COMMENT '用户经过md5加密后的密码',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `resident` (
  `id` int NOT NULL COMMENT '主键，个人的唯一标志',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `sex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别：false男 true女',
  `age` tinyint DEFAULT '20' COMMENT '年龄',
  `hometown` tinyint DEFAULT '0' COMMENT '籍贯：共35种，34个省级行政区+海外',
  `education_level` tinyint DEFAULT '0' COMMENT '教育水平，共9种',
  `profession` tinyint DEFAULT '0' COMMENT '职业，共8类',
  `height` smallint DEFAULT '150' COMMENT '身高 cm',
  `weight` smallint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

