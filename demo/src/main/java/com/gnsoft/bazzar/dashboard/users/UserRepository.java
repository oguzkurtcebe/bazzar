package com.gnsoft.bazzar.dashboard.users;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	List<User> findByFirstName(String firstName);

	User findByMobileNumber(String mobileNumber);

	List<User> findByLastNameLikeIgnoreCaseAndFirstNameLikeAllIgnoreCase(String lastName, String firstName);

	
	
	
}
