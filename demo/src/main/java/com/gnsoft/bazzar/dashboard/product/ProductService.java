package com.gnsoft.bazzar.dashboard.product;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import com.gnsoft.bazzar.dashboard.product.vm.ProductVM;

@Service
@Transactional
@Validated
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public Product findProductById(String id) {
		return productRepository.findBy_id(id);
	}

	public Product findProductByBarcodeId(String barcodeId) {
		return productRepository.findByBarcodeId(barcodeId);
	}

	public List<Product> findByCategoryId(String categoryId) {
		return productRepository.findByCategoryId(categoryId);
	}

	public List<Product> findBySubCategoryId(String subCategoryId, Pageable pageable) {
		Pageable page = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "createdDate"));
		return productRepository.findBySubCategoryId(subCategoryId, page);
	}

	public Page<ProductVM> findProducts(Pageable pageable) {
		Pageable page = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "createdDate"));
		return productRepository.findAll(page).map(ProductVM::new);

	}

	public void deleteProduct(String id) {
		productRepository.deleteById(id);
	}

	public void updateProduct(@Valid Product product) {

		productRepository.save(product);
	}

	public void saveProduct(@Valid Product product) {
		product.setStatus(true);
		productRepository.save(product);
	}

	public void updateProductStatus(Product product) {
		productRepository.save(product);

	}

	public void updateStatusProductByBarcodeScanner(String categoryId) {
		List<Product> list =productRepository.findByCategoryId(categoryId);
		for (Product product : list) {
			product.setStatus(false);
			productRepository.save(product);
		}
	}

	public void updateProductByBarcodeScanner(Barcode barcodeList, String categoryId) {
		List<Product> list =productRepository.findByCategoryId(categoryId);
		List<String> barcodelist2 = barcodeList.getBarcode();

		for (Product product : list) {
			for (String bcId : barcodelist2) {
				if (product.getBarcodeId() != null) {
					if (product.getBarcodeId().equals(bcId)) {
						product.setStatus(true);
						productRepository.save(product);
					}

				}

			}

		}

	}

	public List<Product> findByTitle(String title) {
		return productRepository.findByTitleLikeIgnoreCase(title);
	}

	public void updateStatusAllProducts(String categoryId, boolean status) {
		List<Product> list = productRepository.findByCategoryId(categoryId);
		if (status) {
			for (Product product : list) {
				product.setStatus(true);
				productRepository.save(product);
			}
		} else {
			for (Product product : list) {
				product.setStatus(false);
				productRepository.save(product);
			}
		}
	}
}
