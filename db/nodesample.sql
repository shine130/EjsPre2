/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : nodesample

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2021-05-31 15:29:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '新闻列表',
  `newtitle` varchar(255) NOT NULL COMMENT '新闻标题',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '标题1的文本');
INSERT INTO `news` VALUES ('2', '标题2的文本');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `UserName` varchar(64) NOT NULL COMMENT '用户名',
  `UserPass` varchar(64) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', 'test', 'test');
INSERT INTO `userinfo` VALUES ('2', 'test2', 'test2');
INSERT INTO `userinfo` VALUES ('3', 'test3', '8ad8757baa8564dc136c1e07507f4a98');
INSERT INTO `userinfo` VALUES ('4', 'test4', '86985e105f79b95d6bc918fb45ec7727');
INSERT INTO `userinfo` VALUES ('6', 'test5', 'e3d704f3542b44a621ebed70dc0efe13');
INSERT INTO `userinfo` VALUES ('7', 'test6', '4cfad7076129962ee70c36839a1e3e15');
