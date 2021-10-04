package com.gnsoft.bazzar.dashboard.product;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class ProductImages {

	@Id
	private String _id;
	private String imageUrl;
	
}
