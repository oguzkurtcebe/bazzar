package com.gnsoft.bazzar.delivery.category;

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
public class CompanyCategoryService {

	@Autowired
	private CompanyCategoryRepository companyCategoryRepository;

	public Optional<CompanyCategory> findCategoryById(String id) {
		return companyCategoryRepository.findById(id);
	}

	public Page<CompanyCategory> findCategories(Pageable pageable) {
		Pageable page =	PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
		return companyCategoryRepository.findAll(page);
	}

	public void deleteCategory(String id) {
		companyCategoryRepository.deleteById(id);
	}

	public void updateCategory(@Valid CompanyCategory category) {

		companyCategoryRepository.save(category);
	}

	public void saveCategory(@Valid CompanyCategory category) {
		category.setStatus(true);
		companyCategoryRepository.save(category);
	}

	public List<CompanyCategory> findAllCategories(String companyId) {
		return companyCategoryRepository.findByCompanyId(companyId);
	}

	public Page<CompanyCategory> findCategories(Pageable pageable, String companyId) {
		Pageable page =	PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
		return companyCategoryRepository.findByCompanyId(page, companyId);
	}

}
