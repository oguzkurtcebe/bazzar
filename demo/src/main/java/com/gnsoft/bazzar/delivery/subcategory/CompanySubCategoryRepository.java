package com.gnsoft.bazzar.delivery.subcategory;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CompanySubCategoryRepository extends MongoRepository<CompanySubCategory, String>{

	List<CompanySubCategory> findByCategoryId(String id);
	

}
