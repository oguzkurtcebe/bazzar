package com.gnsoft.bazzar.delivery.orders;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.gnsoft.bazzar.delivery.product.CompanyProduct;

import lombok.Data;

@Data
@Document(collection = "deliverycarts")
public class DeliveryCarts {

	
	private String _id;
	private List<String>productsIds;
	private int couponAmount;
	private int walletAmount;
	private boolean isOrderLinked;
	private double subTotal;
	private double tax;
	private double grandTotal;
	private int deliveryCharges;
	private String shippingMethod;
	private String userId;//companyId kaydedilecek
	private List<CompanyProduct>products;
	private List<String> taxInfo;
	@CreatedBy
	private Date createdAt;
	@LastModifiedDate
	private Date updatetAt;
	
	
}
