package com.gnsoft.bazzar.dashboard.subcategory;

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

@Data
@Document(collection = "subcategories")
@JsonInclude(value = Include.NON_EMPTY, content = Include.NON_NULL)
public class SubCategory {

	@Id
	private String _id;
	private boolean status;
	@NotNull
	private String title;
	@NotEmpty
	private String description;
	private String categoryId;
	@NotNull
	private String categoryName;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
	private int _v;

}
