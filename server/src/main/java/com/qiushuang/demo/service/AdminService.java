package com.qiushuang.demo.service;

import com.qiushuang.demo.entity.Admin;
import org.springframework.stereotype.Service;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:43
 */
@Service
public interface AdminService {
    int addAdmin(Admin admin);

    String getPassword(String adminId);

    int updatePassword(Admin admin);
}
