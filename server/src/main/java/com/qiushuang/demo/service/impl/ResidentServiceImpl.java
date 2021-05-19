package com.qiushuang.demo.service.impl;

import com.qiushuang.demo.dao.ResidentDao;
import com.qiushuang.demo.entity.Resident;
import com.qiushuang.demo.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:44
 */
@Service
public class ResidentServiceImpl implements ResidentService {
    @Autowired
    private ResidentDao residentDao;

    public static final int  numOfPerPages=5;

    @Override
    public int addResident(Resident resident) {
        System.out.println(residentDao.toString());
        resident.setId(residentDao.getMaxId()+1);
        return residentDao.addResident(resident);
    }

    @Override
    public int deleteResidentById(int id) {
        return residentDao.deleteResidentById(id);
    }

    @Override
    public int deleteResidentByIdList(List<Integer> idList) {
        int ans=0;
        for (Integer personId:idList) {
            ans+=residentDao.deleteResidentById(personId);
        }
        return ans;
    }

    @Override
    public int updateResident(Resident resident) {
        return residentDao.updateResident(resident);
    }

    @Override
    public List<Resident> getResidentsByPages(int page) {
        int startRows=(page-1)*numOfPerPages;
        return residentDao.getResidentByPage(startRows);
    }

    @Override
    public List<Resident> getResidentByPagesWithCondition(int page, Boolean sex, String name, Integer hometown) {
        int startRows=(page-1)*numOfPerPages;
        if(name!=null){
            name="%"+name+"%";
        }
        return residentDao.getResidentByPageWithCondition(startRows,sex,name,hometown);
    }

    @Override
    public int getPageNumber() {
        return residentDao.getResidentNumbers();
    }

    @Override
    public int getPageNumberWithCondition(Boolean sex, String name, Integer hometown) {
        if(name!=null)
            name="%"+name+"%";
        return residentDao.getResidentNumbersWithCondition(sex,name,hometown);
    }

    @Override
    public Resident getResidentById(int id) {
        return residentDao.getResidentById(id);
    }



    public void setResidentDao(ResidentDao residentDao) {
        this.residentDao=residentDao;
    }
}
