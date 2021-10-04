package com.gnsoft.bazzar.delivery.product.vm;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gnsoft.bazzar.delivery.product.CompanyProduct;
import com.gnsoft.bazzar.delivery.product.CompanyProductImages;
import com.gnsoft.bazzar.delivery.product.CompanyVariant;

import lombok.Data;

@Data
@JsonInclude(value = Include.NON_EMPTY, content = Include.NON_NULL)
public class CompanyProductVM {

	@Id
	private String _id;
	private boolean status;
	private String title;
	private List<CompanyVariant> variant;
	private String sku;
	private String categoryName;
	private String subCategoryName;
	@CreatedDate
	private Date createdDate;
	@LastModifiedDate
	private Date updatedDate;
	private int dealPercent;
	private String imageUrl;
	private Double price;
	private List<CompanyProductImages> productImages;
	
	
	public  CompanyProductVM(CompanyProduct companyProduct) {
		this.set_id(companyProduct.get_id());
		this.setStatus(companyProduct.isStatus());
		this.setTitle(companyProduct.getTitle());
		this.setVariant(companyProduct.getVariant());
		this.setSku(companyProduct.getSku());
		this.setCategoryName(companyProduct.getCategoryName());
		this.setSubCategoryName(companyProduct.getSubCategoryName());
		this.setCreatedDate(companyProduct.getCreatedDate());
		this.setUpdatedDate(companyProduct.getUpdatedDate());
		this.setDealPercent(companyProduct.getDealPercent());
		this.setImageUrl(companyProduct.getImageUrl());
		this.setProductImages(companyProduct.getProductImages());
		this.setPrice(companyProduct.getPrice());
		
		
	}
}
