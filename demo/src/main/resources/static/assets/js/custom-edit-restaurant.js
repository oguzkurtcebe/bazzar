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
		url: HOST_URL + "/restaurant/company/"+id,
		type: "GET",
		success:function(data) {
			$(".restaurantName").val(data.companyName);
			$(".restaurantEmail").val(data.email);
			$(".restaurantMobileNumber").val(data.mobileNumber);
	        var selected = data.categoryId;
	        $(".printCategory").append("<option value='"+data.categoryName+"'>"+data.categoryName+"</option>");


/*--------------------------Restaurant Update--------------------------*/
			    $('.restaurantEdit').click(function() {
					var companyName = $(".restaurantName").val();
					var email = $(".restaurantEmail").val();
					var mobileNumber = $(".restaurantMobileNumber").val();
					
					
					
			
	/* Lon Lat */		
	var city = $(".city option:selected" ).text();
	var district = $(".district option:selected" ).text();
	var region = $(".region option:selected" ).text();
	var street = $(".street option:selected" ).text();
	var no = $("input[name=no]").val();
	var address = region + " mahallesi, " + street + " sokak, no: " + no + " " + district + "/" + city;
	//Hacıbekir, Doğu Cd. No:301, Van Merkez/Van, Türkiye burası
	var apiKey = "iif7-0vejAxEZob8XNhX-4fvO47ApV9cEb681qDeGFY";
	let param = "";
	$.ajax({
	url: "https://geocode.search.hereapi.com/v1/geocode?q="+address+"&apikey="+apiKey,
	type: "GET",
	success:function(data) {
		var postalCode = data.items[0].address.postalCode;
		var latitude = data.items[0].position.lat;
		var longitude = data.items[0].position.lng;
		
					    	var param={
					    			"companyName":companyName,
					    			"email":email,
					    			"mobileNumber":mobileNumber,
					    			"address":{
					        			"postalCode":postalCode,
					    				"location":{
											"latitude": latitude,
											"longitude": longitude,
										},
					        			"address":address
										
					    			}
					    	}
				
					    	var ser_data=JSON.stringify(param);
					        $.ajax({
					        	url: HOST_URL + "/restaurant/company/"+id,
								type: "PUT",
					            data: ser_data,
							    contentType: "application/json",
					            success: function (result) {
					                toastr.success('Restoran Güncellendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
									setTimeout(function(){   
							        window.location.assign("/dashboard/restaurants");
							        }, 1500);
					            },
					            error: function (error) {
							        if(companyName == "" || companyName == null){
										toastr.error('Restoran adı alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else if(email == "" || email == null){
										toastr.error('Email alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else if(mobileNumber == "" || mobileNumber == null){
										toastr.error('Telefon Numarası boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else{
										
									}
					            }
					        });
			        
	}
	})
	/* !Lon Lat */
	
			    });

/*--------------------------!Restaurant Update--------------------------*/



		}
	});
	
	
	


				/*--------------------------Adress Select--------------------------*/
				/*-----City-----*/
							$.getJSON("../assets/company/assets/json/sehir.json", function(data){
								data = data[2].data;
								data.forEach(function(city,index){
									$(".city").append('<option value="'+city.sehir_key+'">'+city.sehir_title+'</option>');
								})
							})
							/*-----!City-----*/
							/*-----District-----*/
							$(".city").on("change",function(){
								var cityId = $(this).val();
								$(".district").attr("disabled", false).html("");
								
								$.getJSON("../assets/company/assets/json/ilce.json", function(data){
									data = data[2].data;
									
									data.forEach(function(district,index){

										if(district.ilce_sehirkey == cityId){
											$(".district").append('<option value="'+district.ilce_key+'">'+district.ilce_title+'</option>');
										}
									})
								})
								
							})
							/*-----!District-----*/
							/*-----Region-----*/
							$(".district").on("change",function(){
								var districtId = $(this).val();
								$(".region").attr("disabled", false).html('<option value="">Seçiniz</option>');
								
								$.getJSON("../assets/company/assets/json/mahalle.json", function(data){
									data = data[2].data;
									
									data.forEach(function(region,index){

										if(region.mahalle_ilcekey == districtId){
											$(".region").append('<option value="'+region.mahalle_key+'">'+region.mahalle_title+'</option>');
										}
									})
								})
								
							})
							/*-----!Region-----*/
							/*-----street-----*/
							$(".region").on("change",function(){
								var districtId = $(this).val();
								$(".street").attr("disabled", false).html('<option value="">Seçiniz</option>');
								
								$.getJSON("../assets/company/assets/json/sokak_cadde.json", function(data){
									data = data[2].data;
									
									data.forEach(function(region,index){

										if(region.sokak_cadde_mahallekey == districtId){
											$(".street").append('<option value="'+region.sokak_cadde_mahallekey+'">'+region.sokak_cadde_title+'</option>');
										}
									})
								})
								
							})
							/*-----!street-----*/
					
				/*--------------------------!Adress Select--------------------------*/
				
		
		
		
});