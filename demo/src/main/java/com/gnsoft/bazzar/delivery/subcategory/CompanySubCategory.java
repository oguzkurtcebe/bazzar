package com.gnsoft.bazzar.delivery.subcategory;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@Document(collection = "companysubcategories")
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class CompanySubCategory {

	@Id
	private String _id;
	private boolean status;
	@NotBlank
	private String title;
	@NotBlank
	private String description;
	@NotNull
	private String categoryId;
	@NotNull
	private String categoryName;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
	private int _v;
	private String companyId;
}
