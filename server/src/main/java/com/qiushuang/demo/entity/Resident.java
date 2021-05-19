package com.qiushuang.demo.entity;

import lombok.Data;

/**
 * @author :zhangyi
 * @description:
 * @date :2021/5/19 10:17
 */
@Data
public class Resident {
    private Integer id;
    private String name;
    private Boolean sex;
    private Integer age;
    private Integer hometown;
    private Integer educationLevel;
    private Integer profession;
    private Integer height;
    private Integer weight;
}
