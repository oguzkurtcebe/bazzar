package com.gnsoft.bazzar.courier;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gnsoft.bazzar.exception.NotFoundException;

@RequestMapping("/courier") 
@RestController
public class CourierRestService {

	@Autowired
	private CourierService courierService;

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN','BAZZAR_ADMIN')")
	@GetMapping("/couriers")
	public Page<Courier> getCouriers(Pageable page) {
		return courierService.findCouriers(page);
	}

	@GetMapping("/courier/{id}")
	public ResponseEntity<Optional<Courier>> getCourier(@PathVariable("id") String id) {

		try {
			Optional<Courier> courier = courierService.findCourierById(id);
			return ResponseEntity.ok(courier);

		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@DeleteMapping("/courier/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteCourier(@PathVariable("id") String id) {
		try {
			courierService.findCourierById(id);
			courierService.deleteCourier(id);
		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new InternalError(ex);
		}

	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PutMapping("/courier/{id}")
	public ResponseEntity<?> updateCourier(@PathVariable("id") String id, @RequestBody Courier courier) {

		try {

			Courier updateCourier = courierService.findCourierById(id).orElse(courier);
			updateCourier.setFirstName(courier.getFirstName());
			updateCourier.setLastName(courier.getLastName());
			updateCourier.setEmail(courier.getEmail());
			updateCourier.setMobileNumber(courier.getMobileNumber());
			courierService.updateCourier(updateCourier);

			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/courier/search")
	public ResponseEntity<List<Courier>> findCourierByLastNameOrFirstName(@RequestParam("ln") String lastName,
			@RequestParam("fn") String firstName) {

		List<Courier> list = courierService.findCourierByLastNameOrFirstNameAll(lastName, firstName);

		return ResponseEntity.ok(list);

	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN','BAZZAR_ADMIN')")
	@PutMapping("/status/{id}")
	public void updateStatusCourier(@PathVariable("id") String id, Courier courier) {
		try {

			Courier courier2 = courierService.findCourierById(id).orElse(courier);
			if (courier2.isStatus()) {
				courier2.setStatus(false);
				courierService.updateCourier(courier2);
			}

			else {
				courier2.setStatus(true);
				courierService.updateCourier(courier2);
			}
		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new InternalError(ex);
		}

	}

}
