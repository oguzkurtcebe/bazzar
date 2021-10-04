package com.gnsoft.bazzar.dashboard.orders;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gnsoft.bazzar.dashboard.orders.vm.OrdersVM;
import com.gnsoft.bazzar.exception.NotFoundException;

@RestController
@RequestMapping("/rest")
@Validated
@JsonInclude(value = Include.NON_EMPTY, content = Include.NON_NULL)
public class OrderRestService {
	@Autowired
	private OrderService orderService;

	@GetMapping("/orders")
	public ResponseEntity<Page<OrdersVM>> getOrders(Pageable page) {

		Page<OrdersVM> order = orderService.findOrders(page);
		return ResponseEntity.ok(order);
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@DeleteMapping("order/{id}")
	public void deleteOrder(@PathVariable("id") String id) {
		try {
			orderService.findOrderById(id);
			orderService.deleteOrder(id);

		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new InternalError(e);
		}
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PutMapping("/order/{id}")
	public ResponseEntity<?> updateOrder(@PathVariable("id") String id, @RequestBody Order order) {
		try {

			Order updateOrder = orderService.findOrderById(id).orElse(order);

			if (order.getOrderStatus().equals("PENDING") || order.getOrderStatus().equals("CONFIRMED")
					|| order.getOrderStatus().equals("DELIVERED")) {

				updateOrder.getCart().addAll(order.getCart());
				updateOrder.setGrandTotal(order.getGrandTotal());
				updateOrder.setSubTotal(order.getSubTotal());
				updateOrder.setAddress(order.getAddress());
				orderService.updateOrder(updateOrder);
				return ResponseEntity.status(HttpStatus.OK).build();
			} else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}
		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("order/{id}")
	public ResponseEntity<Optional<Order>> getOrder(@PathVariable("id") String id) {

		Optional<Order> order = orderService.findOrderById(id);

		try {
			return ResponseEntity.ok(order);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}

	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PatchMapping("/orderCart/{id}")
	public ResponseEntity<?> updateOrderCart(@PathVariable("id") String id, @RequestBody Order order) {
		try {

			Order updateOrder = orderService.findOrderById(id).orElse(order);

			if (order.getOrderStatus().equals("PENDING") || order.getOrderStatus().equals("CONFIRMED")) {

				updateOrder.setCart(order.getCart());
				updateOrder.setGrandTotal(order.getGrandTotal());
				updateOrder.setSubTotal(order.getSubTotal());
				updateOrder.setAddress(order.getAddress());
				updateOrder.setProduct(order.getProduct());
				orderService.updateOrder(updateOrder);
				return ResponseEntity.status(HttpStatus.OK).build();
			} else {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
			}
		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/order")
	public ResponseEntity<?> saveOrder(@RequestBody Order order) {
		try {

			orderService.saveOrder(order);
			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}