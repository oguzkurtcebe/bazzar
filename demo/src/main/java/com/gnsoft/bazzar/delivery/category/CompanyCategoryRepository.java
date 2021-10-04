package com.gnsoft.bazzar.delivery.category;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyCategoryRepository extends MongoRepository<CompanyCategory, String> {

	Page<CompanyCategory> findByCompanyId(Pageable page, String companyId);

	List<CompanyCategory> findByCompanyId(String companyId);
}
