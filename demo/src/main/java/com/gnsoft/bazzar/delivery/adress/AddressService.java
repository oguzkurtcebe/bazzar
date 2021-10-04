package com.gnsoft.bazzar.delivery.adress;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

	@Autowired
	private AddressRepository addressRepository;
	
	public List<Address> findAddress(String mobileNumber) {
		List<Address> list = addressRepository.findByMobileNumber(mobileNumber);
		return list;
	}

	public void saveAddress(Address address) {
		addressRepository.save(address);
	}
	
	public Page<Address> listAddress(Pageable page){
		return addressRepository.findAll(page);
	}
}
