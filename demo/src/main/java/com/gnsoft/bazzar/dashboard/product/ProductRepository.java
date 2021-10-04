package com.gnsoft.bazzar.dashboard.product;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

	Product findBy_id(String _id);

	List<Product> findByCategoryId(String categoryId);
	
	List<Product> findBySubCategoryId(String subCategoryId, Pageable page);

	Product findByBarcodeId(String barcodeId);

	List<Product> findByTitleLikeIgnoreCase(String title);

// @Query("UPDATE Product u SET u.status = true")
//	@Query("update Product u set u.status = true where u.title = Ekmek")
//	@Query("select p from Product where p.title='Ekmek'")
//	Product StatusSetTrue();
}
