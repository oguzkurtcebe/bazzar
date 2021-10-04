package com.gnsoft.bazzar.dashboard.orders;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class Cart {

	@Id
	private String _id;
	@NotNull
	private String productId;
	@NotNull
	private String productName;
//	@NotNull
//	private double productPrice;
	@NotNull
	private int quantity;
	@NotNull
	private Double price;
	@NotNull
	private int amountRefunded;
	@NotNull
	private double productTotal;
	private String unit;
	private String imageUrl;
	private String filePath;
	@NotNull
	private String categoryId;
	@NotNull
	private String subCategoryId;
	private int dealAmount;
	private boolean isDealAvailable;
	private String dealId;
	private String dealPercent;

}
