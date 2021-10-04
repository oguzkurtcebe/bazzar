package com.gnsoft.bazzar.courier;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CourierService {
	@Autowired
	private CourierRepository courierRepository;

	public Page<Courier> findCouriers(Pageable pageable) {
		Pageable page = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
				Sort.by(Sort.Direction.DESC, "createdAt"));
		return courierRepository.findAll(page);
	}

	public Courier updateCourier(Courier courier) {
		return courierRepository.save(courier);
	}

	public Optional<Courier> findCourierById(String id) {
		return courierRepository.findById(id);
	}

	public List<Courier> findCourierByLastNameOrFirstNameAll(String lastName, String firstName) {
		return courierRepository.findCourierByLastNameLikeIgnoreCaseAndFirstNameLikeAllIgnoreCase(lastName, firstName);

	}

	public void deleteCourier(String id) {
		courierRepository.deleteById(id);
	}
}
