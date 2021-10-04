package com.gnsoft.bazzar.dashboard.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gnsoft.bazzar.dashboard.users.Role;
import com.gnsoft.bazzar.dashboard.users.User;
import com.gnsoft.bazzar.dashboard.users.UserRepository;

@Controller
@RequestMapping("/register")
public class RegistrationController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@ModelAttribute("user")
	public User userRegistration() { // yeni bir kullanıcı oluşturma
		return new User();
	}

	/* ********* User Kaydı Formu ******************* */
	/* ********************************************* */

	@GetMapping("signUpUsers")
	public String showRegistrationForm() { // kullanıcı kaydı formu

		return "security/registration";
	}

	@PostMapping("signUpUsers")
	public String registrationUserAccount(@ModelAttribute("user") User user) {

		User user1 = new User(user.getFirstName(), user.getLastName(), user.getEmail(),
				passwordEncoder.encode(user.getPassword()), user.getMobileNumber(), Arrays.asList(new Role("USER")));

		user1.setStatus(true);
		userRepository.save(user1);

		return "redirect:/login?success";
	}

	/* *********** Admin Kaydı Formu **************** */
	/* ********************************************* */

	@GetMapping("signUpAdmins")
	public String showAdminRegistrationForm() { // admin kaydı formu

		return "security/registration2";
	}

	@PostMapping("signUpAdmins")
	public String registrationAdminAccount(@ModelAttribute("user") User user) {

		User admin = new User(user.getFirstName(), user.getLastName(), user.getEmail(),
				passwordEncoder.encode(user.getPassword()), user.getMobileNumber(),
				Arrays.asList(new Role("SUPER_ADMIN")));

		admin.setStatus(true);
		admin.setSuperAdmin(true);
		userRepository.save(admin);

		return "redirect:/login2?success";
	}

	/* **************Bazzar Admin Kaydı Formu ****************** */
	/* ********************************************* *************/
	@GetMapping("signUpBazzarAdmins")
	public String showBazzarAdminRegistrationForm() { // admin kaydı formu

		return "security/registration3";
	}

	@PostMapping("signUpBazzarAdmins")
	public String registrationBazzarAdminAccount(@ModelAttribute("user") User user) {

		User admin = new User(user.getFirstName(), user.getLastName(), user.getEmail(),
				passwordEncoder.encode(user.getPassword()), user.getMobileNumber(),
				Arrays.asList(new Role("BAZZAR_ADMIN")));

		admin.setStatus(true);
		userRepository.save(admin);

		return "redirect:/login3?success";
	}

}
