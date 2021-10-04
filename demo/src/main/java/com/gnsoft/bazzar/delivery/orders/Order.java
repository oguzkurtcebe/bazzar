package com.gnsoft.bazzar.delivery.orders;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.mongodb.core.mapping.Document;

import com.gnsoft.bazzar.delivery.adress.Address;
import com.gnsoft.bazzar.delivery.product.CompanyProduct;

import lombok.Data;

@Data
@Document(collection = "companyorders")
public class Order {

	@Id
	private String _id;
	private boolean isOrderAssigned;
	private boolean isAcceptedByDeliveryBoy;
	private boolean isDeliveryBoyRated;
	private boolean isWalletUsed;
	private List<Cart>cart;
	private int amountRefundedOrderModified;
	private List<ItemCancelList>itemCancelList;
	private boolean isSubscriptionOrder;
	private int subTotal;
	private double tax;
	private List<CompanyProduct>product;
	private int totalProduct;
	private double grandTotal;
	private int deliveryCharges;
	private int deliveryInstruction;
	private String couponCode;
	private int couponAmount;
	private List<TransactionDetails>transactionDetails;
	private Address address;
	private List<UserDto>user;
	private String userId;
	private String paymentType;
	private String orderStatus;
	private String paymentStatus;
	private String cartId;
	private int orderId;
	private String deliveryDate;
	private String deliveryTime;
	private int usedWalletAmount;
	private double amountRefunded;
	private String currencySymbol;
	private String currencyCode;
	private String invoiceToken;
	private String orderType;
	private String orderFrom;
	private boolean cashCollacted;
	private String rejectedByDeliveryBoy;
	@CreatedDate
	private Date createdAt;
	@LastModifiedBy
	private Date createdBy;
	private int _v;
	private String assignedToId;
	private String assignedToName;
	private String companyId;//restaurantId gelecek;
	private String mobileNumber;
}
