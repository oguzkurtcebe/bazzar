"use strict";

// Class definition
var KTWizard6 = function () {
	// Base elements
	var _wizardEl;
	var _formEl;
	var _wizardObj;
	var _validations = [];

	// Private functions
	var _initWizard = function () {
		// Initialize form wizard
		_wizardObj = new KTWizard(_wizardEl, {
			startStep: 1, // initial active step number
			clickableSteps: false  // allow step clicking
		});

		// Validation before going to next page
		_wizardObj.on('change', function (wizard) {
			if (wizard.getStep() > wizard.getNewStep()) {
				return; // Skip if stepped back
			}

			// Validate form before change wizard step
			var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step

			if (validator) {
				validator.validate().then(function (status) {
					
  				 	/////////////s/////////////
					
					
  	
  	
  	
				});
			}

			//return false;  // Do not change wizard step, further action will be handled by he validator
		});

		// Change event
		_wizardObj.on('changed', function (wizard) {
			KTUtil.scrollTop();
		});

		// Submit event
		_wizardObj.on('submit', function (wizard) {
			Swal.fire({
				text: "Her şey yolunda! Lütfen form gönderimini onaylayın.",
				icon: "success",
				showCancelButton: true,
				buttonsStyling: false,
				confirmButtonText: "Evet, gönder!",
				cancelButtonText: "Hayır, iptal et",
				customClass: {
					confirmButton: "btn font-weight-bold btn-primary",
					cancelButton: "btn font-weight-bold btn-default"
				}
			}).then(function (result) {
				if (result.value) {
					orderSave();
					//_formEl.submit(); // Submit form
				} else if (result.dismiss === 'cancel') {
					Swal.fire({
						text: "İşlem iptal edildi!.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Tamam, anladım!",
						customClass: {
							confirmButton: "btn font-weight-bold btn-primary",
						}
					});
				}
			});
		});
	}

	var _initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					mobileNumber: {
						validators: {
							notEmpty: {
								message: 'Telefon numarası boş geçilemez'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Step 2
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					/*
					test: {
						validators: {
							notEmpty: {
								message: 'Lütfen adres seçiniz'
							}
						}
					},
					lastName: {
						validators: {
							notEmpty: {
								message: 'Müşteri soyadı boş geçilemez'
							}
						}
					},
					adressDetail: {
						validators: {
							notEmpty: {
								message: 'Adres boş geçilemez'
							}
						}
					}*/
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));

		// Step 3
		_validations.push(FormValidation.formValidation(
			_formEl,
			{
				fields: {
					orderDetail: {
						validators: {
							notEmpty: {
								message: 'Sipariş içeriği boş geçilemez'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap({
						//eleInvalidClass: '',
						eleValidClass: '',
					})
				}
			}
		));
		
	}

	return {
		// public functions
		init: function () {
			_wizardEl = KTUtil.getById('kt_wizard');
			_formEl = KTUtil.getById('kt_form');

			_initWizard();
			_initValidation();
		}
	};
}();

jQuery(document).ready(function () {
	KTWizard6.init();
});








/*--------------------------Category View--------------------------*/
$(document).ready(function() {
	
	



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


	$(".noUser").hide();
	//$(".thereIsUser").hide();
	
	
	var $_GET = {};
	
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	    function decode(s) {
	        return decodeURIComponent(s.split("+").join(" "));
	    }
	
	    $_GET[decode(arguments[1])] = decode(arguments[2]);
	});
	var id = $_GET["id"];
	 
	$.ajax({
		url: HOST_URL + "/delivery/order/"+id,
		type: "GET",
		success:function(data) {
			
			$("#DBfirstName").text(data.user[0].firstName);
			$("#DBlastName").text(data.user[0].lastName);
			$("#DBmobileNumber").text(data.user[0].mobileNumber);
			$("#userID").val(data.userId);
			
			$("#firstNamelastName").text(data.user[0].firstName+" "+data.user[0].lastName);
			
			$("#defaultAddress").text(data.address.flatNo+' ('+data.address.address+')');
			
			var mobileNumber = data.user[0].mobileNumber;
			var test = data.address.address;
			var testPrint = data.address.flatNo+' ('+data.address.address+')';
			var latitude = data.address.location.latitude;
			var longitude = data.address.location.longitude;
			$.ajax({
			url: HOST_URL + "/delivery/address?mobileNumber="+data.user[0].mobileNumber,
			type: "GET",
			success:function(data) {
				data.forEach(function(adressData,index){
					if(test == adressData.address){
						$("#DBaddress").append('<label class="radio deletedAdress"><input type="radio" data-title="'+testPrint+'" name="address" value="" checked="true" /><span></span>'+testPrint+'</label>');
						
						$(".yazi7").html(latitude);
						$(".yazi8").html(longitude);
					}else{
						$("#DBaddress").append('<label class="radio deletedAdress"><input type="radio" data-title="'+adressData.flatNo+' ('+adressData.address+')" name="address" value="'+adressData._id+'"/><span></span>'+adressData.flatNo+' ('+adressData.address+')</label>');
					}
					
				})
		    }
		    });
		    
					
					
/*--------------------------Print Data--------------------------*/

$(".printData").click( function () {
	var adress = $("input[name='address']:checked").val();
	$("#adressDetail").text(adress);
	$("#mobileNumber").text(mobileNumber);
	
	var adressTitle = $("input[name='address']:checked").attr('data-title');
	$("#adressDetailTitle").text(adressTitle);
		$.ajax({
		url: HOST_URL + "/delivery/address?mobileNumber="+mobileNumber,
		type: "GET",
		success:function(data) {
			data.forEach(function(addressDataDB,index){
				if(addressDataDB._id == $("#adressDetail").text()){
					$(".yazi1").html(addressDataDB.address);
					$(".yazi2").html(addressDataDB.flatNo);
					$(".yazi3").html(addressDataDB.postalCode);
					$(".yazi4").html(addressDataDB.addressType);
					$(".yazi5").html(addressDataDB.landmark);
					$(".yazi6").html(addressDataDB.apartmentName);
					$(".yazi7").html(addressDataDB.location.latitude);
					$(".yazi8").html(addressDataDB.location.longitude);
				}
			})
	    }
	    })
	
	var order = $("input[name=orderDetail]").val();
	$("#orderDetail").text(order);
});
/*--------------------------Print Data--------------------------*/
		    
					$(".totalPricePrint").html(data.grandTotal);
	        var cart = data.cart;
			cart.forEach(function(cart) {
				
				
    				var productInfo = '<tr class="dataid orderCartSubmit delete_'+cart.productId+'" data-id="'+cart.productId+'" data-img="'+cart.imageUrl+'" data-price="'+cart.productPrice+'" data-title="'+cart.productTitle+'" data-categoryId="'+cart.categoryId+'">'+
    									'<input type="hidden" class="piecesId_'+cart.productId+'" value="'+cart.productId+'"/>'+
										'<td class="d-flex align-items-center font-weight-bolder">'+
											'<div class="symbol symbol-60 flex-shrink-0 mr-4 bg-light">'+
												'<div class="symbol-label" style="background-image: url('+cart.imageUrl+')"></div>'+
											'</div>'+
											'<a href="#" class="text-dark text-hover-primary">'+cart.productTitle+'</a>'+
										'</td>'+
										'<td class="text-center align-middle">'+
											'<a href="javascript:;" class="btn btn-xs btn-light-success btn-icon mr-2 piecesDelete_'+cart.productId+'" data-price="'+cart.productPrice+'" id="'+cart.productId+'">'+
												'<i class="ki ki-minus icon-xs"></i>'+
											'</a>'+
											'<span class="mr-2 font-weight-bolder pieces_'+cart.productId+'">'+cart.quanity+'</span>'+
											'<a href="javascript:;" class="btn btn-xs btn-light-success btn-icon piecesAdd_'+cart.productId+'" data-price="'+cart.productPrice+'" id="'+cart.productId+'">'+
												'<i class="ki ki-plus icon-xs"></i>'+
											'</a>'+
										'</td>'+
										
											
										'<td class="text-right align-middle font-weight-bolder font-size-h5">₺<span class="total_'+cart.productId+'">'+cart.productTotal+'</span></td>'+
										'<td class="text-right align-middle">'+
											'<div class="btn btn-danger btn-hover-light deleteProduct_'+cart.productId+'" id="'+cart.productId+'" data-price="'+cart.productPrice+'"><i class="fa fa-trash"></></div>'+
										'</td>'+
									'</tr>';
						$(".shoppingCart").append(productInfo);
										
										$(".piecesAdd_"+cart.productId).click( function (){
											var id = $(this).attr("id");
											var cart_price = ($(this).attr('data-price'));
											var pieces = $(".pieces_"+id).html();
											$(".total_"+id).html(parseFloat(cart_price) * (parseFloat(pieces)+1) );
											
											if($(".pieces_"+id).html() > 0){
												$(".pieces_"+id).html(parseFloat($(".pieces_"+id).html())+1);
												$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())+parseFloat(cart_price));
											}
										})
										$(".piecesDelete_"+cart.productId).click( function (){
											var id = $(this).attr("id");
											var cart_price = ($(this).attr('data-price'));
											var pieces = $(".pieces_"+id).html();
											
											if(parseFloat($(".pieces_"+id).html()) != 1){
												$(".total_"+id).html(parseFloat(cart_price) * (parseFloat(pieces)-1) );
												$(".pieces_"+id).html(parseFloat($(".pieces_"+id).html())-1);
												$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())-parseFloat(cart_price));
											}
										})
									
									$(".deleteProduct_"+cart.productId).click( function (){
										
										var deleteId = $(this).attr("id");
										var deletePrice = $(this).attr("data-price");
										var deletePieces = $(".pieces_"+deleteId).html();
										
										if(deletePieces > 1){
											$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())-(parseFloat(deletePrice) * parseFloat(deletePieces) ));
										}
										else if(deletePieces == 1){
											$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())-parseFloat(deletePrice));
										}
										
										$(".delete_"+deleteId).remove();
										
									})
									
					});
		    
		    
		    
		    
		    
		    
		    

/*--------------------------Adress Add--------------------------*/
$("#adressAdd").click( function () {
	$(".deletedAdress").remove();

	
	var flatNo = $("input[name=flatNo]").val();
	var landmark = $("input[name=landmark]").val();
	var addressType = $("input[name='addressType']:checked").val();

	var id = $("input[name=userID]").val();

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
    	param={
    			"status":true,
    			"mobileNumber":mobileNumber,
    			"address":address,
    			"flatNo":flatNo,
    			"landmark":landmark,
    			"userId":id,
    			"postalCode":postalCode,
    			"location":{
								"latitude": latitude,
								"longitude": longitude,
							},
    			"addressType":addressType
    	}
    	
    	var ser_data=JSON.stringify(param);
    	
		$.ajax({
		url: HOST_URL + "/delivery/address",
		type: "POST",
        data: ser_data,
	    contentType: "application/json",
        success: function (data) {
			toastr.success('Adres Kaydedildi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
			
/*User Control*/
			$.ajax({
			url: HOST_URL + "/delivery/user/"+mobileNumber,
			type: "GET",
			success:function(data) {	    
				if(data.mobileNumber == mobileNumber){
					$(".noUserModal").attr('aria-hidden', 'true');
					$(".thereIsUser").show();
					$("#DBfirstName").text(data.firstName);
					$("#DBlastName").text(data.lastName);
					$("#DBmobileNumber").text(mobileNumber);
					
					$("#firstNamelastName").text(data.firstName+" "+data.lastName);
					
					$.ajax({
					url: HOST_URL + "/delivery/address?mobileNumber="+mobileNumber,
					type: "GET",
					success:function(data) {
						data.forEach(function(adressData,index){
							$("#DBaddress").append('<label class="radio deletedAdress"><input type="radio" name="address" value="'+adressData._id+'"/><span></span>'+adressData.flatNo+' ('+adressData.address+')</label>');
						})
				    }
				    });
			    
				}else{
					$(".noUser").show();
					$(".thereIsUser").hide();
				}
		    }
		    });
/*!User Control*/

	    },error: function () {
			toastr.error('Bir sorun oluştu..', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
		}
	    });
    }
    })

	var firstName = $("input[name=firstName]").val();
	var lastName = $("input[name=lastName]").val();
	$("#firstNamelastName").text(firstName+" "+lastName);
	
	var adress = $("input[name='address']:checked").val();
	$("#adressDetail").text(adress);
	
	var order = $("input[name=orderDetail]").val();
	$("#orderDetail").text(order);
});

/*--------------------------!Adress Add--------------------------*/




		    
	    }
    });  
    
    
    
	
	
	$.ajax({
		url: HOST_URL + "/delivery/allCategories",
		type: "GET",
		success:function(data) {
			data = data;
			data.forEach(function(categoryData,index){

				var name = '<li class="nav-item mr-3 categorySelect" id="'+categoryData._id+'">'+
								'<a class="nav-link" data-toggle="tab" href="#kt_apps_contacts_view_tab_2">'+
									'<span class="nav-text font-weight-bold">'+categoryData.title+'</span>'+
								'</a>'+
							'</li>';
		        
				$("#printCategory").append(name);

			});
			
			
			$(".categorySelect").click( function () {
				var id = ($(this).attr("id"));
				
				$(".deleted").remove();
				$.ajax({
				url: HOST_URL + "/delivery/products/"+id,
				type: "GET",
				success:function(data) {
					data = data;
					
					
					var listele = [];
					data.forEach(function(categoryData,index){
						var product = '<div class="col-md-4 col-xxl-4 col-lg-12 deleted infoProduct">'+
										'<div class="card card-custom card-shadowless">'+
											'<div class="card-body p-0">'+
												'<div class="overlay">'+
													'<div class="overlay-wrapper rounded bg-light text-center">'+
														'<img src="'+categoryData.imageUrl+'" alt="" class="mw-100 w-200px" />'+
													'</div>'+
													'<div class="overlay-layer">'+
														'<div class="addCart btn font-weight-bolder btn-sm btn-light-primary" data-categoryId="'+id+'" data-name="'+categoryData.title+'" data-price="'+categoryData.price+'" data-id="'+categoryData._id+'" data-img="'+categoryData.imageUrl+'" id="'+categoryData._id+'">Sepete Ekle</div>'+
													'</div>'+
												'</div>'+
												'<div class="text-center mt-5 mb-md-0 mb-lg-5 mb-md-0 mb-lg-5 mb-lg-0 mb-5 d-flex flex-column">'+
													'<a href="#" class="font-size-h5 font-weight-bolder text-dark-75 text-hover-primary mb-1">'+categoryData.title+'</a>'+
													'<span class="font-size-lg">'+categoryData.price+'TL</span>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>';
				        
						$("#productPrint").append(product);
		
					});	
					
					
					var orderCount = 0;
					$(".addCart").click( function (){
						
					var div = $(".cartBtn");
				    div.css({background: 'red'}, "slow");
    
					var cart_id = ($(this).attr('data-id'));
					var cart_img = ($(this).attr('data-img'));
					var cart_title = ($(this).attr('data-name'));
					var cart_price = ($(this).attr('data-price'));
					var cart_category = ($(this).attr('data-categoryId'));
					
					
    				var productInfo = '<tr class="dataid orderCartSubmit delete_'+cart_id+'" data-id="'+cart_id+'" data-img="'+cart_img+'" data-price="'+cart_price+'" data-title="'+cart_title+'" data-categoryId="'+cart_category+'">'+
    									'<input type="hidden" class="piecesId_'+cart_id+'" value="'+cart_id+'"/>'+
										'<td class="d-flex align-items-center font-weight-bolder">'+
											'<div class="symbol symbol-60 flex-shrink-0 mr-4 bg-light">'+
												'<div class="symbol-label" style="background-image: url('+cart_img+')"></div>'+
											'</div>'+
											'<a href="#" class="text-dark text-hover-primary">'+cart_title+'</a>'+
										'</td>'+
										'<td class="text-center align-middle">'+
											'<a href="javascript:;" class="btn btn-xs btn-light-success btn-icon mr-2 piecesDelete_'+cart_id+'" data-price="'+cart_price+'" id="'+cart_id+'">'+
												'<i class="ki ki-minus icon-xs"></i>'+
											'</a>'+
											'<span class="mr-2 font-weight-bolder pieces_'+cart_id+'">1</span>'+
											'<a href="javascript:;" class="btn btn-xs btn-light-success btn-icon piecesAdd_'+cart_id+'" data-price="'+cart_price+'" id="'+cart_id+'">'+
												'<i class="ki ki-plus icon-xs"></i>'+
											'</a>'+
										'</td>'+
										
											
										'<td class="text-right align-middle font-weight-bolder font-size-h5">₺<span class="total_'+cart_id+'">'+cart_price+'</span></td>'+
										'<td class="text-right align-middle">'+
											'<div class="btn btn-danger btn-hover-light deleteProduct_'+cart_id+'" id="'+cart_id+'" data-price="'+cart_price+'"><i class="fa fa-trash"></></div>'+
										'</td>'+
									'</tr>';
    				
									if(cart_id == $(".piecesId_"+cart_id).val()){
										 $(".pieces_"+cart_id).html(parseFloat($(".pieces_"+cart_id).html())+1);
										 $(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())+parseFloat(cart_price));
										 var deletePieces = $(".pieces_"+cart_id).html();
										 var deletePrice = $(".piecesDelete_"+cart_id).attr("data-price");
										 $(".total_"+cart_id).html(parseFloat(deletePrice) * parseFloat(deletePieces));
										 
									}else{
										$(".shoppingCart").append(productInfo);
										orderCount++;
										$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())+parseFloat(cart_price));
										$(".orderCount").html(orderCount);
										
										
										$(".piecesAdd_"+cart_id).click( function (){
											var id = $(this).attr("id");
											var cart_price = ($(this).attr('data-price'));
											var pieces = $(".pieces_"+id).html();
											$(".total_"+id).html(parseFloat(cart_price) * (parseFloat(pieces)+1) );
											
											if($(".pieces_"+id).html() > 0){
												$(".pieces_"+id).html(parseFloat($(".pieces_"+id).html())+1);
												$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())+parseFloat(cart_price));
											}
										})
										$(".piecesDelete_"+cart_id).click( function (){
											var id = $(this).attr("id");
											var cart_price = ($(this).attr('data-price'));
											var pieces = $(".pieces_"+id).html();
											
											if(parseFloat($(".pieces_"+id).html()) != 1){
												$(".total_"+id).html(parseFloat(cart_price) * (parseFloat(pieces)-1) );
												$(".pieces_"+id).html(parseFloat($(".pieces_"+id).html())-1);
												$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())-parseFloat(cart_price));
											}
										})
									}
									
									$(".deleteProduct_"+cart_id).click( function (){
										
										var deleteId = $(this).attr("id");
										var deletePrice = $(this).attr("data-price");
										var deletePieces = $(".pieces_"+deleteId).html();
										
										if(deletePieces > 1){
											$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())-(parseFloat(deletePrice) * parseFloat(deletePieces) ));
										}
										else if(deletePieces == 1){
											$(".totalPricePrint").html(parseFloat($(".totalPricePrint").html())-parseFloat(deletePrice));
										}
										
										$(".delete_"+deleteId).remove();
										
									})
									
										
									
						
					})
					
				}
			});
			
			})


		}
	});
});
/*--------------------------Category View--------------------------*/


/*--------------------------Orders Add--------------------------*/
function orderSave(){ 

	var mobileNumber = $("#DBmobileNumber").text();
	var firstName = $("#DBfirstName").text();
	var lastName = $("#DBlastName").text();
	
	var userId = $("#userID").val();
	var adress = $("#adressDetail").text();
	var adressTitle = $("#adressDetailTitle").text();
	
	
	var adressDetailTitle = $("#adressDetailTitle").text();
	var total = $(".totalPriceControl").children(".totalPricePrint").text();
	
    	var userData = [];
		userData.push({
				    	"firstName": firstName,
				        "lastName": lastName,
				        "mobileNumber": mobileNumber
					 });
					 	
    	var cartData = [];  	
		$($(".shoppingCartControl").children(".orderCartSubmit")).each(function(index){
			
			cartData.push({
					    	"productId": $(this).attr('data-id'),
					        "productTitle": $(this).attr('data-title'),
					        "productPrice": $(this).attr('data-price'),
					        "quanity": $(".pieces_"+$(this).attr('data-id')).html(),
					        "productTotal": $(".total_"+$(this).attr('data-id')).html(),
					        "imageUrl": $(this).attr('data-img'),
					        "categoryId": $(this).attr('data-categoryId')
						 });
		});
//		var ser_data=JSON.stringify(cartData);
//		console.log(ser_data);
//		return false;
		
	    
		var addressData = [];
		
		addressData.push({
				    	"address": $(".yazi1").text(),
				        "flatNo": $(".yazi2").text(),
				        "postalCode": $(".yazi3").text(),
				        "addressType": $(".yazi4").text(),
				        "landmark": $(".yazi5").text(),
				        "apartmentName": $(".yazi6").text()/*,
				        "location": {
										"latitude": addressDataDB.latitude,
										"longitude": addressDataDB.longitude
									}*/
					 });
	    
    	var param={
					"userId": userId,
					"deliveryAddress": adress,
					"grandTotal": total,
	    			"status":true,
				    "cart": cartData,
				    "user": userData,
    				"address":{
    				"location":{
						"latitude": $(".yazi7").text(),
						"longitude": $(".yazi8").text()
					},
        			"address":$(".yazi1").text(),
			        "flatNo": $(".yazi2").text(),
        			"postalCode": $(".yazi3").text(),
			        "addressType": $(".yazi4").text(),
			        "landmark": $(".yazi5").text(),
			        "apartmentName": $(".yazi6").text()
					
    			}
	    }
		var ser_data=JSON.stringify(param);
		
		var $_GET = {};
		
		document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
		    function decode(s) {
		        return decodeURIComponent(s.split("+").join(" "));
		    }
		
		    $_GET[decode(arguments[1])] = decode(arguments[2]);
		});
		var updateId = $_GET["id"];
	

	    if(!addressData[0] || addressData[0].address == "" || addressData[0].address == null){
			toastr.error('Lütfen bir adres seçiniz..', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000});
		}
	    else if(!cartData[0] || cartData[0].productTitle == "" || cartData[0].productTitle == null){
			toastr.error('Lütfen sepete en az 1 ürün ekleyin..', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000});
		}
		else{
			$.ajax({
			url: HOST_URL + "/delivery/order/"+updateId,
			type: "PUT",
	        data: ser_data,
		    contentType: "application/json",
	        success: function (data) {
				toastr.success('Sipariş Oluşturuldu.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
				setTimeout(function(){   
		        window.location.assign("/company/orders");
		        }, 1500);
		    },error: function () {
				toastr.error('Bir sorun oluştu..', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
			}
		    });
		}

};

/*--------------------------!Orders Add--------------------------*/
