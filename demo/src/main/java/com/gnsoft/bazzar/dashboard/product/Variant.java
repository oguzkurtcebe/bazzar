package com.gnsoft.bazzar.dashboard.product;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class Variant {
	@Id
	private String _id;
	private boolean enable;
	private boolean isOfferAvailable;
	private int offerPercent;
	private boolean isSubScriptionAllowed;
	private String unit;
	private double price;
	private int productStock;
	
}
