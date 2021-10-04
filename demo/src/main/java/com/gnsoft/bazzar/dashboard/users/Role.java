package com.gnsoft.bazzar.dashboard.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "roles")
public class Role {

	@Id
	private String _id;
	private String rolename;
	
	public Role(String rolename) {
		this.rolename = rolename;
	}

	public Role() {
	}
}
