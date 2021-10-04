package com.gnsoft.bazzar.courier;

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

import lombok.Data;

@Data
@Document(collection = "courier")
public class Courier implements UserDetails {

	@Id
	private String _id;
	private String firstName;
	private String lastName;
	private String countryCode;
	@Indexed(unique = true)
	private String mobileNumber;
	private String password;
	private String role;
	private Collection<Role> roles;
	private String email;
	private boolean status;
	private boolean isBussy;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
	private int _v;

	public Courier() {
	}

	public Courier(String firstName, String lastName, String email, String password, String mobileNumber,
			Collection<Role> roles) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.mobileNumber = mobileNumber;
		this.roles = roles;

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
