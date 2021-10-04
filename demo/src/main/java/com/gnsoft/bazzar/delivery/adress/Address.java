package com.gnsoft.bazzar.delivery.adress;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@Document(collection = "addresses")
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class Address {
	@Id
	private String _id;
	
	//@DBRef
	private Location location;
	
	private String address;
	private String flatNo;
	private String postalCode;
	private String addressType;
	private String apartmentName;
	private String landmark;
	private String userId;
	private String mobileNumber;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
    private int _v;
}
