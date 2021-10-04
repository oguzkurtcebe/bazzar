package com.gnsoft.bazzar.delivery.adress;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AddressRepository extends MongoRepository<Address, String> {
	
	List<Address> findByMobileNumber(String mobileNumber);

}
