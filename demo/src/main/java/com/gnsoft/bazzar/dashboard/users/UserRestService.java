package com.gnsoft.bazzar.dashboard.users;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
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

import com.gnsoft.bazzar.dashboard.users.vm.UserVM;
import com.gnsoft.bazzar.exception.NotFoundException;

//
@RestController
@RequestMapping("/rest")
@Validated
public class UserRestService {

	@Autowired
	private UserService userService;

	/* *** User listeleme, arama, sayfalama, kaydetme metotları **** */

	@GetMapping("/users")
	public Page<UserVM> getUsers(Pageable page) {
		return userService.findUsers(page);
	}

	/* ************ id ile kullanıcı sorgulama ************* */
	@GetMapping("/user/{id}")
	public ResponseEntity<Optional<User>> getUser(@PathVariable("id") String id) {

		try {
			Optional<User> user = userService.findUserById(id);
			return ResponseEntity.ok(user);

		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		}
	}

	/* ******* isme göre kullanıcı sorgulama ******** */
	@GetMapping("/user")
	public ResponseEntity<List<User>> getUsers(@RequestParam("fname") String firstName) {
		List<User> list = userService.findUsers(firstName);
		return ResponseEntity.ok(list);
	}

	/* ****** telefon numarasına göre kullanıcı sorgulama ***** */
	@GetMapping("/user/mobile")
	public ResponseEntity<User> getUserByMobileNumber(@RequestParam("mn") String mobileNumber) {
		User user = userService.findUserByMobileNumber(mobileNumber);
		return ResponseEntity.ok(user);
	}

	/* **** kullanıcı kaydetme ****** */
	@PostMapping("/user")
	public ResponseEntity<?> saveUser(@RequestBody @Valid User user) {
		try {
			userService.saveUser(user);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/* **** kullanıcı güncelleme **** */
	@PutMapping("/user/{id}")
	public ResponseEntity<?> updateUser(@PathVariable("id") String id, @RequestBody @Valid User user) {
		try {
			User updatedUser = userService.findUserById(id).orElse(user);
			updatedUser.setMobileNumber(user.getMobileNumber());
			userService.updateUser(user);
			return ResponseEntity.ok().build();

		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/* ***kullanıcı aktif-pasif etme ****/
	@PutMapping("/user/status/{mobileNumber}")
	public ResponseEntity<?> updateStatus(@PathVariable("mobileNumber") String mobileNumber) {

		try {
			User user = userService.findUserByMobileNumber(mobileNumber);
			if (user.isStatus()) {
				user.setStatus(false);
				userService.updateUser(user);
			} else {
				user.setStatus(true);
				userService.updateUser(user);
			}
			return ResponseEntity.ok().build();
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	/* kullanıcı telefon numarası güncelleme */
	@PutMapping("/user/mobileNumberVerified/{mobileNumber}")
	public ResponseEntity<?> mobileNumberVerified(@PathVariable("mobileNumber") String mobileNumber) {

		try {
			User user = userService.findUserByMobileNumber(mobileNumber);
			if (user.isMobileNumberVerified()) {
				user.setMobileNumberVerified(false);
				userService.updateUser(user);
			} else {
				user.setMobileNumberVerified(true);
				userService.updateUser(user);
			}
			return ResponseEntity.ok().build();
		} catch (NotFoundException ex) {
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	/* kullanıcı silme */
	@DeleteMapping("/user/{id}")
	@ResponseStatus(HttpStatus.OK)
	public void deleteUser(@PathVariable("id") String id) {
		try {
			userService.findUserById(id);
			userService.deleteUser(id);
		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new InternalError(ex);
		}

	}

	/* kullanıcı ad-soyada göre sorgulama */
	@GetMapping("/user/search")
	public ResponseEntity<List<User>> findByLastNameOrFirstName(@RequestParam("ln") String lastName,
			@RequestParam("fn") String firstName) {

		List<User> list = userService.findByLastNameOrFirstNameAll(lastName, firstName);

		return ResponseEntity.ok(list);

	}

	/* ! ******************************************************* ! */

	@RequestMapping(value = "/product/roleSetUser")
	public void roleSetUser() {
		// userService.setRole();
	}

}
