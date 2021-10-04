package com.gnsoft.bazzar.dashboard.orders;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class TransactionDetails {
	
	private String transactionStatus;
	private String receiptUrl;
	private String transactionId;
	private String currency;
	private int paymentCount;
	private String paymentMethod;

	private double transactionDate;
	private double transactionAmount;

}
