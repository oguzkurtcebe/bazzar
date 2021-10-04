package com.gnsoft.bazzar.dashboard.subcategory;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.gnsoft.bazzar.exception.NotFoundException;

@RestController
@RequestMapping("/rest")
@Validated
public class SubCategoryRestService {

	@Autowired
	private SubCategoryService subCategoryService;

	@DeleteMapping("subCategory/{id}")
	public void deleteSubCategory(@PathVariable("id") String id) {
		try {
			subCategoryService.findSubCategory(id);
			subCategoryService.deleteSubCategory(id);

		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new InternalError(e);
		}
	}
	
	
	@GetMapping("/subcategory/{id}")
	public ResponseEntity<List<SubCategory>>getSubcategories(@PathVariable("id") String categoryId){
		List<SubCategory> list = subCategoryService.getAllCategory(categoryId);
		return ResponseEntity.ok(list);
	}

	@PutMapping("/subCategory/{id}")
	public ResponseEntity<?> updateSubCategory(@PathVariable("id") String id, @RequestBody @Valid SubCategory subCategory) {
		try {
			SubCategory updatedSubCategory = subCategoryService.findSubCategory(id).orElse(subCategory);
			updatedSubCategory.setTitle(subCategory.getTitle());
			updatedSubCategory.setStatus(subCategory.isStatus());
			updatedSubCategory.setDescription(subCategory.getDescription());
			updatedSubCategory.setCategoryName(subCategory.getCategoryName());
			updatedSubCategory.setCategoryId(subCategory.getCategoryId());

			subCategoryService.updateSubCategory(updatedSubCategory);
			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("subCategory/{id}")
	public ResponseEntity<Optional<SubCategory>> getSubCategory(@PathVariable("id") String id) {

		Optional<SubCategory> subCategory = subCategoryService.findSubCategory(id);

		try {
			return ResponseEntity.ok(subCategory);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}

	}

	@GetMapping("/subCategories")
	public ResponseEntity<Page<SubCategory>> listSubCategories(Pageable page) {

		Page<SubCategory> list = subCategoryService.findSubCategories(page);
		return ResponseEntity.ok(list);
	}

	@PostMapping("/subCategory")
	public ResponseEntity<?> saveSubCategory(@RequestBody @Valid SubCategory subCategory) {
		try {
			subCategoryService.saveSubCategory(subCategory);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
