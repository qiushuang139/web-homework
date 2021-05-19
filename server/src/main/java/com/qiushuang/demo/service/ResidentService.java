package com.qiushuang.demo.service;

import com.qiushuang.demo.entity.Resident;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:43
 */
@Service
public interface ResidentService {
    int deleteResidentByIdList(List<Integer> idList);

    int deleteResidentById(int id);

    int updateResident(Resident resident);

    List<Resident> getResidentsByPages(int page);

    List<Resident> getResidentByPagesWithCondition(int page, Boolean sexTemp, String nameTemp, Integer hometownTemp);

    int getPageNumber();

    int getPageNumberWithCondition(Boolean sexTemp, String nameTemp, Integer hometownTemp);

    Resident getResidentById(int id);

    int addResident(Resident resident);
}
