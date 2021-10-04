
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
			
		
		var formattedOutput = new Intl.NumberFormat('tr-TR', {
		    style: 'currency',
		    currency: 'TRY',
		    minimumFractionDigits: 2,
		  });
		
		var counter = 0;
		data.cart.forEach(function(cartData,index){
			counter++;
			var cart = 	'<tr class="ng-star-inserted" id="product_'+cartData._id+'">'+
							'<td class="text-center">'+counter+'</td>'+
							'<td class="text-center">'+cartData.productName+'</td>'+
							'<td class="text-center">'+formattedOutput.format(cartData.price)+' <br class="ng-star-inserted"><span class="text-info ng-star-inserted">Orijinal fiyat: '+formattedOutput.format(cartData.price)+'</span></td>'+
							'<td class="text-center">'+formattedOutput.format(cartData.dealAmount)+'</td>'+
							'<td class="text-center">'+cartData.quantity+'('+cartData.unit+')</td>'+//<br class="ng-star-inserted">Miktar: 13&nbsp;(500 GR) </span>
							'<td class="text-center">'+formattedOutput.format(cartData.productTotal)+'<br class="ng-star-inserted"><span class="text-info ng-star-inserted">Orijinal Toplam: '+formattedOutput.format(cartData.productTotal)+' </span></td>'+
							'<td class="text-center"><button type="button" class="btn btn-raised btn-primary ng-star-inserted"><em _ngcontent-c10="" class="fa fa-edit"></em></button>'+
							'<td class="text-center"><button type="button" id="'+cartData._id+'" data-productPrice="'+cartData.productTotal+'" data-subTotal="'+data.subTotal+'" data-grandTotal="'+data.grandTotal+'" class="btn btn-raised btn-danger ng-star-inserted productDelete infoProduct_'+cartData._id+'"><em _ngcontent-c10="" class="fa fa-trash"></em></button>'+
						'</tr>';
						
			var defaultCart = '<input type="hidden" class="defaultProduct defaultProduct_'+cartData._id+'" data-productName="'+cartData.productName+'"' +
						'data-id="'+cartData._id+'"'+
						'data-productId="'+cartData.productId+'"'+
						'data-quantity="'+cartData.quantity+'"'+
						'data-price="'+cartData.price+'"'+
						'data-amountRefunded="'+cartData.amountRefunded+'"'+
						'data-productTotal="'+cartData.productTotal+'"'+
						'data-unit="'+cartData.unit+'"'+
						'data-imageUrl="'+cartData.imageUrl+'"'+
						'data-categoryId="'+cartData.categoryId+'"'+
						'data-subCategoryId="'+cartData.subCategoryId+'"'+
						'data-dealAmount="'+cartData.dealAmount+'"'+
						'data-dealAvailable="'+cartData.dealAvailable+'"'+
						' />';
			$(".printCart").before(cart,defaultCart);
			
						
		})
		$(".subTotal").html(formattedOutput.format(data.subTotal));
		$(".grandTotal").html(formattedOutput.format(data.grandTotal));
		
		$(".subTotal").attr("data-subTotal", data.subTotal);
		$(".grandTotal").attr("data-grandTotal", data.grandTotal);
		$(".usedWalletAmount").html(formattedOutput.format(data.usedWalletAmount));
		
		$(".productDelete").click(function() {
		    var silinecekId = $(this).attr("id");
		    var subTotal = $(this).attr("data-subTotal");
		    var grandTotal = $(this).attr("data-grandTotal");
		    var productPrice = $(this).attr("data-productPrice");
			userDelete(silinecekId, subTotal, grandTotal, productPrice);
		})
	}
	});
	

			//sweatAlert
			function userDelete(silinecekId, subTotal, grandTotal, productPrice){
				$(function() {
				
					Swal.fire({
					title: "Ürünü sepetten silmek istediğinize emin misiniz?",
					text: "Bu işlemi onaylarsanız geri alamazsınız!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Evet, sil!",
					cancelButtonText: "Hayır, iptal et!",
					reverseButtons: true
					}).then(function(result) {
					if (result.value) {
						$(".productDelete").attr("data-subTotal", subTotal - productPrice);
						$(".productDelete").attr("data-grandTotal", grandTotal - productPrice);
						
						$(".subTotal").text(subTotal - productPrice);
						$(".grandTotal").text(grandTotal - productPrice);
						$(".subTotal").attr("data-subTotal", subTotal - productPrice);
						$(".grandTotal").attr("data-grandTotal", grandTotal - productPrice);
						var subTotalTest = subTotal - productPrice;
						var grandTotalTest = grandTotal - productPrice;
						$("#product_"+silinecekId).remove();
						$(".defaultProduct_"+silinecekId).remove();
				    	var cartData = [];  	
						$($(".defaultProduct")).each(function(index){
							
							cartData.push({
									    	"_id": $(this).attr("data-id"),
									    	"productName": $(this).attr("data-productName"),
								            "productId": $(this).attr("data-productId"),
								            "quantity": $(this).attr("data-quantity"),
								            "price": $(this).attr("data-price"),
								            "amountRefunded": $(this).attr("data-amountRefunded"),
								            "productTotal": $(this).attr("data-productTotal"),
								            "unit": $(this).attr("data-unit"),
								            "imageUrl": $(this).attr("data-imageUrl"),
								            "categoryId": $(this).attr("data-categoryId"),
								            "subCategoryId": $(this).attr("data-subCategoryId"),
								            "dealAmount": $(this).attr("data-dealAmount"),
								            "dealAvailable": $(this).attr("data-dealAvailable")
										 });
						});
						
				        var param={
				    		"cart": cartData,
						    "orderStatus": "DELIVERED",
						    "subTotal": subTotalTest,
						    "grandTotal": grandTotalTest
				    	}
				    	var ser_data=JSON.stringify(param);
				    	console.log("\n Burası sonn " + ser_data)
				    	
						$.ajax({
						url: HOST_URL + "/rest/orderCart/"+id,
						type: "PATCH",
			            data: ser_data,
					    contentType: "application/json",
						success: function(data){
							
						    Swal.fire({
								position: "top-right",
						        title: "Ürün başarıyla silindi!",
						        icon: "success",
								showConfirmButton: false,
								timer: 1500
						    })
						}
						})
				
				
				
					} else if (result.dismiss === "cancel") {
					    Swal.fire(
					        "İptal edildi",
					        "Ürün güvende :)",
					        "error"
					    )
					}
					});
				
				
				});
			}
	
	
	
/*--------------------------Product Search--------------------------*/

$('#searchProduct').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
   		document.getElementById("enterSearch").click();
    }
});
			$(".searchProduct").click(function(){
				var titleSearch = $("#searchProduct").val();
				var counter = 0;
				$("#printProduct").html("");
				$("#pageLoader").show();
				$.ajax({
					url: HOST_URL + "/rest/findProduct?title="+titleSearch,
					type: "GET",
					success: function(data){
						$("#pageLoader").hide();
			
						data.forEach(function(productData,index){
							counter++;
							var price = "";
							if(!productData.variant){
								price = "";
							}else{
								price = productData.variant[0].price+"TL";
							}
							var product='<div class="col-md-4 ng-star-inserted" style="box-shadow: 0px 0px 2px black; padding: 5px"><h4 class="searched-title">'+productData.title+'('+price+')</h4><button type="button" data-title="'+productData.title+'" data-id="'+productData._id+'" data-toggle="modal" data-target=".exampleModalSizeLg" class="btn btn-primary edit-button addCart">Sepete Ekle</button></div>';
					        
							$("#printProduct").append(product);
				    	});
							addCart();
				    	
					}
				})
				
			});
			
/*--------------------------Product Search--------------------------*/

			function addCart(){
				$(".addCart").click(function(){
					
					var id = $(this).attr("data-id");
					var title = $(this).attr("data-title");
					
					$(".productTitle").text(title);
					$(".saveCart").attr("data-id",id);
					$(".variant").html("");
					$.ajax({
					url: HOST_URL + "/rest/product/"+id,
					type: "GET",
					success: function(data){
						$("#pageLoader").hide();
						data = data.variant;
						data.forEach(function(variantData,index){
							
							var product='<option value="'+variantData._id+'" data-price="'+variantData.price+'" data-unit="'+variantData.unit+'">'+variantData.unit+'('+variantData.price+')</option>';
					        
							$(".variant").append(product);
				    	});
						$(".productPrice").text(data[0].price);
				    	
				    	
				    	
					    $('.variant').on('change', function() {
							$(".quantity").val(1);
							var price = $('option:selected', this).attr("data-price");
							$(".productPrice").text(price);
						    
						});
				
						$(document).on("change", ".quantity", function() {
						  var sum = 0;
						  $(".quantity").each(function() {
						    sum += +$(this).val();
						  });
						  $(".productPrice").text($('option:selected', $('.variant')).attr("data-price") * sum);
						});
				
					}
				})
				
				})
			}
			
			
			$(".saveCart").click(function(){
				var productId = $(this).attr("data-id");
				
				
				$.ajax({
				url: HOST_URL + "/rest/product/"+productId,
				type: "GET",
				success: function(data){
					var productName = data.title;
					var productId = data._id;
					var imageUrl = data.productImages[0].imageUrl;
					var categoryId = data.categoryId;
					var subCategoryId = data.subCategoryId;
						
						
					var quantity = $(".quantity").val();
					var price = $('option:selected', $('.variant')).attr("data-price");
					var productTotal = $(".productPrice").text();
					var unit = $('option:selected', $('.variant')).attr("data-unit");
								
				    var subTotalSon = parseFloat($(".subTotal").attr("data-subTotal"))+parseFloat(productTotal);
				    var grandTotalSon =  parseFloat($(".grandTotal").attr("data-grandTotal"))+parseFloat(productTotal);
		        var param={
		    		"cart": [{
					            "_id": productId,
					            "productName": productName,
					            "productId": productId,
					            "quantity": quantity,
					            "price": price,
					            "amountRefunded": 0,
					            "productTotal": productTotal,
					            "unit": unit,
					            "imageUrl": imageUrl,
					            "categoryId": categoryId,
					            "subCategoryId": subCategoryId,
					            "dealAmount": 0,
					            "dealAvailable": false
					        }],
					    "orderStatus": "DELIVERED",
					    "subTotal": subTotalSon,
					    "grandTotal": grandTotalSon
		    	}
		    	var ser_data=JSON.stringify(param);
				$.ajax({
				url: HOST_URL + "/rest/order/"+id,
				type: "PUT",
	            data: ser_data,
			    contentType: "application/json",
				success: function(data){
					toastr.success('Ürün başarıyla eklendi. Yönlendiriliyorsunuz..', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 500})
					setTimeout(function(){   
			        	window.location.assign("/dashboard/orderEdit?id="+id);
			        }, 500);
				}
				})
					
					console.log(
									"\nÜrün adı : "+productName+
									"\nResim : " + imageUrl+
									"\ncategoryId : " + categoryId+
									"\nsubCategoryId : " + subCategoryId+
									"\nquantity : " + quantity+
									"\nprice : " + price+
									"\nproductTotal : " + productTotal+
									"\nunit : " + unit
								)
				}
				})
				
			})


});