package com.gnsoft.bazzar.dashboard.users;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import com.gnsoft.bazzar.courier.Courier;
import com.gnsoft.bazzar.courier.CourierRepository;
import com.gnsoft.bazzar.dashboard.companies.Company;
import com.gnsoft.bazzar.dashboard.companies.CompanyRepository;
import com.gnsoft.bazzar.dashboard.storeage.Storeage;
import com.gnsoft.bazzar.dashboard.storeage.StoreageRepository;
import com.gnsoft.bazzar.dashboard.users.vm.UserVM;

@Service
@Transactional
@Validated
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private StoreageRepository storeageRepository;

	@Autowired
	private CourierRepository courierRepository;

	/* ************ User ****************/
	public Optional<User> findUserById(String id) {
		return userRepository.findById(id);
	}

	public Page<UserVM> findUsers(Pageable pageable) {
		Pageable page = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "createdAt"));
		return userRepository.findAll(page).map(UserVM::new);
	}
	/*
	 * public List<UserVM> findUsers() {// return userRepository.findAll(); }
	 */

	public List<User> findUsers(String firstName) {
		return userRepository.findByFirstName(firstName);
	}

	public void saveUser(@Valid User user) {
		userRepository.save(user);
	}

	public void updateUser(User user) {
		userRepository.save(user);
	}

	public User findUserByMobileNumber(String mobileNumber) {
		return userRepository.findByMobileNumber(mobileNumber);
	}

	public void deleteUser(String id) {
		userRepository.deleteById(id);
	}

	public List<User> findByLastNameOrFirstNameAll(String lastName, String firstName) {
		return userRepository.findByLastNameLikeIgnoreCaseAndFirstNameLikeAllIgnoreCase(lastName, firstName);

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByMobileNumber(username);
		Company company = companyRepository.findByMobileNumber(username);
		Storeage storage = storeageRepository.findByMobileNumber(username);
		Courier courier = courierRepository.findByMobileNumber(username);
		if (user != null) {
			return user;
		} else if (company != null) {
			return company;
		} else if (storage != null) {
			return storage;
		} else if (courier != null) {
			return courier;
		} else {
			throw new UsernameNotFoundException("Invalid username or password.");
		}

	}

	public List<User> setRole() {
		List<User> list = userRepository.findAll();
		for (User user : list) {
			user.setRoles(Arrays.asList(new Role("USER")));
			userRepository.save(user);
		}
		return list;
	}

	/* ! ******************************************************* ! */

	/* ****************** Company*********************** */
	public Page<Company> findsCompanies(Pageable pageable) {
		Pageable page = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "createdAt"));
		return companyRepository.findAll(page);
	}

	public Company updateCompany(Company company) {
		return companyRepository.save(company);
	}

	public Optional<Company> findCompanyById(String id) {
		return companyRepository.findById(id);
	}

	public void deleteCompany(String id) {
		companyRepository.deleteById(id);
	}

	public List<Company> findCompanyByCompanyName(String companyName) {
		return companyRepository.findByCompanyNameLikeIgnoreCase(companyName);

	}

	/* ! ******************************************************* ! */

	/* ************* Storage************* */

	public Page<Storeage> findStoreagers(Pageable pageable) {
		Pageable page = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "createdAt"));
		return storeageRepository.findAll(page);
	}

	public Storeage updateStoreage(Storeage storeage) {
		return storeageRepository.save(storeage);
	}

	public Optional<Storeage> findStoreageById(String id) {
		return storeageRepository.findById(id);
	}

	public List<Storeage> findStoreageByLastNameOrFirstNameAll(String lastName, String firstName) {
		return storeageRepository.findStoreageByLastNameLikeIgnoreCaseAndFirstNameLikeAllIgnoreCase(lastName,
				firstName);

	}

	public void deleteStoreage(String id) {
		storeageRepository.deleteById(id);
	}

	/* ! ******************************************************* ! */
}
