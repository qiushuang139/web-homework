package com.qiushuang.demo.controller;

import com.qiushuang.demo.entity.Admin;
import com.qiushuang.demo.entity.Resident;
import com.qiushuang.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:42
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * @description:向系统中添加User
     * @param admin
     * @return:boolean
     */
    @RequestMapping(value = "/addAdmin",method = RequestMethod.POST)
    public boolean addAdmin(@RequestBody Admin admin){
        return adminService.addAdmin(admin)>0;
    }

    /**
     * @description:登录
     * @param admin 账号及密码
     * @return:boolean
     */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public boolean login(@RequestBody Admin admin){
        try {
            if(adminService.getPassword(admin.getAdminId()).equals(admin.getPassword()))
                return true;
            return false;
        }catch (Exception ex){
            ex.printStackTrace();
            return false;
        }

    }

    /**
     * @description:更新密码
     * @param admin
     * @return:boolean
     */
    @RequestMapping(value = "/updatePassword",method = RequestMethod.PUT)
    public boolean updatePassword(@RequestBody Admin admin){
        return adminService.updatePassword(admin)>0;
    }

}
