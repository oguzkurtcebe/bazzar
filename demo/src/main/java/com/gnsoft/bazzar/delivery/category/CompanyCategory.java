package com.gnsoft.bazzar.delivery.category;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "companycategories")
@Data
public class CompanyCategory {

	@Id
	private String _id;
	private int subCategoryCount;
	private boolean isDealAvailable;
	private boolean status;
	@Indexed(unique = true)
	private String companyId;
	@NotBlank
	private String title;
	@NotBlank
	private String description;
	@NotNull
	private String imageId;
	@NotNull
	private String imageUrl;
	private String filePath;
	@NotNull
	private String userId;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
	private int _v;
}
