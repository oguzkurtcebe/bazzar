package com.gnsoft.bazzar.courier;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourierRepository extends MongoRepository<Courier, String> {

	Courier findByMobileNumber(String mobileNumber);

	List<Courier> findCourierByLastNameLikeIgnoreCaseAndFirstNameLikeAllIgnoreCase(String lastName, String firstName);
}
