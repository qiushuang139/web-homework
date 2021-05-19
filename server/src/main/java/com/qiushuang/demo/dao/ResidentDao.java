package com.qiushuang.demo.dao;

import com.qiushuang.demo.entity.Resident;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:45
 */
@Mapper
public interface ResidentDao {

    Integer getMaxId();

    int addResident(Resident resident);

    int deleteResidentById(int id);

    int updateResident(Resident resident);

    List<Resident> getResidentByPage(int startRows);

    List<Resident> getResidentByPageWithCondition(int startRows, Boolean sex, String name, Integer hometown);

    int getResidentNumbers();

    int getResidentNumbersWithCondition(Boolean sex, String name, Integer hometown);

    Resident getResidentById(int id);
}
