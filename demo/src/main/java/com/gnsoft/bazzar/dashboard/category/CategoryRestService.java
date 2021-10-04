package com.gnsoft.bazzar.dashboard.category;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gnsoft.bazzar.dashboard.product.ProductService;
import com.gnsoft.bazzar.dashboard.subcategory.SubCategoryService;
import com.gnsoft.bazzar.exception.NotFoundException;
import com.gnsoft.bazzar.image.sampleapp.CreateImageUrl;

@RestController
@RequestMapping("/rest")
@Validated
public class CategoryRestService {

	@Autowired
	private CategoryService categoryService;
	@Autowired
	private SubCategoryService subCategoryService;
	@Autowired
	private ProductService productService;

	@DeleteMapping("category/{id}")
	public void deleteCategory(@PathVariable("id") String id) {
		try {
			categoryService.findCategoryById(id);
			categoryService.deleteCategory(id);

		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new InternalError(e);
		}
	}

	@PutMapping("/category/{id}")
	public ResponseEntity<?> updateCategory(@PathVariable("id") String id, @RequestBody @Valid Category category) {
		try {
			Category updatedCategory = categoryService.findCategoryById(id).orElse(category);
			updatedCategory.setStatus(category.isStatus());
			updatedCategory.setTitle(category.getTitle());
			updatedCategory.setDescription(category.getDescription());
			updatedCategory.setImageUrl(category.getImageUrl());

			String fileName = category.getImageUrl();
			CreateImageUrl createImageUrl = new CreateImageUrl();
			String uploadFromBase64 = createImageUrl.uploadFromBase64(fileName);
			updatedCategory.setImageUrl(uploadFromBase64);

			categoryService.updateCategory(updatedCategory);
			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("category/{id}")
	public ResponseEntity<Optional<Category>> getCategory(@PathVariable("id") String id) {

		Optional<Category> category = categoryService.findCategoryById(id);

		try {
			return ResponseEntity.ok(category);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}

	}

	@GetMapping("/categories")
	public ResponseEntity<Page<Category>> listCategories(Pageable pageable) {
		Pageable page = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "createdAt"));
		Page<Category> list = categoryService.findCategories(page);
		return ResponseEntity.ok(list);
	}

	@GetMapping("/allCategories")
	public ResponseEntity<List<Category>> listAllCategories() {
		Sort.by(Sort.Direction.DESC, "createdAt");
		List<Category> list = categoryService.findAllCategories();
		return ResponseEntity.ok(list);
	}

	@PostMapping("/category")
	public ResponseEntity<?> saveCategory(@RequestBody @Valid Category category) {

		try {
			String imagePath = category.getImageUrl();
			CreateImageUrl createImageUrl = new CreateImageUrl();
			String uploadFromBase64 = createImageUrl.uploadFromBase64(imagePath);
			category.setImageUrl(uploadFromBase64);
			categoryService.saveCategory(category);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@PutMapping("/category/updateStatus/{id}")
	public ResponseEntity<?> updateStatusCategory(@PathVariable("id") String id) {
		Category category = categoryService.findCategoryById(id).orElseThrow();
		if (category.isStatus()) {
			category.setStatus(false);
			categoryService.updateCategory(category);
			subCategoryService.updateStatusAllSubCategories(category.get_id(), false);
			productService.updateStatusAllProducts(category.get_id(), false);

		} else {
			category.setStatus(true);
			categoryService.updateCategory(category);
			subCategoryService.updateStatusAllSubCategories(category.get_id(), true);
			productService.updateStatusAllProducts(id, true);
		}

		return null;

	}
}
