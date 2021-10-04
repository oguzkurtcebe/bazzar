
$(document).ready(function() {
$("#pageLoader").remove();

	$.ajax({
		url: HOST_URL + "/delivery/orders",
		type: "GET",
		success:function(data) {
			data = data.content;
			var orderCount = 0;
			data.forEach(function(subCategoryData,index){
			orderCount++;
				
				var grandTotal = subCategoryData.grandTotal;
				
				var orderID=("<tr id='"+subCategoryData._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+subCategoryData.orderId+"</span></td>");
		        var firstName=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+subCategoryData.user[0].firstName+" "+subCategoryData.user[0].lastName+"</span></td>");
		        if(subCategoryData.orderStatus == "CANCELLED"){
					orderStatus = '<span class="label label-lg font-weight-bold label-light-danger label-inline">İptal Edildi</span>'
				}else if(subCategoryData.orderStatus == "DELIVERED"){
					orderStatus = '<span class="label label-lg font-weight-bold label-light-success label-inline">Teslim Edildi</span>'
				}else{
					orderStatus = '<span class="label label-lg font-weight-bold label-light-success label-inline">'+subCategoryData.orderStatus+'</span>'
				}
		        //<span class="label label-lg font-weight-bold label-light-danger label-inline">Delivered</span>
		        var orderStatus=("<td class='text-center'>"+orderStatus+"</td>");
		        var assignedToName=("<td class='text-center'>"+subCategoryData.assignedToName+"</td>");
		        var grandTotal=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>₺"+Number(grandTotal.toFixed(2))+"</span></td>");
		        var deliveryTime=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+subCategoryData.deliveryTime+"</span></td>");
				
 				var options=("<td class='text-center'>"+"<div class='btn btn-icon btn-success btn-hover-dark btn-sm orderView' id='"+subCategoryData._id+"' data-orderId='"+subCategoryData.orderId+"' data-toggle='modal' data-target='.bd-example-modal-lg'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-eye'></div></span></div>"+"<a href='orderEdit?id="+subCategoryData.orderId+"'><div class='btn btn-icon btn-dark btn-hover-light btn-sm categoryEdit' id='"+subCategoryData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-edit'></div></span></div></a>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm subCategoryDelete' id='"+subCategoryData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
		        
				$("#printCategory").append(orderID+firstName+orderStatus+assignedToName+grandTotal+deliveryTime+options);

	    	});
	    	
			$("#kt_subheader_total").html("("+orderCount+ " Sipariş)");
	    	

/*--------------------------Status Update--------------------------*/
			    $('.statusUpdate').click(function (event) {
			        var id = $(this).attr("id");
			        var statusUpdate = ($(this).is(':checked')) ? true : false;
					    	//alert(statusUpdate)
			        $.ajax({
						url: HOST_URL + "/delivery/subCategory/"+id,
						type: "GET",
						success:function(data) {
							
					    	var param={
					    			"title": data.title,
					    			"description": data.description,
									"subCategoryCount": data.subCategoryCount,
"categoryName": data.categoryName,
"categoryId": data.categoryId,

									"createdAt": data.createdAt,
									"_v": data._v,
					    			"status": statusUpdate
									
					    	}
					    	
					    	var ser_data=JSON.stringify(param);
					    	
					        $.ajax({
					        	url: HOST_URL + "/delivery/subCategory/"+id,
								type: "PUT",
					            data: ser_data,
							    contentType: "application/json",
					            success: function (result) {
					                toastr.success('Durum Güncellendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 5000})
					            },
					            error: function () {
					                alert('Hata');
					            }
					        });
			        
			        
			        
						}
					});
			        
			    });

/*--------------------------!Status Update--------------------------*/


/*--------------------------SubCategory Add Category View--------------------------*/
		$.ajax({
		url: HOST_URL + "/delivery/categories",
		type: "GET",
		success:function(data) {
			data = data;
			data.forEach(function(categoryData,index){
				var category=("<option value='"+categoryData.title+"'>"+categoryData.title+"</option>");
				$(".printCategory").append(category);

	    	});
	    }
	    });

/*--------------------------!SubCategory Add Category View--------------------------*/





/*--------------------------User View--------------------------*/
		$(".orderView").click( function () {
			var id = $(this).attr("data-orderId");
			$(".shoppingCart").html(null);
			$(".totalPriceClass").html(null);
			
			var test =  '<tr class="totalPriceClass">'+
							'<td colspan="1"></td>'+
							'<td class="font-weight-bolder font-size-h4 text-right">Toplam</td>'+
							'<td class="font-weight-bolder font-size-h4 text-right">₺<span class="totalPricePrint">0</span></td>'+
						'</tr>';
			$(".shoppingCart").html(test);
			
			$.ajax({
				url: HOST_URL + "/delivery/order/"+id,
				type: "GET",
				success:function(data) {
					
					$("#modal_userName").html(data.user[0].firstName+" "+data.user[0].lastName+'<i class="flaticon2-correct text-success icon-md ml-2"></i>');
					$("#modal_email").html(data.email);
					$("#modal_role").html(data.role);
					if(data.imageUrl != null){
						$('#modal_userImage').attr("src",""+data.imageUrl+"");
					}else{
						$('#modal_userImage').attr("src","../assets/media/users/default.jpg");
					}
					$("#modal_walletAmount").html(parseFloat(data.walletAmount).toFixed(2)+"TL");
					$("#modal_orderPurchased").html(data.orderPurchased);
					$("#createdAt").html(new Date(data.createdAt).toLocaleDateString());
					$("#mobileNumber").html(data.user[0].mobileNumber);
					$("#address").html(data.address[0].flatNo+' ('+data.address[0].address+')');
					
					$(".totalPricePrint").html(data.grandTotal);
					
			        var cart = data.cart;
			        if(cart){
				        cart.forEach(function(cart) {
		    				var productInfo = '<tr class="dataid" id="'+cart._id+'" data-img="'+cart.imageUrl+'" data-price="'+cart.productPrice+'" data-title="'+cart.productTitle+'" data-categoryId="'+cart.categoryId+'">'+
												'<td class="d-flex align-items-center font-weight-bolder">'+
													'<div class="symbol symbol-60 flex-shrink-0 mr-4 bg-light">'+
														'<div class="symbol-label" style="background-image: url('+cart.imageUrl+')"></div>'+
													'</div>'+
													'<a href="#" class="text-dark text-hover-primary">'+cart.productTitle+'('+cart.productPrice+'TL)</a>'+
												'</td>'+
												'<td class="text-center align-middle">'+
													'<span class="mr-2 font-weight-bolder">'+cart.quanity+'</span>'+
												'</td>'+
												
													
												'<td class="text-right align-middle font-weight-bolder font-size-h5">₺<span>'+cart.productTotal+'</span></td>'+
											'</tr>';
		    				
							$(".shoppingCart").append(productInfo);
					        
						});
					}
					
					
									
									

				}
			});
		});
/*--------------------------!User View--------------------------*/




/*--------------------------SubCategory Delete--------------------------*/
			$(".subCategoryDelete").click(function() {
			    
				var silinecekId = $(this).attr("id");
				subCategoryDelete(silinecekId);
			})

			//sweatAlert
			function subCategoryDelete(silinecekId){
				$(function() {
				
					Swal.fire({
					title: "Bu siparişi silmek istediğinizden emin misiniz?",
					text: "Bu işlemi onaylarsanız geri alamazsınız!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Evet, sil!",
					cancelButtonText: "Hayır, iptal et!",
					reverseButtons: true
					}).then(function(result) {
					if (result.value) {
						$.ajax({
						url: HOST_URL + "/delivery/orders/"+silinecekId,
						type: "DELETE",
					    contentType: "application/json",
						success: function(sonuc) {
						  $("#"+silinecekId).remove();
						  $("#kt_subheader_total").html("("+(counter-1)+ " Kategori)");
						}
						});
					
					    Swal.fire({
							position: "top-right",
					        title: "Sipariş başarıyla silindi!",
					        icon: "success",
							showConfirmButton: false,
							timer: 1500
					    })
					} else if (result.dismiss === "cancel") {
					    Swal.fire(
					        "İptal edildi",
					        "Sipariş güvende :)",
					        "error"
					    )
					}
					});
				
				
				});
			}
			 //sweatAlert

/*--------------------------!SubCategory Delete--------------------------*/
		}
	});
	
	
	
/*--------------------------SubCategory Add--------------------------*/

			    
			    $('#subCategorySave').click(function (event) {
				
			        var title = $(".subCategoryTitle").val();
			        var description = $(".subCategoryDescription").val();
			        var categoryName = $(".printCategory").val();
			        
			    	var param={
			    			"status":true,
			    			"title":title,
			    			"description":description,
			    			"categoryName":categoryName
			    	}
			    	
			        console.log(param);
			    	var ser_data=JSON.stringify(param);
			    	
			        $.ajax({
			        	url: HOST_URL + "/delivery/subCategory",
						type: "POST",
			            data: ser_data,
					    contentType: "application/json",
			            success: function (result) {
			                toastr.success('Alt Kategori Eklendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
							setTimeout(function(){   
					        window.location.assign("/invokeCourier");
					        //3 saniye sonra yönlenecek
					        }, 1500);
			            },
			            error: function () {
			                alert('Hata');
			            }
			        });
			    });

/*--------------------------!SubCategory Add--------------------------*/


});