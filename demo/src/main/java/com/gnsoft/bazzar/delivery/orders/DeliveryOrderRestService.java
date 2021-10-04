package com.gnsoft.bazzar.delivery.orders;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gnsoft.bazzar.dashboard.companies.Company;
import com.gnsoft.bazzar.exception.NotFoundException;

@RestController
@RequestMapping("/delivery")

public class DeliveryOrderRestService {

	@Autowired
	private DeliveryOrderService orderService;

	@GetMapping("/orders")
	public Page<Order> getOrders(Pageable page) {
		Company company = (Company) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Page<Order> list = orderService.getOrders(page, company.get_id());
		return list;
	}

	@GetMapping("/orders/{mobileNumber}")
	public ResponseEntity<List<Order>> getOrder(@PathVariable("mobileNumber") String mobileNumber) {
		List<Order> orders = orderService.getOrder(mobileNumber);
		return ResponseEntity.ok(orders);
	}

	@GetMapping("/order/{orderId}")
	public ResponseEntity<Order> getOrderById(@PathVariable("orderId") int orderId) {
		Order order = orderService.findOrderById(orderId);

		return ResponseEntity.ok(order);
	}

	@PostMapping("/orders")
	public ResponseEntity<?> saveOrder(@RequestBody Order order) {

		try {
			Company company = (Company) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

			int generatedRondomOrderId = orderService.generatedRondomOrderId();
			order.setOrderId(generatedRondomOrderId);
			order.setCompanyId(company.get_id());
			orderService.saveOrder(order);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DeleteMapping("/orders/{id}")
	public void deleteOrder(@PathVariable("id") String id) {
		try {
			Optional<Order> order = orderService.findById(id);
			orderService.deleteOrder(id);

		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new InternalError(e);
		}
	}

	@PutMapping("/order/{orderId}")
	public void updateOrder(@PathVariable("orderId") int id, @RequestBody Order order) {

		try {
			Order updateOrder = orderService.findOrderById(id);
			updateOrder.setAddress(order.getAddress());
			updateOrder.setCart(order.getCart());
			updateOrder.setGrandTotal(order.getGrandTotal());
			orderService.updateOrder(updateOrder);

		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new InternalError(e);
		}
	}

	@GetMapping("/grandTotal")
	public double getaggregationGrandTotal() {
		Company company = (Company) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<Order> ordersss = orderService.getOrdersss(company.get_id());
		double total = 0.0;
		for (Order order : ordersss) {
			total += order.getGrandTotal();
		}
		return total;
	}

}