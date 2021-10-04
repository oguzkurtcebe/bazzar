package com.gnsoft.bazzar.delivery.orders;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.gnsoft.bazzar.delivery.product.CompanyProduct;

import lombok.Data;

@Data
@Document(collection = "cart")
public class Cart {

	@Id
	private String _id;
	private String productId;
	private String productTitle;
	private Double productPrice;
	private int quanity;
	private double productTotal;
	private String unit;
	private String imageUrl;
	private String filePath;
	private String categoryId;
	private String subCategoryId;
	private int dealAmount;
	private boolean isDealAvailable;
	private String dealId;
	private String dealPercent; 
	private List<CompanyProduct>products;
	
}
