package com.gnsoft.bazzar.delivery.product;

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

import com.gnsoft.bazzar.delivery.product.vm.CompanyProductVM;

@Service
@Transactional
@Validated
public class CompanyProductService {

	@Autowired
	private CompanyProductRepository companyProductRepository;

	public CompanyProduct findProductById(String id) {
		return companyProductRepository.findBy_id(id);
	}

	public Page<CompanyProductVM> findProducts(Pageable pageable) {
		Pageable page =	PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
		return companyProductRepository.findAll(page).map(CompanyProductVM::new);
	}

	public void deleteProduct(String id) {
		companyProductRepository.deleteById(id);
	}

	public void updateProduct(@Valid CompanyProduct product) {

		companyProductRepository.save(product);
	}

	public void saveProduct(CompanyProduct product) {
		product.setStatus(true);
		companyProductRepository.save(product);
	}

	public void updateProductStatus(CompanyProduct product) {
		companyProductRepository.save(product);

	}
   
	public List<CompanyProduct>findProducts(String categoryId){
		
		 List<CompanyProduct> list = companyProductRepository.findByCategoryId(categoryId);
		 return list;
	}

	public List<CompanyProduct> findByTitle(String title) {
		return companyProductRepository.findByTitleLikeIgnoreCase(title);
	}
	public List<CompanyProduct>findByCategoryId(String categoryId){
		return companyProductRepository.findByCategoryId(categoryId);
	}
	public void updateStatusAllProducts(String categoryId,boolean status) {
		List<CompanyProduct> list = companyProductRepository.findByCategoryId(categoryId);
		if(status) {
			for (CompanyProduct companyProduct : list) {
				companyProduct.setStatus(status);
				companyProductRepository.save(companyProduct);
			}
		}
		else {
			for (CompanyProduct companyProduct : list) {
				companyProduct.setStatus(status);
				companyProductRepository.save(companyProduct);
			}
		}
	
	}

	public List<CompanyProduct> findAllProducts() {
		return companyProductRepository.findAll();
	}
}
