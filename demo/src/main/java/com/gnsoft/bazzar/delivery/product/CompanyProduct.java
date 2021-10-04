package com.gnsoft.bazzar.delivery.product;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@Document(collection = "companyproducts")
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class CompanyProduct {

	@Id
	private String _id;
	private boolean isDealAvailable;
	private boolean status;
	private int averageRating;
	private int totalRating;
	private int noOfUsersRated;
	private String companyId;
	private String title;
	private String keywords;
	private String description;
	private String imageUrl;
	private String categoryId;
	private String type;
	private List<CompanyVariant> variant;
	private String subCategoryId;
	private String filePath;
	private String sku;
	private List<CompanyProductImages> productImages;
	private String categoryName;
	private String subCategoryName;
	@CreatedDate
	private Date createdDate;
	@LastModifiedDate
	private Date updatedDate;
	private int _v;
	private String dealId;
	private int dealPercent;
	private String dealType;
	private String _class;
	private Double price;

}
