
$(document).ready(function() {
$("#pageLoader").remove();
	
/* Pagination */	    
			    
	var $_GET = {};
	
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	    function decode(s) {
	        return decodeURIComponent(s.split("+").join(" "));
	    }
	
	    $_GET[decode(arguments[1])] = decode(arguments[2]);
	});
	
	var currentPage = "";
	if($_GET["currentPage"]){
		currentPage = $_GET["currentPage"];
	}else{
		currentPage = 0;
	}
	var url = HOST_URL + "/dashboard/products?currentPage=";
	
	$.ajax({
		url: HOST_URL + "/rest/products/",
		type: "GET",
		success:function(data) {			    
			var pageSize = data.totalPages;
			pagination(currentPage, pageSize, url);
		}
	});
	
	
	function pagination(currentPage, pageSize, url){
    	var forlimit = 3;
    	
    	if(pageSize < 2){
        	null;
    	}else{
			if(currentPage > 4){
	            var prev  = parseInt(currentPage) - 1;
	            var yaz1 = '<a href="'+url+'0" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1"><i class="ki ki-bold-double-arrow-back icon-xs"></i></a>';
	            var yaz2 = '<a href="'+url+(parseInt(currentPage)-1)+'" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1"><i class="ki ki-bold-arrow-back icon-xs"></i></a>';
	        	$("#printPagination").append(yaz1+yaz2);
	        }

	        for(var i = (parseInt(currentPage) - parseInt(forlimit)); parseInt(i) < parseInt(currentPage) + (parseInt(forlimit) + 1); i++){
	            if(parseInt(i) > 0 && parseInt(i) <= parseInt(pageSize)){
	                if(i == parseInt(currentPage)+1){
						var yaz3 = '<a href="#" class="btn btn-icon btn-sm border-0 btn-hover-primary active mr-2 my-1">'+i+'</a>';
						$("#printPagination").append(yaz3);
	                }else{
						var yaz4 = '<a href="'+url+(i-1)+'" class="btn btn-icon btn-sm border-0 btn-hover-primary mr-2 my-1">'+i+'</a>';
						$("#printPagination").append(yaz4);
	                }
	            }
	        }

	        if(currentPage <= pageSize - 4){
	            var next  = parseInt(currentPage) + 1;
	            var yaz5 = '<a href="'+url+next+'" class="btn btn-icon btn-sm btn-light-primary mr-2 my-1"><i class="ki ki-bold-arrow-next icon-xs"></i></a>';
	            var yaz6 ='<a href="'+url+(parseInt(pageSize)-1)+'" class="btn btn-icon btn-sm btn-light mr-2 my-1"><i class="ki ki-bold-double-arrow-next icon-xs"></i></a>'
	            $("#printPagination").append(yaz5+yaz6);
	        }
	        
	        
		}
	}
	
	
/* Pagination */



			    $('.categorySelect').on('change', function() {
					$(".productSubCategory option").remove();
					$(".productSubCategory").append("<option value=''></option>");
					$("#printProduct").html("");
					
				  	var value = $(this).val(); 
				  	
				    filter(HOST_URL + "/rest/findProductByCategory?categoryId="+value);
				});
				
			    $('.subCategorySelect').on('change', function() {
					$("#printProduct").html("");
					
				  	var value = $(this).val(); 
				  	
				    filter(HOST_URL + "/rest/findProductBySubCategory?subCategoryId="+value);
				});
				
				
				function filter(url){
				  	$.ajax({
					url: url,
					type: "GET",
					success:function(data) {
						data = data;
						var counter = 0;
						data.forEach(function(productData,index){
							counter++;
							var imageUrl = "";
							
							if(productData.imageUrl == "" || productData.imageUrl == null){
								if(productData.productImages != "" && productData.productImages != null){
									imageUrl = productData.productImages[0].imageUrl;
								}else{
									imageUrl = "https://market.bursakultur.com/images/resim-yok.png";
								}
							}else{
								imageUrl = productData.imageUrl;
							}
							var image=("<tr id='"+productData._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+"<img width='75' src='"+imageUrl+"'>"+"</span></td>");
					        var name=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+productData.title+"</span></td>");
					        var price=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+productData.price+"</span></td>");
					        var category=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+productData.categoryName+"</span></td>");
					        var subCategory=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+productData.subCategoryName+"</span></td>");
		        			var dealOffer=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+"-"+"</span></td>");
		        
					        if(productData.status == true){
					        	statusPrint = "checked='checked'";
					        }else{
					        	statusPrint = "";
					        }
					        var status=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' id='"+productData._id+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>");
					        
							if(productData.status == true){
					        	statusPrint = "checked='checked'"; 
					        }else{
					        	statusPrint = "";
					        }
			 				var options=("<td class='text-center'>"+"<a href='productEdit?id="+productData._id+"'><div class='btn btn-icon btn-dark btn-hover-dark btn-sm productEdit' id='"+productData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-edit'></div></span></div></a>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm productDelete' id='"+productData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
					        
							$("#printProduct").append(image+name+category+subCategory+dealOffer+status+options);
				    	});
				    	
						if(url == HOST_URL + "/rest/users?currentPage="+currentPage+"&fn=&ln="){
							data = data.content;
						}else{
							productCount = counter;
						}
						$("#kt_subheader_total").html("("+productCount+ " ??r??n)");
						statusUpdate();
						productDelete();
				    }
				    });
				}
				
		
/*--------------------------User Search--------------------------*/

$('#searchProduct').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
   		document.getElementById("enterSearch").click();
    }
});
			$(".searchProduct").click(function(){
				var titleSearch = $("#searchProduct").val();

				var counter = 0;
				
				$("#pageLoader").show();
				var url = "";
				if(titleSearch == "" || titleSearch == null){
					url = HOST_URL + "/rest/products/?currentPage="+currentPage;
					$("#printProduct").html("");
					$("#printPagination").show();
				}else{
					$("#printPagination").hide();
					$("#printProduct").html("");
					url = HOST_URL + "/rest/findProduct?title="+titleSearch;
				}
				$.ajax({
					url: url,
					type: "GET",
					success: function(data){
						$("#pageLoader").hide();
						if(url == HOST_URL + "/rest/products/?currentPage="+currentPage){
							var productCount = data.totalElements;
							data = data.content;
						}
			
						data.forEach(function(productData,index){
							counter++;
							var imageUrl = "";
							
							if(productData.imageUrl == "" || productData.imageUrl == null){
								if(productData.productImages != "" && productData.productImages != null){
									imageUrl = productData.productImages[0].imageUrl;
								}else{
									imageUrl = "https://market.bursakultur.com/images/resim-yok.png";
								}
							}else{
								imageUrl = productData.imageUrl;
							}
							var image=("<tr id='"+productData._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+"<img width='75' src='"+imageUrl+"'>"+"</span></td>");
					        var name=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+productData.title+"</span></td>");
					        var price=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+productData.price+"</span></td>");
					        var category=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+productData.categoryName+"</span></td>");
					        var subCategory=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+productData.subCategoryName+"</span></td>");
		        			var dealOffer=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+"-"+"</span></td>");
		        
					        if(productData.status == true){
					        	statusPrint = "checked='checked'";
					        }else{
					        	statusPrint = "";
					        }
					        var status=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' id='"+productData._id+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>");
					        
							if(productData.status == true){
					        	statusPrint = "checked='checked'"; 
					        }else{
					        	statusPrint = "";
					        }
			 				var options=("<td class='text-center'>"+"<a href='productEdit?id="+productData._id+"'><div class='btn btn-icon btn-dark btn-hover-dark btn-sm productEdit' id='"+productData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-edit'></div></span></div></a>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm productDelete' id='"+productData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
					        
							$("#printProduct").append(image+name+category+subCategory+dealOffer+status+options);
			
				    	});
				    	
						if(url == HOST_URL + "/rest/users?currentPage="+currentPage+"&fn=&ln="){
							data = data.content;
						}else{
							productCount = counter;
						}
						$("#kt_subheader_total").html("("+productCount+ " ??r??n)");
						statusUpdate();
						productDelete();
					}
				})
				
			});
			
/*--------------------------User Search--------------------------*/

	$.ajax({
		url: HOST_URL + "/rest/products/?currentPage="+currentPage,
		type: "GET",
		success:function(data) {
			var productCount = data.totalElements;
			data = data.content;
			//console.log(data.content[0].productImages[0].imageUrl);
			//data = data.content;
			
			data.forEach(function(productData,index){
				var imageUrl = "";
				
				if(productData.imageUrl == "" || productData.imageUrl == null){
					if(productData.productImages != "" && productData.productImages != null){
						imageUrl = productData.productImages[0].imageUrl;
					}else{
						imageUrl = "https://market.bursakultur.com/images/resim-yok.png";
					}
				}else{
					console.log("b");
					imageUrl = productData.imageUrl;
				}
				var image=("<tr id='"+productData._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+"<img width='75' src='"+imageUrl+"'>"+"</span></td>");
		        var name=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+productData.title+"</span></td>");
		        var category=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+productData.categoryName+"</span></td>");
		        var subCategory=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+productData.subCategoryName+"</span></td>");
		        var dealOffer=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+"-"+"</span></td>");
		        
		        if(productData.status == true){
		        	statusPrint = "checked='checked'";
		        }else{
		        	statusPrint = "";
		        }
		        var status=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' id='"+productData._id+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>");
		        
				if(productData.status == true){
		        	statusPrint = "checked='checked'"; 
		        }else{
		        	statusPrint = "";
		        }
 				var options=("<td class='text-center'>"+"<a href='productEdit?id="+productData._id+"'><div class='btn btn-icon btn-dark btn-hover-dark btn-sm productEdit' id='"+productData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-edit'></div></span></div></a>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm productDelete' id='"+productData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
		        
				$("#printProduct").append(image+name+category+subCategory+dealOffer+status+options);

	    	});
	    	
			$("#kt_subheader_total").html("("+productCount+ " ??r??n)");
			statusUpdate();
			productDelete();
	    	
		}
	});
	    	
/*--------------------------Status Update--------------------------*/
function statusUpdate(){
			    $('.statusUpdate').click(function (event) {
			        var id = $(this).attr("id");
					var statusUpdate = ($(this).is(':checked')) ? true : false;
			        var param={
			    		"status": statusUpdate
			    	}
			    	var ser_data=JSON.stringify(param);
			        $.ajax({
			        	url: HOST_URL + "/rest/product/status/"+id+"/",
						type: "PUT",
			            data: ser_data,
					    contentType: "application/json",
			            success: function (result) {
			                toastr.success('Durum G??ncellendi.', '????lem Ba??ar??l??', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 5000})
			            },
			            error: function () {
			                alert('Hata');
			            }
			        });
			        
			    });
}
/*--------------------------!Status Update--------------------------*/



/*--------------------------Product Delete--------------------------*/
function productDelete(){
			$(".productDelete").click(function() {
			    var silinecekId = $(this).attr("id");
				productDelete(silinecekId);
			})

			//sweatAlert
			function productDelete(silinecekId){
				$(function() {
				
					Swal.fire({
					title: "??r??n?? silmek istedi??inizden emin misiniz?",
					text: "Bu i??lemi onaylarsan??z geri alamazs??n??z!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Evet, sil!",
					cancelButtonText: "Hay??r, iptal et!",
					reverseButtons: true
					}).then(function(result) {
					if (result.value) {
						$.ajax({
						url: HOST_URL + "/rest/product/"+silinecekId+"/",
						type: "DELETE",
					    contentType: "application/json",
						success: function(sonuc) {
						  $("#"+silinecekId).remove();
						  $("#kt_subheader_total").html("(Toplam "+(counter-1)+ " ??r??n)");
						}
						});
					
					    Swal.fire({
							position: "top-right",
					        title: "??r??n ba??ar??yla silindi!",
					        icon: "success",
							showConfirmButton: false,
							timer: 1500
					    })
					} else if (result.dismiss === "cancel") {
					    Swal.fire(
					        "??ptal edildi",
					        "??r??n g??vende :)",
					        "error"
					    )
					}
					});
				
				
				});
			}
			 //sweatAlert
}
/*--------------------------!Product Delete--------------------------*/
	
	
/*--------------------------Product Add--------------------------*/

			    
				let imageUrlBase64 = "";
				$(".productImage").change(function(event){
					var input = $(event.currentTarget);
					var file = input[0].files[0];
					var reader = new FileReader();
					reader.onload = function(e){
						imageUrlBase64 = e.target.result;
					};
					reader.readAsDataURL(file);
				});
				
			    $('#productSave').click(function (event) {
			        var title = $(".productTitle").val();
			        var keywords = $(".productKeywords").text();
			        var description = $(".productDescription").val();
			        var sku = $(".productSku").val();
			        var categoryName = $(".categorySelect option:selected" ).text();
			        var categoryId = $(".categorySelect option:selected" ).val();
			        var subCategoryName = $(".subCategorySelect option:selected" ).text();
			        var subCategoryId = $(".subCategorySelect option:selected" ).val();
			        
			        var offerPercent = $(".productOfferPercent").val();
			        var isOfferAvailable;
				        if(offerPercent > 0){
							isOfferAvailable = true;
						}else{
							isOfferAvailable = false;
						}
					variant = [];
					variant.push({
							    	"unit": $(".productUnit").val(),
							        "price": $(".productPrice").val(),
							        "offerPercent": offerPercent,
							        "isOfferAvailable": isOfferAvailable,
							        "productStock": $(".productProductStock").val()
								 });
			        
			    	var param={
			    			"enable":true,
			    			"variant":variant,
			    			"title":title,
			    			"keywords":keywords,
			    			"description":description,
			    			"sku":sku,
			    			"categoryName":categoryName,
			    			"categoryId": categoryId,
			    			"subCategoryName":subCategoryName,
			    			"subCategoryId": subCategoryId,
			    			"imageUrl": imageUrlBase64
			    	}
			    	
			    	var ser_data=JSON.stringify(param);
			    	
			        $.ajax({
			        	url: HOST_URL + "/rest/product/",
						type: "POST",
			            data: ser_data,
					    contentType: "application/json",
			            success: function (result) {
			                toastr.success('??r??n Eklendi.', '????lem Ba??ar??l??', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
									setTimeout(function(){   
							        window.location.assign("/dashboard/products");
							        }, 1500);
			            },
			            error: function () {			        
					        if(title == "" || title == null){
								toastr.error('Ba??l??k alan?? bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(keywords == "" || keywords == null){
								toastr.error('Anahtar kelime alan?? bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(description == "" || description == null){
								toastr.error('A????klama bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(sku == "" || sku == null){
								toastr.error('Stok tutma birimi bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(categoryId == "" || categoryId == null){
								toastr.error('Kategori bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(subCategoryId == "" || subCategoryId == null){
								toastr.error('Alt kategori bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(unit == "" || unit == null){
								toastr.error('Kapasite bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(price == "" || price == null){
								toastr.error('Fiyat bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(offerPercent == "" || offerPercent == null){
								toastr.error('Teklif bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(productStock == "" || productStock == null){
								toastr.error('Stok bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else{
								toastr.error('B??r hata olu??tu', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}
			            }
			        });
			    });

/*--------------------------!Product Add--------------------------*/




/*--------------------------Product Add Category View--------------------------*/
		$.ajax({
		url: HOST_URL + "/rest/allCategories/",
		type: "GET",
		success:function(data) {
			data = data;
			data.forEach(function(categoryData,index){
				var category=("<option value='"+categoryData._id+"'>"+categoryData.title+"</option>");
				$(".productCategory").append(category);

	    	});
	    }
	    });

/*--------------------------!Product Add Category View--------------------------*/

			    $('.categorySelect').on('change', function() {
					$(".productSubCategory option").remove();
					$(".productSubCategory").append("<option value=''></option>");
				  /*var test = $(this).val();
				  
					test.forEach(function(asd,index){
						var sss=asd[1];
						alert(sss);
					});

				  alert(test);
				  return false;*/
				  var value = $(this).val(); 
				  	$.ajax({
					url: HOST_URL + "/rest/subcategory/"+value,
					type: "GET",
					success:function(data) {
						data = data;
						data.forEach(function(subCategoryData,index){
							var subCategory=("<option value='"+subCategoryData._id+"'>"+subCategoryData.title+"</option>");	 
							$(".productSubCategory").append(subCategory);
			
				    	});
				    }
				    });
				    
				});




});