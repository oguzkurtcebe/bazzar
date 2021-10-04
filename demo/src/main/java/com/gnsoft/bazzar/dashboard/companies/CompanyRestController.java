package com.gnsoft.bazzar.dashboard.companies;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gnsoft.bazzar.dashboard.users.Role;
import com.gnsoft.bazzar.dashboard.users.UserService;
import com.gnsoft.bazzar.delivery.adress.AddressService;
import com.gnsoft.bazzar.exception.NotFoundException;

@RestController
@RequestMapping("/restaurant")
public class CompanyRestController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private AddressService addressService;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private CompanyRepository companyRepository;

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN','BAZZAR_ADMIN')")
	@GetMapping("/companies")
	public Page<Company> getCompanies(Pageable page) {
		return userService.findsCompanies(page);
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PutMapping("/company/{id}")
	public ResponseEntity<?> updateCompany(@PathVariable("id") String id, @RequestBody Company company) {

		try {

			Company updateCompany = userService.findCompanyById(id).orElse(company);
			updateCompany.setCompanyName(company.getCompanyName());
			updateCompany.setEmail(company.getEmail());
			updateCompany.setMobileNumber(company.getMobileNumber());
			updateCompany.setAddress(company.getAddress());
			userService.updateCompany(updateCompany);

			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/company/{id}")
	public ResponseEntity<Optional<Company>> getCompany(@PathVariable("id") String id) {

		try {
			Optional<Company> company = userService.findCompanyById(id);
			return ResponseEntity.ok(company);

		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@DeleteMapping("/company/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteCompany(@PathVariable("id") String id) {
		try {
			userService.findCompanyById(id);
			userService.deleteCompany(id);
		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new InternalError(ex);
		}

	}

	@GetMapping("/company/search")
	public ResponseEntity<List<Company>> findCompanyByLastNameOrFirstName(@RequestParam("cn") String companyName) {

		List<Company> list = userService.findCompanyByCompanyName(companyName);
		return ResponseEntity.ok(list);

	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PutMapping("/companyStatus/{id}")
	public void updateStatusCompany(@PathVariable("id") String id, Company company) {
		try {

			Company company2 = userService.findCompanyById(id).orElse(company);
			if (company2.isStatus()) {
				company2.setStatus(false);
				userService.updateCompany(company2);
			}

			else {
				company2.setStatus(true);
				userService.updateCompany(company2);
			}
		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new InternalError(ex);
		}

	}

	
	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PostMapping("/restaurant-add")
	public ResponseEntity<?> registrationRt_AdminAccount(@RequestBody Company company) {

		try {

			Company company2 = new Company(company.getCompanyName(), company.getMobileNumber(),
					passwordEncoder.encode(company.getPassword()), company.getEmail(), company.getAddress(),
					Arrays.asList(new Role("RT_ADMIN")));

			company2.setStatus(true);
			addressService.saveAddress(company2.getAddress());
			companyRepository.save(company2);

			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
