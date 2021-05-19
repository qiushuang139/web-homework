package com.qiushuang.demo.service.impl;

import com.qiushuang.demo.dao.AdminDao;
import com.qiushuang.demo.entity.Admin;
import com.qiushuang.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:43
 */
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminDao adminDao;

    @Override
    public int addAdmin(Admin admin) {
        int temp=adminDao.getAdmin(admin.getAdminId());
        if(temp>=1)
            return 0;
        return adminDao.addAdmin(admin);
    }

    @Override
    public String getPassword(String adminId) {
        return adminDao.getPassword(adminId);
    }

    @Override
    public int updatePassword(Admin admin) {
        return adminDao.updatePassword(admin);
    }

    public void setAdminDao(AdminDao adminDao) {
        this.adminDao=adminDao;
    }
}
