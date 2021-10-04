
$.ajax({
	url: HOST_URL + "/rest/categories",
	type: "GET",
	success:function(data) {	
		$(".categories").html(data.totalElements);
	}
});

$.ajax({
	url: HOST_URL + "/rest/products",
	type: "GET",
	success:function(data) {	
		$(".products").html(data.totalElements);
	}
});

$.ajax({
	url: HOST_URL + "/rest/orders",
	type: "GET",
	success:function(data) {	
		$(".orders").html(data.totalElements);
	}
});

$.ajax({
	url: HOST_URL + "/rest/users",
	type: "GET",
	success:function(data) {	
		$(".users").html(data.totalElements);
	}
});