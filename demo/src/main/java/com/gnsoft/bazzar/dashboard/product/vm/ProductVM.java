package com.gnsoft.bazzar.dashboard.product.vm;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gnsoft.bazzar.dashboard.product.Product;
import com.gnsoft.bazzar.dashboard.product.ProductImages;
import com.gnsoft.bazzar.dashboard.product.Variant;

import lombok.Data;

@Data
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class ProductVM {

	@Id
	private String _id;
	private boolean status;
	private String title;
	private List<Variant> variant;
	private String sku;
	private String categoryName;
	private String subCategoryName;
	@CreatedDate
	private Date createdDate;
	@LastModifiedDate
	private Date updatedDate;
	private int dealPercent;
	private String imageUrl;
	private List<ProductImages> productImages;

	public ProductVM(Product product) {
		this.set_id(product.get_id());
		this.setStatus(product.isStatus());
		this.setTitle(product.getTitle());
		this.setVariant(product.getVariant());
		this.setSku(product.getSku());
		this.setCategoryName(product.getCategoryName());
		this.setSubCategoryName(product.getSubCategoryName());
		this.setCreatedDate(product.getCreatedDate());
		this.setUpdatedDate(product.getUpdatedDate());
		this.setDealPercent(product.getDealPercent());
		this.setImageUrl(product.getImageUrl());
		this.setProductImages(product.getProductImages());

	}

}
