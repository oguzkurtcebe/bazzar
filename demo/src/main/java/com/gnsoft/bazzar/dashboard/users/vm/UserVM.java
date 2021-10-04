package com.gnsoft.bazzar.dashboard.users.vm;

import java.util.Collection;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import com.gnsoft.bazzar.dashboard.users.Role;
import com.gnsoft.bazzar.dashboard.users.User;

import lombok.Data;


@Data
public class UserVM {
	
	@Id
	private String _id;
	private boolean mobileNumberVerified;
	private boolean status;
	private String firstName;
	private String lastName;
	private String email;
	private String mobileNumber;
	@CreatedDate
	private Date createdAt;
	private Double walletAmount;
	private Collection<Role> roles;

	
	public UserVM(User user) {
		this.set_id(user.get_id());
		this.setCreatedAt(user.getCreatedAt());
		this.setEmail(user.getEmail());
		this.setFirstName(user.getFirstName());
		this.setLastName(user.getLastName());
		this.setMobileNumber(user.getMobileNumber());
		this.setMobileNumberVerified(user.isMobileNumberVerified());
		this.setStatus(user.isStatus());
		this.setWalletAmount(user.getWalletAmount());
		this.setRoles(user.getRoles());
		
		
		
	}

}
