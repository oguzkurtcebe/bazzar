package com.gnsoft.bazzar.delivery.orders;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryOrderRepository extends MongoRepository<Order, String> {

	Page<Order> findByCompanyId(Pageable page, String companyId);

	List<Order> findByMobileNumber(String mobileNumber);

	List<Order> findByCompanyId(String companyId);

	Order findByOrderId(int orderId);

}
