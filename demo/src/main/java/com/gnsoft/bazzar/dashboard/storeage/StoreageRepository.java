package com.gnsoft.bazzar.dashboard.storeage;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreageRepository extends MongoRepository<Storeage, String> {

	Storeage findByMobileNumber(String mobileNumber);
	
	List<Storeage>findStoreageByLastNameLikeIgnoreCaseAndFirstNameLikeAllIgnoreCase(String lastName,String firstName);
}
