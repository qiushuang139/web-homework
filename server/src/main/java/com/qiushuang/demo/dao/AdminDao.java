package com.qiushuang.demo.dao;

import com.qiushuang.demo.entity.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:44
 */
@Mapper
public interface AdminDao {
    int addAdmin(Admin admin);

    int updatePassword(Admin admin);


    String getPassword(@Param("adminId") String adminId);

    int getAdmin(@Param("adminId") String adminId);
}
