package com.gdj51.Medicine.common.dao;

import java.util.HashMap;
import java.util.List;

public interface IACDao {
	
	// 숫자 취득
	public int getInt(String sql) throws Throwable;
	public int getInt(String sql, HashMap<String, String> params) throws Throwable;
	
	// 문자열 취득
	public String getString(String sql) throws Throwable;
	public String getString(String sql, HashMap<String, String> params) throws Throwable;
	
	// HashMap 취득
	public HashMap<String, String> getMap(String sql) throws Throwable;
	public HashMap<String, String> getMap(String sql, HashMap<String, String> params) throws Throwable;
	
	// List 취득
	public List<HashMap<String, String>> getList(String sql) throws Throwable;
	public List<HashMap<String, String>> getList(String sql, HashMap<String, String> params) throws Throwable;
	
	// 등록
	public int insert(String sql) throws Throwable;
	public int insert(String sql, HashMap<String, String> params) throws Throwable;
	
	// 수정
	public int update(String sql) throws Throwable;
	public int update(String sql, HashMap<String, String> params) throws Throwable;
	
	// 삭제
	public int delete(String sql) throws Throwable;
	public int delete(String sql, HashMap<String, String> params) throws Throwable;
	
	public int insert2(String string, String string2);
	
	//현철
	public List<HashMap<String, String>> getObject(String string, Object memnum);
	public List<HashMap<String, String>> getList(String sql, String string);
	
}
