package com.gnsoft.bazzar.dashboard.product;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gnsoft.bazzar.dashboard.product.vm.ProductVM;
import com.gnsoft.bazzar.exception.NotFoundException;
import com.gnsoft.bazzar.image.sampleapp.CreateImageUrl;

@RestController
@RequestMapping("/rest")
@Validated
public class ProductRestService {

	@Autowired
	private ProductService productService;

	@DeleteMapping("product/{id}")
	public void deleteProduct(@PathVariable("id") String id) {
		try {
			productService.findProductById(id);
			productService.deleteProduct(id);

		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception e) {
			throw new InternalError(e);
		}
	}

	@PutMapping("/product/{id}")
	public ResponseEntity<?> updateProduct(@PathVariable("id") String id, @RequestBody Product product) {
		try {
			Product updatedProduct = productService.findProductById(id);

			updatedProduct.setTitle(product.getTitle());
			updatedProduct.setKeywords(product.getKeywords());
			updatedProduct.setDescription(product.getDescription());
			updatedProduct.setSku(product.getSku());
			updatedProduct.setCategoryId(product.getCategoryId());
			updatedProduct.setSubCategoryId(product.getSubCategoryId());
			updatedProduct.setVariant(product.getVariant());
			updatedProduct.setImageUrl(product.getImageUrl());
			updatedProduct.setCategoryName(product.getCategoryName());
			updatedProduct.setSubCategoryName(product.getSubCategoryName());

			String base64 = product.getImageUrl();
			CreateImageUrl createImageUrl = new CreateImageUrl();
			String uploadFromBytes = createImageUrl.uploadFromBase64(base64);
			updatedProduct.setImageUrl(uploadFromBytes);

			productService.updateProduct(updatedProduct);
			return ResponseEntity.status(HttpStatus.OK).build();

		} catch (NotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/product/status/{id}")
	public ResponseEntity<?> updateProductStatus(@PathVariable("id") String _id) {

		Product product = productService.findProductById(_id);
		if (product.isStatus()) {
			product.setStatus(false);
			productService.updateProductStatus(product);
		} else {
			product.setStatus(true);
			productService.updateProductStatus(product);
		}

		return ResponseEntity.status(HttpStatus.OK).build();

	}

	@GetMapping("product/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable("id") String id) {

		Product product = productService.findProductById(id);

		try {
			return ResponseEntity.ok(product);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}

	}

//	@PutMapping("product/{categoryId}") // deneme metodu
//	public ResponseEntity<?> updateProductStatusByCategory(@PathVariable("categoryId") String categoryId,
//			boolean status) {
//		List<Product> list = productService.findByCategoryId(categoryId);
//		if (status) {
//			for (Product product : list) {
//				product.setStatus(false);
//				productService.updateProduct(product);
//			}
//		}
//
//		else {
//			for (Product product : list) {
//				product.setStatus(true);
//				productService.updateProduct(product);
//			}
//		}
//
//		return ResponseEntity.status(HttpStatus.OK).build();
//
//	}

	@GetMapping("productBarcode/{barcodeId}")
	public ResponseEntity<Product> getByBarcodeId(@PathVariable("barcodeId") String barcodeId) {
		Product product = productService.findProductByBarcodeId(barcodeId);

		try {
			return ResponseEntity.ok(product);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/products")
	public Page<ProductVM> findProducts(Pageable page) {
		return productService.findProducts(page);
	}

	@RequestMapping(value = "/product/barcodeControl", method = RequestMethod.POST, consumes = "application/json")
	public void updateStatuseByBarcodeScanner(@RequestBody Barcode barcodeList, @RequestParam String categoryId) {
		System.out.println("Kategori : "+categoryId);
		System.out.println("Barkod : "+barcodeList.getBarcode().get(0));
		productService.updateStatusProductByBarcodeScanner(categoryId);
		productService.updateProductByBarcodeScanner(barcodeList, categoryId );
	}

	@PostMapping("/product")
	public ResponseEntity<?> saveProduct(@RequestBody @Valid Product product) {
		try {

			String base64 = product.getImageUrl();
			CreateImageUrl createImageUrl = new CreateImageUrl();
			String uploadFromBase64 = createImageUrl.uploadFromBase64(base64);
			product.setImageUrl(uploadFromBase64);
			productService.saveProduct(product);
			return ResponseEntity.status(HttpStatus.OK).build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping("/findProduct")
	public ResponseEntity<?> findProductByTitle(@RequestParam("title") String title) {
		List<Product> product = productService.findByTitle(title);
		return ResponseEntity.ok(product);
	}

	@GetMapping("/findProductByCategory")
	public ResponseEntity<List<Product>> findProductByCategory(@RequestParam("categoryId") String categoryId) {
		List<Product> product = productService.findByCategoryId(categoryId);
		return ResponseEntity.ok(product);
	}

	@GetMapping("/findProductBySubCategory")
	public ResponseEntity<List<Product>> findProductBySubCategory(@RequestParam("subCategoryId") String subCategoryId,
			Pageable page) {
		List<Product> product = productService.findBySubCategoryId(subCategoryId, page);
		return ResponseEntity.ok(product);
	}

}
