package com.gnsoft.bazzar.delivery.product;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class CompanyProductImages {

	@Id
	private String _id;
	private String imageUrl;
	
}
