package com.gnsoft.bazzar.dashboard.orders;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import com.gnsoft.bazzar.dashboard.orders.vm.OrdersVM;


@Service
@Transactional
@Validated
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;

	public Optional<Order> findOrderById(String id) {
		return orderRepository.findById(id);
	}

	public Page<OrdersVM> findOrders(Pageable pageable) {
		Pageable page =	PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
		return orderRepository.findAll(page).map(OrdersVM::new);
	}

	public void deleteOrder(String id) {
		orderRepository.deleteById(id);
	}

	public void updateOrder( Order order) {
		orderRepository.save(order);
	}

	public void saveOrder( Order order) {
		orderRepository.save(order);
	}


}
