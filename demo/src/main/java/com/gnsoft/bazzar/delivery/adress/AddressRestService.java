package com.gnsoft.bazzar.delivery.adress;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/delivery")
public class AddressRestService {

	@Autowired
	private AddressService addressService;

	@GetMapping("/address")
	public ResponseEntity<List<Address>> getUsers(@RequestParam("mobileNumber") String mobileNumber) {
		List<Address> list = addressService.findAddress(mobileNumber);
		return ResponseEntity.ok(list);
	}

	@PostMapping("/address")
	public ResponseEntity<?> saveAddress(@RequestBody Address address) {
		try {
			addressService.saveAddress(address);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@GetMapping("/addresses")
	public ResponseEntity<Page<Address>> getAddresses(Pageable page) {
		Page<Address> list = addressService.listAddress(page);
		return ResponseEntity.ok(list);
	}

}
