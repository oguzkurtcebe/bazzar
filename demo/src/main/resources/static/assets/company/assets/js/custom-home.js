
$.ajax({
	url: HOST_URL + "/delivery/categories",
	type: "GET",
	success:function(data) {	
		$(".categories").html(data.totalElements);
	}
});

$.ajax({
	url: HOST_URL + "/delivery/products",
	type: "GET",
	success:function(data) {	
		$(".products").html(data.totalElements);
	}
});

$.ajax({
	url: HOST_URL + "/delivery/orders",
	type: "GET",
	success:function(data) {	
		$(".orders").html(data.totalElements);
	}
});