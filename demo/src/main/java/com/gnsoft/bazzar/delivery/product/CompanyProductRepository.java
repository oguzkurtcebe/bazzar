package com.gnsoft.bazzar.delivery.product;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyProductRepository extends MongoRepository<CompanyProduct, String> {

	CompanyProduct findBy_id(String _id);
	List<CompanyProduct> findByCategoryId(String categoryId);
	List<CompanyProduct> findByCompanyId(String categoryId);
	List<CompanyProduct> findByTitleLikeIgnoreCase(String title);
}
