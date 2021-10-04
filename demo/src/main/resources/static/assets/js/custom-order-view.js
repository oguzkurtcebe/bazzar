
$(document).ready(function() {
	
	
	var $_GET = {};
	
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	    function decode(s) {
	        return decodeURIComponent(s.split("+").join(" "));
	    }
	
	    $_GET[decode(arguments[1])] = decode(arguments[2]);
	});
	var id = $_GET["id"];
	
	$.ajax({
	url: HOST_URL + "/rest/order/"+id,
	type: "GET",
	success:function(data) {
		data = data;
		$(".firstName").text(data.user.firstName);
		$(".lastName").text(data.user.lastName);
		$(".email").text(data.user.email);
		$(".mobileNumber").text(data.user.countryCode + "" + data.user.mobileNumber);
		
		
		$(".orderId").text(data.orderID);
		$(".subscriptionOrder").text(data.subscriptionOrder);
		if(data.orderStatus == "DELIVERED"){
			orderStatus= '<span class="label label-lg font-weight-bold label-success label-inline orderStatus">Teslim Edildi</span>';
		}else if(data.orderStatus == "CANCELLED"){
			orderStatus= '<span class="label label-lg font-weight-bold label-danger label-inline orderStatus">İptal Edildi</span>';
		}else if(data.orderStatus == "OUT_FOR_DELIVERY"){
			orderStatus= '<span class="label label-lg font-weight-bold label-light-success label-inline orderStatus">İptal Edildi</span>';
		}else{
			
		}
		$(".orderStatus").html(orderStatus);
		$(".deliveryDate").html(data.deliveryDate);
		$(".deliveryTime").html(data.deliveryTime);
		if(data.assignedToName != "" || data.assignedToName != null || assignedToName){
			assignedToName = '<span class="text-info ng-star-inserted ">'+data.assignedToName+'</span>';
		}else{
			assignedToName = '<span class="text-info ng-star-inserted ">Henüz atanmamış kullanıcı sayısı</span>';
		}
		$(".assignedToName").html(assignedToName);
		$(".address").html(data.address.address);
		$(".flatNo").text(data.address.flatNo);
		$(".apartmentName").text(data.address.apartmentName);
		$(".landmark").text(data.address.landmark);
		$(".addressType").text(data.address.addressType);
		$(".postalCode").text(data.address.postalCode);
		
		
		var formattedOutput = new Intl.NumberFormat('tr-TR', {
		    style: 'currency',
		    currency: 'TRY',
		    minimumFractionDigits: 2,
		  });
		
		$(".subTotal").text(formattedOutput.format(data.subTotal));
		$(".tax").text(data.tax+"%");
		$(".deliveryCharges").text(formattedOutput.format(data.deliveryCharges));
		$(".paymentType").text(data.paymentType);
		$(".paymentStatus").text(data.paymentStatus);
		$(".usedWalletAmount").text(formattedOutput.format(data.usedWalletAmount));
		$(".amountRefunded").text(formattedOutput.format(data.amountRefunded));
		$(".grandTotal").html(formattedOutput.format(data.grandTotal));
		$(".transactionAmount").html(formattedOutput.format(data.transactionDetails.transactionAmount));
		
		var counter = 0;
		data.cart.forEach(function(cartData,index){
			counter++;
			var cart = 	'<tr class="ng-star-inserted">'+
							'<td class="text-center">'+counter+'</td>'+
							'<td class="text-center">'+cartData.productName+'</td>'+
							'<td class="text-center">'+formattedOutput.format(cartData.price)+' <br class="ng-star-inserted"><span class="text-info ng-star-inserted">Orijinal fiyat: '+formattedOutput.format(cartData.price)+'</span></td>'+
							'<td class="text-center">'+formattedOutput.format(cartData.dealAmount)+'</td>'+
							'<td class="text-center">'+cartData.quantity+'('+cartData.unit+')</td>'+//<br class="ng-star-inserted">Miktar: 13&nbsp;(500 GR) </span>
							'<td class="text-center">'+formattedOutput.format(cartData.productTotal)+'<br class="ng-star-inserted"><span class="text-info ng-star-inserted">Orijinal Toplam: '+formattedOutput.format(cartData.productTotal)+' </span></td>'+
							'<td class="text-center">-</td>'+
							'<td class="text-center">'+formattedOutput.format(cartData.amountRefunded)+'</td>'+
						'</tr>';
			$(".printCart").before(cart);
		})
		
		$(".subTotal").html(formattedOutput.format(data.subTotal));
		$(".grandTotal").html(formattedOutput.format(data.grandTotal));
		$(".usedWalletAmount").html(formattedOutput.format(data.usedWalletAmount));
	}
	});
});