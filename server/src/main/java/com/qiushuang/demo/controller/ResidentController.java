package com.qiushuang.demo.controller;

import com.qiushuang.demo.entity.Resident;
import com.qiushuang.demo.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:42
 */
@RestController
@RequestMapping("/residents")
public class ResidentController {

    @Autowired
    private ResidentService residentService;


    /**
     * @description:
     * @param resident:将要添加的resident
     * @return:
     */
    @RequestMapping(value = "/addResident",method = RequestMethod.POST)
    public boolean addResident(@RequestBody Resident resident){
        return residentService.addResident(resident)>0;
    }

    /**
     * @description:根据ResidentId删除Resident
     * @param id
     * @return:
     */
    @RequestMapping(value = "/deleteResidentById/{id}",method = RequestMethod.DELETE)
    public boolean deleteResidentById(@PathVariable("id") int id){
        return residentService.deleteResidentById(id)>0;
    }

    /**
     * @description:根据ResidentIdList删除Resident
     * @param idList
     * @return:
     */
    @RequestMapping(value = "/deleteResidentByIdList",method = RequestMethod.DELETE)
    public int deleteResidentByIdList(@RequestBody List<Integer> idList){
        return residentService.deleteResidentByIdList(idList);
    }

    /**
     * @description:
     * @param resident 将要更新的Resident
     * @return:
     */
    @RequestMapping(value = "/updateResident",method = RequestMethod.PUT)
    public boolean updateResident(@RequestBody Resident resident){
        return residentService.updateResident(resident)>0;
    }

    /**
     * @description:根据页数获取Resident
     * @param page
     * @return:
     */
    @RequestMapping(value = "/getResidentsByPage/{page}",method = RequestMethod.GET)
    public List<Resident> getResidentsByPage(@PathVariable("page") int page){
        return residentService.getResidentsByPages(page);
    }

    /**
     * @description:根据条件和页数批量获取Resident信息
     * @param page
     * @param sex
     * @param name
     * @param hometown
     * @return:
     */
    @RequestMapping(value = "/getResidentsByPageWithCondition/{page}",method = RequestMethod.GET)
    public List<Resident> getResidentByPageWithCondition(@PathVariable("page") int page,int sex,String name,int hometown){

        Boolean sexTemp;//将数字类型的查询参数转换为数据库对应的数据类型
        if (sex==-1)
            sexTemp=null;
        else
            sexTemp=sex==0?false:true;
        Integer hometownTemp=hometown==-1?null:hometown;
        String nameTemp=name.length()==0?null:name;
        return residentService.getResidentByPagesWithCondition(page,sexTemp,nameTemp,hometownTemp);
    }

    /**
     * @description:获取系统的Resident的总数量
     * @return:
     */
    @RequestMapping(value = "/getPages",method = RequestMethod.GET)
    public int getPages(){
        return residentService.getPageNumber();
    }

    /**
     * @description:获取系统中满足条件的Resident的总数量
     * @param sex
     * @param name
     * @param hometown
     * @return:
     */
    @RequestMapping(value = "/getPagesWithCondition",method = RequestMethod.GET)
    public int getPagesWithCondition(int sex,String name,int hometown){
        Boolean sexTemp;
        if (sex==-1)
            sexTemp=null;
        else
            sexTemp=sex==0?false:true;
        Integer hometownTemp=hometown==-1?null:hometown;
        String nameTemp=name.length()==0?null:name;
        return residentService.getPageNumberWithCondition(sexTemp,nameTemp,hometownTemp);
    }

    /**
     * @description:根据ResidentId获取Resident信息
     * @param id
     * @return:
     */
    @RequestMapping(value = "getResidentById/{id}",method = RequestMethod.GET)
    public Resident getResidentById(@PathVariable("id") int id){
        return residentService.getResidentById(id);
    }
}
