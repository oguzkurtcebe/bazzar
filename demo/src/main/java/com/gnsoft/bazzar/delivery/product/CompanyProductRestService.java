package com.gnsoft.bazzar.delivery.product;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gnsoft.bazzar.dashboard.companies.Company;
import com.gnsoft.bazzar.delivery.category.CompanyCategory;
import com.gnsoft.bazzar.delivery.category.CompanyCategoryService;
import com.gnsoft.bazzar.exception.NotFoundException;
import com.gnsoft.bazzar.image.sampleapp.CreateImageUrl;

@RestController
@RequestMapping("/delivery")
@Validated
public class CompanyProductRestService {

	@Autowired
	private CompanyProductService companyProductService;

	@Autowired
	private CompanyCategoryService companyCategoryService;

	@DeleteMapping("product/{id}")
	public void deleteProduct(@PathVariable("id") String id) {
		try {
			companyProductService.findProductById(id);
			companyProductService.deleteProduct(id);

		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new InternalError(e);
		}
	}

	@PutMapping("/product/{id}")
	public ResponseEntity<?> updateProduct(@PathVariable("id") String id, @RequestBody CompanyProduct product) {
		try {
			CompanyProduct updatedProduct = companyProductService.findProductById(id);

			updatedProduct.setTitle(product.getTitle());
			updatedProduct.setKeywords(product.getKeywords());
			updatedProduct.setDescription(product.getDescription());
			updatedProduct.setSku(product.getSku());
			updatedProduct.setCategoryId(product.getCategoryId());
			updatedProduct.setCategoryName(product.getCategoryName());
			updatedProduct.setImageUrl(product.getImageUrl());
			updatedProduct.setCompanyId(product.getCompanyId());
			updatedProduct.setPrice(product.getPrice());

			String imagePath = product.getImageUrl();
			CreateImageUrl createImageUrl = new CreateImageUrl();
			String uploadFromBase64 = createImageUrl.uploadFromBase64(imagePath);
			updatedProduct.setImageUrl(uploadFromBase64);

			companyProductService.updateProduct(updatedProduct);
			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/product/status/{id}")
	public ResponseEntity<?> updateProductStatus(@PathVariable("id") String _id) {

		CompanyProduct product = companyProductService.findProductById(_id);
		if (product.isStatus()) {
			product.setStatus(false);
			companyProductService.updateProductStatus(product);
		} else {
			product.setStatus(true);
			companyProductService.updateProductStatus(product);
		}

		return ResponseEntity.status(HttpStatus.OK).build();

	}

	@GetMapping("product/{id}")
	public ResponseEntity<CompanyProduct> getProduct(@PathVariable("id") String id) {

		CompanyProduct product = companyProductService.findProductById(id);

		try {
			return ResponseEntity.ok(product);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}

	}

//	@GetMapping("/products")
//	public Page<CompanyProductVM> findProducts(Pageable page) {
//		return companyProductService.findProducts(page);
//	}

	@GetMapping("/products")
	public Page<CompanyProduct> findAllProducts(Pageable page) {

		List<CompanyProduct> list2 = new ArrayList<>();
		Page<CompanyProduct> pages = new PageImpl<>(list2, page, list2.size());

		Company company = (Company) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Page<CompanyCategory> list = companyCategoryService.findCategories(page, company.get_id());

		for (CompanyCategory companyCategory : list) {
			list2.addAll(companyProductService.findByCategoryId(companyCategory.get_id()));
			pages = new PageImpl<CompanyProduct>(list2, page, list2.size());

		}
		return pages;

	}

	@PostMapping("/product")
	public ResponseEntity<?> saveProduct(@RequestBody @Valid CompanyProduct product) {
		try {
			String imagePath = product.getImageUrl();
			CreateImageUrl createImageUrl = new CreateImageUrl();
			String uploadFromBase64 = createImageUrl.uploadFromBase64(imagePath);
			product.setImageUrl(uploadFromBase64);
			companyProductService.saveProduct(product);

			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("products/{categoryId}")
	public ResponseEntity<List<CompanyProduct>> getProducts(@PathVariable("categoryId") String categoryId) {
		List<CompanyProduct> list = companyProductService.findProducts(categoryId);
		return ResponseEntity.ok(list);
	}

	@GetMapping("/findDeliveryProduct")
	public ResponseEntity<?> findDeliveryProductByTitle(@RequestParam("title") String title) {
		List<CompanyProduct> companyProduct = companyProductService.findByTitle(title);
		return ResponseEntity.ok(companyProduct);
	}

}
