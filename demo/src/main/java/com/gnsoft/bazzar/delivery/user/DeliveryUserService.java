package com.gnsoft.bazzar.delivery.user;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gnsoft.bazzar.dashboard.users.Role;
import com.gnsoft.bazzar.dashboard.users.User;
import com.gnsoft.bazzar.dashboard.users.UserRepository;
import com.gnsoft.bazzar.delivery.adress.AddressService;

@Service
public class DeliveryUserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AddressService addressService;

	public User findUser(String mobileNumber) {
		return userRepository.findByMobileNumber(mobileNumber);
	}

	public void saveUser(User user) {
		User user1 = new User(user.getFirstName(), user.getLastName(), user.getEmail(), user.getMobileNumber(),
				 Arrays.asList(new Role("RT_USER")));

		user1.setStatus(false);
		user1.setPassword("");
		user1.setRole("RT_USER");
		userRepository.save(user1);

	}

}