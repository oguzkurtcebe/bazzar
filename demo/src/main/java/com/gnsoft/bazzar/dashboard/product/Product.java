package com.gnsoft.bazzar.dashboard.product;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@Document(collection = "products")
@JsonInclude(value = Include.NON_EMPTY, content = Include.NON_NULL)
public class Product {

	@Id
	private String _id;
	private boolean isDealAvailable;
	private boolean status;
	private int averageRating;
	private int totalRating;
	private int noOfUsersRated;
	@NotNull
	private String title;
	@NotNull
	private String keywords;
	@NotEmpty
	private String description;
	private String imageUrl;
	private String categoryId;
	private String type;
	private List<Variant> variant;
	private String subCategoryId;
	private String filePath;
	private String sku;
	private List<ProductImages> productImages;
	@NotNull
	private String categoryName;
	@NotNull
	private String subCategoryName;
	@CreatedDate
	private Date createdDate;
	@LastModifiedDate
	private Date updatedDate;
	private int _v;
	private String dealId;
	private int dealPercent;
	private String dealType;
	private String barcodeId;

}
