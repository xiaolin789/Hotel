/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : hotel

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 07/04/2024 21:54:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for hotel_banner
-- ----------------------------
DROP TABLE IF EXISTS `hotel_banner`;
CREATE TABLE `hotel_banner`  (
  `ban_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '标题',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '图片路径',
  `status` int NULL DEFAULT NULL COMMENT '0：下架 1：上架',
  PRIMARY KEY (`ban_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotel_banner
-- ----------------------------
INSERT INTO `hotel_banner` VALUES (2, '大促销', '/banneruploads/ef0b76bae9102cef1fd6606e0f6cba0c', 1);
INSERT INTO `hotel_banner` VALUES (3, '大降价', '/banneruploads/11afee9100782b26518b916840d886ea', 1);

-- ----------------------------
-- Table structure for hotel_food
-- ----------------------------
DROP TABLE IF EXISTS `hotel_food`;
CREATE TABLE `hotel_food`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `price` decimal(10, 0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotel_food
-- ----------------------------
INSERT INTO `hotel_food` VALUES (4, '黑椒鸡扒', '肉质嫩滑，非常好吃', '/fooduploads/90519285f3fde7a2ed33350e47b376cf', 30);
INSERT INTO `hotel_food` VALUES (5, '黑椒猪扒', '肉质嫩滑，非常好吃', '/fooduploads/98b9df3f86428d14a97711ec6b5fffd3', 30);
INSERT INTO `hotel_food` VALUES (6, '黑椒牛扒', '肉质嫩滑，非常好吃', '/fooduploads/a22ecc51521938381e73519a368c7d46', 50);
INSERT INTO `hotel_food` VALUES (7, '龙虾套餐', '肉质鲜嫩，非常好吃', '/fooduploads/e2702394d988806ca71eb78b32a1866b', 399);

-- ----------------------------
-- Table structure for hotel_info
-- ----------------------------
DROP TABLE IF EXISTS `hotel_info`;
CREATE TABLE `hotel_info`  (
  `info_id` int NOT NULL AUTO_INCREMENT COMMENT '客房id',
  `info_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '客房类型',
  `info_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '客房名称',
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '客房图片',
  `info_details` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '详情',
  `info_price` decimal(18, 0) NULL DEFAULT NULL COMMENT '价格',
  `info_order` int NULL DEFAULT NULL COMMENT '房间号',
  `info_status` int NULL DEFAULT NULL COMMENT '客房状态',
  `info_recommed` int NULL DEFAULT NULL COMMENT '热推',
  `info_service` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '服务',
  `info_book` int NULL DEFAULT NULL,
  PRIMARY KEY (`info_id`) USING BTREE,
  INDEX `info_order`(`info_order` ASC) USING BTREE,
  INDEX `service_id`(`info_service` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotel_info
-- ----------------------------
INSERT INTO `hotel_info` VALUES (30, '单人间', '标准单人间', '/roomuploads/21bee937ddd89e131f7b5645e3007921', '环境非常好，整洁卫生', 99, 101, 1, 3, '\"热水器,WiFi,吹风机,热水\"', 0);
INSERT INTO `hotel_info` VALUES (31, '单人间', '豪华单人间', '/roomuploads/7668ac89d40090cbeb40a9de400bcb53', '环境非常好，整洁卫生', 299, 110, 1, 3, '\"吹风机,WiFi,热水,热水器,停车场,电梯\"', 0);
INSERT INTO `hotel_info` VALUES (33, '单人间', '豪华单人间', '/roomuploads/a6a94da58d2debb35505baec591e1f74', '环境非常好，整洁卫生', 299, 110, 1, 3, '\"吹风机,WiFi,热水器,热水,电梯,停车场\"', 0);
INSERT INTO `hotel_info` VALUES (34, '双人间', '标准双人间', '/roomuploads/4cd9a24280010a90c2957ee5cda21ec6', '环境非常好，整洁卫生', 166, 120, 1, 3, '\",热水器,WiFi,吹风机,热水\"', 1);
INSERT INTO `hotel_info` VALUES (38, '双人间', '标准双人间', '/roomuploads/2ee4cfffbd7e31fceff60e2bea58ab84', '环境非常好，整洁卫生', 166, 121, 1, 3, '\"吹风机,WiFi,热水器,热水\"', 0);
INSERT INTO `hotel_info` VALUES (39, '双人间', '豪华双人间', '/roomuploads/776ce1d48ecd2811c194e3263c8b98c7', '环境非常好，整洁卫生', 499, 130, 1, 3, '\"吹风机,WiFi,热水器,电梯,停车场,热水\"', 0);
INSERT INTO `hotel_info` VALUES (40, '双人间', '豪华双人间', '/roomuploads/45eaa481357a793deeab84cd60aaa452', '环境非常好，干净卫生', 499, 131, 1, 3, '\",热水器,WiFi,热水,停车场,吹风机,电梯\"', 0);
INSERT INTO `hotel_info` VALUES (41, '三人间', '标准三人间', '/roomuploads/21eda301310682545e3b47579d7b5822', '环境非常好，干净卫生', 266, 140, 1, 3, '\"热水器,WiFi,吹风机,热水,停车场\"', 0);
INSERT INTO `hotel_info` VALUES (42, '三人间', '标准三人间', '/roomuploads/0f15af402232399ac1a5f45c5e7d6e87', '环境非常好，干净卫生', 266, 141, 1, 3, '\"热水器,WiFi,吹风机,热水,停车场\"', 0);
INSERT INTO `hotel_info` VALUES (43, '三人间', '豪华三人间', '/roomuploads/3988ced3969639e35e85b6461509a72d', '环境非常好，干净卫生', 599, 150, 1, 3, '\"热水器,WiFi,吹风机,热水,停车场,电梯,保险柜\"', 0);
INSERT INTO `hotel_info` VALUES (44, '三人间', '豪华三人间', '/roomuploads/9afd6911079552fd8200960897e0a30f', '环境非常好，干净卫生', 599, 151, 1, 4, '\"热水器,WiFi,吹风机,热水,停车场,电梯,保险柜\"', 0);
INSERT INTO `hotel_info` VALUES (45, '豪华套间', '商务间', '/roomuploads/19f439ad1a20a2f9afa93676c135f8d7', '环境非常好，干净卫生', 799, 160, 1, 3, '\"热水器,电梯,保险柜,国内长途电话,吹风机,WiFi,热水,停车场\"', 0);
INSERT INTO `hotel_info` VALUES (46, '豪华套间', '商务间', '/roomuploads/e442295bb2f3e8bdea5cbe2e0e2e6350', '环境非常好，干净卫生', 799, 161, 1, 3, '\"热水器,电梯,保险柜,国内长途电话,吹风机,WiFi,热水,停车场\"', 0);
INSERT INTO `hotel_info` VALUES (47, '总统套房', '总统间', '/roomuploads/58d4153c65964bb33f6c31711a00cd64', '环境非常好，干净卫生', 2999, 998, 1, 3, '\"热水器,电梯,会议室,保险柜,WiFi,吹风机,国内长途电话,热水,国际长途电话,停车场\"', 0);
INSERT INTO `hotel_info` VALUES (48, '总统套房', '总统间', '/roomuploads/c9d6bf9cbbcc283daba8ea3fefa5e373', '环境非常好，干净卫生', 2999, 999, 1, 3, '\"热水器,电梯,会议室,保险柜,WiFi,吹风机,国内长途电话,热水,国际长途电话,停车场\"', 0);

-- ----------------------------
-- Table structure for hotel_service
-- ----------------------------
DROP TABLE IF EXISTS `hotel_service`;
CREATE TABLE `hotel_service`  (
  `service_id` int NOT NULL AUTO_INCREMENT COMMENT '服务id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '名称',
  `order_num` int NULL DEFAULT NULL,
  PRIMARY KEY (`service_id`) USING BTREE,
  INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotel_service
-- ----------------------------
INSERT INTO `hotel_service` VALUES (1, '热水器', 1);
INSERT INTO `hotel_service` VALUES (2, 'WiFi', 2);
INSERT INTO `hotel_service` VALUES (4, '吹风机', 3);
INSERT INTO `hotel_service` VALUES (5, '热水', 4);
INSERT INTO `hotel_service` VALUES (6, '停车场', 5);
INSERT INTO `hotel_service` VALUES (7, '电梯', 6);
INSERT INTO `hotel_service` VALUES (8, '保险柜', 7);
INSERT INTO `hotel_service` VALUES (9, '国内长途电话', 8);
INSERT INTO `hotel_service` VALUES (10, '国际长途电话', 9);
INSERT INTO `hotel_service` VALUES (11, '会议室', 10);

-- ----------------------------
-- Table structure for hotel_suggest
-- ----------------------------
DROP TABLE IF EXISTS `hotel_suggest`;
CREATE TABLE `hotel_suggest`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `create_time` datetime NULL DEFAULT NULL,
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotel_suggest
-- ----------------------------
INSERT INTO `hotel_suggest` VALUES (1, '很满意', '2024-03-03 17:13:32', NULL);
INSERT INTO `hotel_suggest` VALUES (2, '非常好', '2024-03-03 17:14:01', NULL);

-- ----------------------------
-- Table structure for hotel_type
-- ----------------------------
DROP TABLE IF EXISTS `hotel_type`;
CREATE TABLE `hotel_type`  (
  `type_id` int NOT NULL AUTO_INCREMENT COMMENT '类型id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `order_num` int NULL DEFAULT NULL COMMENT '序号',
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hotel_type
-- ----------------------------
INSERT INTO `hotel_type` VALUES (1, '单人间', 1);
INSERT INTO `hotel_type` VALUES (2, '双人间', 2);
INSERT INTO `hotel_type` VALUES (3, '三人间', 3);
INSERT INTO `hotel_type` VALUES (5, '豪华套间', 4);
INSERT INTO `hotel_type` VALUES (6, '总统套房', 5);

-- ----------------------------
-- Table structure for into_order
-- ----------------------------
DROP TABLE IF EXISTS `into_order`;
CREATE TABLE `into_order`  (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `sex` int NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `card` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  `leave_time` datetime NULL DEFAULT NULL,
  `info_book` int NULL DEFAULT NULL,
  `price` decimal(18, 2) NULL DEFAULT NULL,
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `info_code` int NULL DEFAULT NULL,
  `room_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `info_code`(`info_code` ASC) USING BTREE,
  CONSTRAINT `info_code` FOREIGN KEY (`info_code`) REFERENCES `hotel_info` (`info_order`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of into_order
-- ----------------------------
INSERT INTO `into_order` VALUES (14, '阿二', 4, '1223423234', '14234234213', '2024-02-28 21:45:30', '2024-03-04 17:39:45', 0, 199.00, '王五', NULL, 31);
INSERT INTO `into_order` VALUES (15, '阿大', 3, '1242312312', '1234123123', '2024-03-04 17:39:13', '2024-03-04 17:39:45', 0, 99.00, '李四', NULL, 28);

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` int NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `role_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '角色名称',
  `remark` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_cs_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (22, '系统管理员', '系统管理员', '2024-01-14 16:26:40', '2024-01-15 21:59:16');
INSERT INTO `sys_role` VALUES (23, '员工', '员工', '2024-01-15 00:43:15', '2024-02-04 18:42:45');

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '登录账号',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '登录密码',
  `phone` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '用户电话',
  `email` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '邮箱',
  `role` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '角色',
  `sex` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '0:男 1:女',
  `salary` decimal(18, 2) NULL DEFAULT NULL COMMENT '薪水',
  `nick_name` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_cs_0900_as_cs NULL DEFAULT NULL COMMENT '姓名',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_cs_0900_as_cs ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (16, 'ccc', '123', '123123121', '342341231@qq.com', '0', '0', 5000.00, '王五', '2024-01-16 15:24:34', NULL);
INSERT INTO `sys_user` VALUES (18, 'admin', 'admin', '1', '1', '1', '0', 1.00, '系统管理员', '2024-01-16 21:18:29', '2024-03-18 16:26:37');

-- ----------------------------
-- Table structure for user_food
-- ----------------------------
DROP TABLE IF EXISTS `user_food`;
CREATE TABLE `user_food`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `room` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `num` int NULL DEFAULT NULL,
  `order_time` datetime NULL DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `foodname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `status` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_food
-- ----------------------------
INSERT INTO `user_food` VALUES (6, 'oC8sa6lSofmKI2-k3XH5d0CwD168', '小林', '11232123', '101', 1, '2024-04-07 11:45:13', '/fooduploads/e2702394d988806ca71eb78b32a1866b', '龙虾套餐', 0);

-- ----------------------------
-- Table structure for wx_user
-- ----------------------------
DROP TABLE IF EXISTS `wx_user`;
CREATE TABLE `wx_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `book_time` datetime NULL DEFAULT NULL,
  `to_time` datetime NULL DEFAULT NULL,
  `leave_time` datetime NULL DEFAULT NULL,
  `book` int NULL DEFAULT NULL,
  `room_id` int NULL DEFAULT NULL,
  `room_code` int NULL DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of wx_user
-- ----------------------------
INSERT INTO `wx_user` VALUES (19, 'oC8sa6lSofmKI2-k3XH5d0CwD168', 'lll', '123', '2024-03-18 03:51:28', '2024-03-27 03:51:27', NULL, 1, 28, 100, '/roomuploads/d91b642c5b216e221bb633275ac534f0');

SET FOREIGN_KEY_CHECKS = 1;
