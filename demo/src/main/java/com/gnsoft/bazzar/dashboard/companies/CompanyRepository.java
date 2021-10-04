package com.gnsoft.bazzar.dashboard.companies;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {

	Company findByMobileNumber(String mobileNumber);
	
	List<Company>findByCompanyNameLikeIgnoreCase(String companyName);

}
