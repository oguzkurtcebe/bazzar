package com.gnsoft.bazzar.dashboard.category;

import java.util.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Document(collection = "categories")
@Data
@JsonInclude(value = Include.NON_EMPTY, content = Include.NON_NULL)
public class Category {

	@Id
	private String _id;
	private int subCategoryCount;
	private boolean isDealAvailable;
	private boolean status;
	@NotEmpty
	private String title;
	@NotEmpty
	private String description;
	private String imageId;
	@NotNull
	private String imageUrl;
	@NotNull
	private String filePath;
	private String userId;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
	private int _v;
}
