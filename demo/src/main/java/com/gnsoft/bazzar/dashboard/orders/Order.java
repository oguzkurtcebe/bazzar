package com.gnsoft.bazzar.dashboard.orders;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gnsoft.bazzar.dashboard.product.Product;

import lombok.Data;


@Data
@Document(collection = "orders")
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class Order {
	@Id
	private String _id;
	private boolean isOrderAssigned;
	private boolean isAcceptedByDeliveryBoy;
	private boolean isDeliveryBoyRated;
	private boolean isWalletUsed;

	@NotBlank
	private List<Cart> cart;
	private int amountRefundedOrderModified;
	@DBRef
	private List<ItemCancellList> itemCancellList;
	private boolean isSubscriptionOrder;
	private double subTotal;
	private double tax;
	@NotBlank
	private Product product;
	private int totalProduct;
	private Double grandTotal;
	private int deliveryCharges;
	private String deliveryInstruction;
	private String couponCode;
	private int couponAmount;
	private TransactionDetails  transactionDetails;
	@NotBlank
	private Address address;
	@NotBlank
	private Object user ;
	
	@NotNull
	private String  userId;
	private String paymentType;
	private String orderStatus;
	private String paymentStatus;
	@NotNull
	private String cardId;
	@NotNull
	private int orderID;
	@NotNull
	private String deliveryDate;
	@NotNull
	private String deliveryTime;
	private int usedWalletAmount;
	private double amountRefunded;
	private String currencySymbol;
	private String currencyCode;
	private String invoiceToken;
	private String orderType;
	private String orderFrom;
	private boolean cashCollected;
	@DBRef
	private List<RejectedByDeliveryBoy> rejectedByDeliveryBoy;
	@CreatedDate
	private Date createdAt;
	@LastModifiedDate
	private Date updatedAt;
	private int __v;
	private String assignedToId;
	private String assignedToName;
	


}
