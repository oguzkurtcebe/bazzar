package com.gnsoft.bazzar.delivery.category;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gnsoft.bazzar.dashboard.companies.Company;
import com.gnsoft.bazzar.delivery.product.CompanyProductService;
import com.gnsoft.bazzar.exception.NotFoundException;
import com.gnsoft.bazzar.image.sampleapp.CreateImageUrl;

@RestController
@RequestMapping("/delivery")
@Validated
public class CompanyCategoryRestService {

	@Autowired
	private CompanyCategoryService companyCategoryService;
	@Autowired
	private CompanyProductService companyProductService;

	@DeleteMapping("category/{id}")
	public void deleteCategory(@PathVariable("id") String id) {
		try {
			companyCategoryService.findCategoryById(id);
			companyCategoryService.deleteCategory(id);

		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new InternalError(e);
		}
	}

	@PutMapping("/category/{id}")
	public ResponseEntity<?> updateCategory(@PathVariable("id") String id,
			@RequestBody @Valid CompanyCategory category) {
		try {
			CompanyCategory updatedCategory = companyCategoryService.findCategoryById(id).orElse(category);
			updatedCategory.setStatus(category.isStatus());
			updatedCategory.setTitle(category.getTitle());
			updatedCategory.setDescription(category.getDescription());
			updatedCategory.setImageUrl(category.getImageUrl());

			String imagePath = category.getImageUrl();
			CreateImageUrl createImageUrl = new CreateImageUrl();
			String uploadFromBase64 = createImageUrl.uploadFromBase64(imagePath);
			updatedCategory.setImageUrl(uploadFromBase64);

			companyCategoryService.updateCategory(updatedCategory);
			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("category/{id}")
	public ResponseEntity<Optional<CompanyCategory>> getCategory(@PathVariable("id") String id) {

		Optional<CompanyCategory> category = companyCategoryService.findCategoryById(id);

		try {
			return ResponseEntity.ok(category);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}

	}

	@GetMapping("/categories")
	public ResponseEntity<Page<CompanyCategory>> listCategories(Pageable page) {
		Company company = (Company) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Page<CompanyCategory> list = companyCategoryService.findCategories(page, company.get_id());
		return ResponseEntity.ok(list);
	}

	@GetMapping("/allCategories")
	public ResponseEntity<List<CompanyCategory>> listAllCategories() {
		Company company = (Company) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<CompanyCategory> list = companyCategoryService.findAllCategories(company.get_id());
		return ResponseEntity.ok(list);
	}

	@PostMapping("/category")
	public ResponseEntity<?> saveCategory(@RequestBody @Valid CompanyCategory category) {
		try {

			Company company = (Company) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

			String imagePath = category.getImageUrl();
			CreateImageUrl createImageUrl = new CreateImageUrl();
			String uploadFromBase64 = createImageUrl.uploadFromBase64(imagePath);
			category.setImageUrl(uploadFromBase64);
			category.setCompanyId(company.get_id());

			companyCategoryService.saveCategory(category);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/category/updateStatus/{id}")
	public ResponseEntity<?> updateStatusCategory(@PathVariable("id") String id) {
		CompanyCategory category = companyCategoryService.findCategoryById(id).orElseThrow();
		if (category.isStatus()) {
			category.setStatus(false);
			companyCategoryService.updateCategory(category);
			companyProductService.updateStatusAllProducts(category.get_id(), false);

		} else {
			category.setStatus(true);
			companyCategoryService.updateCategory(category);
			companyProductService.updateStatusAllProducts(category.get_id(), true);
		}
		return ResponseEntity.ok(202);
	}
}
