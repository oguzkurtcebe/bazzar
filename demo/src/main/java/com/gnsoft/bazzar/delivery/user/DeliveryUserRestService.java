package com.gnsoft.bazzar.delivery.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gnsoft.bazzar.dashboard.users.User;

@RestController
@RequestMapping("/delivery")
public class DeliveryUserRestService {

	@Autowired
	private DeliveryUserService userService;

	@GetMapping("user/{mobileNumber}")
	public User findUser(@PathVariable("mobileNumber") String mobileNumber) {

		return userService.findUser(mobileNumber);

	}

	@PostMapping("/user")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		try {
			userService.saveUser(user);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
