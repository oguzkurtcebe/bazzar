package com.gnsoft.bazzar.dashboard.category;

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
public class CategoryService {

	
	
	@Autowired
	private CategoryRepository categoryRepository;

	public Optional<Category> findCategoryById(String id) {
		return categoryRepository.findById(id);
	}

	public Page<Category> findCategories(Pageable pageable) {
		Pageable page =	PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
		return categoryRepository.findAll(page);
	}

	public void deleteCategory(String id) {
		categoryRepository.deleteById(id);
	}

	public void updateCategory(@Valid Category category) {
		
		categoryRepository.save(category);
	}

	public void saveCategory(@Valid Category category) {
		category.setStatus(true);
		categoryRepository.save(category);
	}

	public List<Category> findAllCategories() {
		return categoryRepository.findAll();
	}

	

}
