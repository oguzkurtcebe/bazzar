package com.gnsoft.bazzar.dashboard.orders;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gnsoft.bazzar.delivery.adress.Location;

import lombok.Data;

@Data
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class Address {
	
	private String address;
	private String flatNo;
	private String postalCode;
	private String addressType;
	private String apartmentName;
	private String landmark;
	private Location location;

}
