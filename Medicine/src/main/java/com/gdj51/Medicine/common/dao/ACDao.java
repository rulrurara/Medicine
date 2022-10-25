package com.gdj51.Medicine.common.dao;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ACDao implements IACDao{
	@Autowired
	public SqlSession sqlSession;

	@Override
	public int getInt(String sql) throws Throwable {
		return sqlSession.selectOne(sql);
	}

	@Override
	public int getInt(String sql, HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne(sql, params);
	}

	@Override
	public String getString(String sql) throws Throwable {
		return sqlSession.selectOne(sql);
	}

	@Override
	public String getString(String sql, HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne(sql, params);
	}

	@Override
	public HashMap<String, String> getMap(String sql) throws Throwable {
		return sqlSession.selectOne(sql);
	}

	@Override
	public HashMap<String, String> getMap(String sql, HashMap<String, String> params) throws Throwable {
		return sqlSession.selectOne(sql, params);
	}

	@Override
	public List<HashMap<String, String>> getList(String sql) throws Throwable {
		return sqlSession.selectList(sql);
	}

	@Override
	public List<HashMap<String, String>> getList(String sql, HashMap<String, String> params) throws Throwable {
		return sqlSession.selectList(sql, params);
	}

	@Override
	public int insert(String sql) throws Throwable {
		return sqlSession.insert(sql);
	}

	@Override
	public int insert(String sql, HashMap<String, String> params) throws Throwable {
		return sqlSession.insert(sql, params);
	}

	@Override
	public int update(String sql) throws Throwable {
		return sqlSession.update(sql);
	}

	@Override
	public int update(String sql, HashMap<String, String> params) throws Throwable {
		return sqlSession.update(sql, params);
	}

	@Override
	public int delete(String sql) throws Throwable {
		return sqlSession.delete(sql);
	}

	@Override
	public int delete(String sql, HashMap<String, String> params) throws Throwable {
		return sqlSession.delete(sql, params);
	}

	@Override
	public int insert2(String sql, String params) {
		// TODO Auto-generated method stub
		return sqlSession.insert(sql,params);
	}

	@Override
	public List<HashMap<String, String>> getObject(String sql, Object memnum) {
		return sqlSession.selectList(sql, memnum);
	}

	@Override
	public List<HashMap<String, String>> getList(String sql, String string) {
		return sqlSession.selectList(sql, string);
	}


}

