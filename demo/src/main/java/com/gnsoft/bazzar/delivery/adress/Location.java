package com.gnsoft.bazzar.delivery.adress;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Document(collection = "location")
@AllArgsConstructor
public class Location {

	private double latitude;
	private double longitude;
}
