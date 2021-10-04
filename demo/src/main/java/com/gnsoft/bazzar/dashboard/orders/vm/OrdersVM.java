package com.gnsoft.bazzar.dashboard.orders.vm;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.gnsoft.bazzar.dashboard.orders.Address;
import com.gnsoft.bazzar.dashboard.orders.Cart;
import com.gnsoft.bazzar.dashboard.orders.ItemCancellList;
import com.gnsoft.bazzar.dashboard.orders.Order;
import com.gnsoft.bazzar.dashboard.orders.RejectedByDeliveryBoy;
import com.gnsoft.bazzar.dashboard.orders.TransactionDetails;
import com.gnsoft.bazzar.dashboard.product.Product;

import lombok.Data;

@Data
@JsonInclude(value=Include.NON_EMPTY, content=Include.NON_NULL)
public class OrdersVM {
	@Id
	private String _id;
	@DBRef
	@NotBlank
	private List<Cart> cart;
	private double tax;
	private int totalProduct;
	private String couponCode;
	private TransactionDetails  transactionDetails;
	@NotNull
	private String paymentType;
	@NotNull
	private String deliveryDate;
	@NotNull
	private String deliveryTime;
	private int usedWalletAmount;
	private int orderID;
	private Address address;
	private Object user ;
	
	private String orderStatus;
	private boolean isOrderAssigned;
	private boolean isAcceptedByDeliveryBoy;
	private boolean isDeliveryBoyRated;
	private boolean isWalletUsed;	
	private int amountRefundedOrderModified;
	@DBRef
	private List<ItemCancellList> itemCancellList;
	private boolean isSubscriptionOrder;
	private long subTotal;
	private Product product;
	private double grandTotal;
	private int deliveryCharges;
	private String deliveryInstruction;
	private int couponAmount;
	private String  userId;
	private String paymentStatus;
	private String cardId;
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
	
	
	public  OrdersVM(Order order) {
		this.set_id(order.get_id());
		this.setCart(order.getCart());
		this.setTax(order.getTax());
		this.setTotalProduct(order.getTotalProduct());
		this.setCouponCode(order.getCouponCode());
		this.setTransactionDetails(order.getTransactionDetails());
		this.setOrderID(order.getOrderID());
		this.setPaymentType(order.getPaymentType());
		this.setDeliveryDate(order.getDeliveryDate());
		this.setDeliveryTime(order.getDeliveryTime());
		this.setUsedWalletAmount(order.getUsedWalletAmount());
		this.setRejectedByDeliveryBoy(order.getRejectedByDeliveryBoy());
		this.setCreatedAt(order.getCreatedAt());
		this.setUpdatedAt(order.getUpdatedAt());
		this.setAddress(order.getAddress());
		this.setUser(order.getUser());
		this.setOrderStatus(order.getOrderStatus());
		this.setAcceptedByDeliveryBoy(order.isAcceptedByDeliveryBoy());
		this.setOrderAssigned(order.isOrderAssigned());
		this.set_id(order.get_id());
		this.setGrandTotal(order.getGrandTotal());
		this.setPaymentStatus(order.getPaymentStatus());
		this.setAssignedToName(order.getAssignedToName());
	}


	
}
