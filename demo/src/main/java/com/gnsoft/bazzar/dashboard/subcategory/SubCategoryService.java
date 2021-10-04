package com.gnsoft.bazzar.dashboard.subcategory;


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
public class SubCategoryService {

	@Autowired
	private SubCategoryRepository subCategoryRepository;
	


	public Optional<SubCategory> findSubCategoryByCategoryId(String id) {
		return subCategoryRepository.findById(id);
	}

	public List<SubCategory>getAllCategory(String categoryId){
		return subCategoryRepository.findByCategoryId(categoryId);
	}
	
	
	public Optional<SubCategory> findSubCategory(String id) {
		return subCategoryRepository.findById(id);
	}

	
	public Page<SubCategory> findSubCategories(Pageable pageable) {
		Pageable page =	PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
		return subCategoryRepository.findAll(page);
	}

	public void deleteSubCategory(String id) {
		subCategoryRepository.deleteById(id);
	}

	public void updateSubCategory(@Valid SubCategory subcategory) {
		
		subCategoryRepository.save(subcategory);
	}

	public void saveSubCategory(@Valid SubCategory subcategory) {
		subcategory.setStatus(true);
		subCategoryRepository.save(subcategory);
	}
   
	
	public void updateStatusAllSubCategories(String categoryId,boolean status) {
		List<SubCategory> list = subCategoryRepository.findByCategoryId(categoryId);
		if(status) {
			for (SubCategory subCategory : list) {
				subCategory.setStatus(status);
				subCategoryRepository.save(subCategory);
			}}
			else {
				for (SubCategory subCategory : list) {
					subCategory.setStatus(status);
					subCategoryRepository.save(subCategory);
				}
			}
		
		}
	}
	


