package com.gnsoft.bazzar.dashboard.users;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.gnsoft.bazzar.delivery.adress.Address;

import lombok.Data;

@Document(collection = "users")
@Data
public class User implements UserDetails {
// Bu kullanıcı sınıfı

	@Id
	private String _id;
	private boolean isSuperAdmin;
	private boolean mobileNumberVerified;
	private boolean emailVerified;
	private boolean status;
	private int orderedDelivered;
	private int orderedPurchased;
	@NotNull
	@Size(min = 3, max = 50)
	private String firstName;
	@NotNull
	@Size(min = 3, max = 50)
	private String lastName;
	@Email
	private String email;
	@Size(min = 4, max = 20)
	@NotNull
	private String password;
	@Pattern(regexp = "[0-9]")
	@Indexed(unique = true)
	@NotNull
	private String mobileNumber;
	private String countryCode;
	private String role;
	private String salt;
	private String emailVerificationId;
	private String emailVerificationExpiry;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
	private int _v;
	private String playerId;
	private String langauge;
	private String otp;
	private String otpVerificationId;
	private String imageUrl;
	private Double walletAmount;
	private int orderPurchased;
	private String companyId;
	private Address address;

	private Collection<Role> roles;

	public User(String firstName, String lastName, String email, String password, String mobileNumber,
			Collection<Role> roles) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.mobileNumber = mobileNumber;
		this.roles = roles;

	}
	public User(String firstName, String lastName, String email,  String mobileNumber, 
			Collection<Role> roles) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.roles = roles;

	}
	public User() {

	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return roles.stream().map(Role -> new SimpleGrantedAuthority(Role.getRolename())).collect(Collectors.toList());
	}

	@Override
	public String getUsername() {

		return mobileNumber;
	}

	@Override
	public boolean isAccountNonExpired() {

		return true;
	}

	@Override
	public boolean isAccountNonLocked() {

		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {

		return true;
	}

	@Override
	public boolean isEnabled() {

		return true;
	}

}
