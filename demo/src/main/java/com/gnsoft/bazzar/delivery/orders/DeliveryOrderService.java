package com.gnsoft.bazzar.delivery.orders;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class DeliveryOrderService {

	@Autowired
	private DeliveryOrderRepository orderRepository;

	public List<Order> getOrders() {
		return orderRepository.findAll();
	}

	public List<Order> getOrder(String mobileNumber) {
		return orderRepository.findByMobileNumber(mobileNumber);
	}

	public Page<Order> getOrders(Pageable pageable, String companyId) {
		Pageable page = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "createdAt"));
		return orderRepository.findByCompanyId(page, companyId);
	}

	public List<Order> getOrdersss(String companyId) {
		return orderRepository.findByCompanyId(companyId);
	}

	public void saveOrder(Order order) {
		orderRepository.save(order);
	}

	public void deleteOrder(String id) {
		orderRepository.deleteById(id);
	}

	public void updateOrder(Order order) {
		orderRepository.save(order);
	}

	public Optional<Order> findById(String id) {
		return orderRepository.findById(id);
	}

	public int generatedRondomOrderId() {
		Random rand = new Random(System.currentTimeMillis());

		int rondomId = rand.nextInt();

		if (rondomId <= 0) {
			rondomId = -1 * (rondomId);
		}

		return rondomId;
	}

	public Order findOrderById(int orderId) {
		return orderRepository.findByOrderId(orderId);
	}

}
