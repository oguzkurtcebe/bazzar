package com.gnsoft.bazzar.dashboard.companies;

import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.gnsoft.bazzar.dashboard.users.Role;
import com.gnsoft.bazzar.delivery.adress.Address;

import lombok.Data;

@Data
@Document(collection = "companies")
public class Company implements UserDetails {

	@Id
	private String _id;
	private String companyName;
	private String countryCode;
	@Indexed(unique = true)
	private String mobileNumber;
	private String password;
	private String role;
	private Collection<Role> roles;
	private String email;
	private String companyId;
	private boolean status;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
	private int _v;
	private Address address;

	public Company(String companyName, String mobileNumber, String password, String email, Address address,
			Collection<Role> roles) {
		this.companyName = companyName;
		this.mobileNumber = mobileNumber;
		this.password = password;
		this.email = email;
		this.address = address;
		this.roles = roles;

	}

	public Company() {
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
