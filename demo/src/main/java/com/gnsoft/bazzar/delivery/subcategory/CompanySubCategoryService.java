package com.gnsoft.bazzar.delivery.subcategory;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;


@Service
@Transactional
@Validated
public class CompanySubCategoryService {

	@Autowired
	private CompanySubCategoryRepository companySubCategoryRepository;
	


	public Optional<CompanySubCategory> findSubCategoryByCategoryId(String id) {
		return companySubCategoryRepository.findById(id);
	}

	public List<CompanySubCategory>getAllCategory(String categoryId){
		return companySubCategoryRepository.findByCategoryId(categoryId);
	}
	
	
	public Optional<CompanySubCategory> findSubCategory(String id) {
		return companySubCategoryRepository.findById(id);
	}

	
	public Page<CompanySubCategory> findSubCategories(Pageable pageable) {
		Pageable page =	PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
		return companySubCategoryRepository.findAll(page);
	}

	public void deleteSubCategory(String id) {
		companySubCategoryRepository.deleteById(id);
	}

	public void updateSubCategory(@Valid CompanySubCategory subcategory) {
		
		companySubCategoryRepository.save(subcategory);
	}

	public void saveSubCategory(@Valid CompanySubCategory subcategory) {
		subcategory.setStatus(true);
		companySubCategoryRepository.save(subcategory);
	}

	

}
