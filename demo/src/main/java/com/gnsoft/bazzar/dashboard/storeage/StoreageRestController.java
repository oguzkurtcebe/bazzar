package com.gnsoft.bazzar.dashboard.storeage;

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

import com.gnsoft.bazzar.dashboard.users.UserService;
import com.gnsoft.bazzar.exception.NotFoundException;

@RestController
@RequestMapping("/stockman")
public class StoreageRestController {

	@Autowired
	private UserService userService;

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN','BAZZAR_ADMIN')")
	@GetMapping("/storagers")
	public Page<Storeage> getStoragers(Pageable page) {
		return userService.findStoreagers(page);
	}

	@GetMapping("/storager/{id}")
	public ResponseEntity<Optional<Storeage>> getStorager(@PathVariable("id") String id) {

		try {
			Optional<Storeage> storeage = userService.findStoreageById(id);
			return ResponseEntity.ok(storeage);

		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@DeleteMapping("/storager/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteCompany(@PathVariable("id") String id) {
		try {
			userService.findStoreageById(id);
			userService.deleteStoreage(id);
		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new InternalError(ex);
		}

	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PutMapping("/storager/{id}")
	public ResponseEntity<?> updateStorager(@PathVariable("id") String id, @RequestBody Storeage storage) {

		try {

			Storeage updateStoreage = userService.findStoreageById(id).orElse(storage);
			updateStoreage.setFirstName(storage.getFirstName());
			updateStoreage.setLastName(storage.getLastName());
			updateStoreage.setEmail(storage.getEmail());
			updateStoreage.setMobileNumber(storage.getMobileNumber());
			userService.updateStoreage(updateStoreage);

			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/storeage/search")
	public ResponseEntity<List<Storeage>> findStoreageByLastNameOrFirstName(@RequestParam("ln") String lastName,
			@RequestParam("fn") String firstName) {

		List<Storeage> list = userService.findStoreageByLastNameOrFirstNameAll(lastName, firstName);

		return ResponseEntity.ok(list);

	}
	
	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PutMapping("/storagerStatus/{id}")
	public void updateStatusCompany(@PathVariable("id") String id,  Storeage storeage ) {
		try {
			
		Storeage storeage2 =userService.findStoreageById(id).orElse(storeage);
		if(storeage2.isStatus()) {
			storeage2.setStatus(false);
			userService.updateStoreage(storeage2);
		}
		
		else {
			storeage2.setStatus(true);
			userService.updateStoreage(storeage2);
		}
		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new InternalError(ex);
		}

	}


}
