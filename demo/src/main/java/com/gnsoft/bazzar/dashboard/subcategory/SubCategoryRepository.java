package com.gnsoft.bazzar.dashboard.subcategory;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SubCategoryRepository extends MongoRepository<SubCategory, String>{

	List<SubCategory> findByCategoryId(String id);
	

}
