
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
	var url = HOST_URL + "/products?currentPage=";
	
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
	    	
			$("#kt_subheader_total").html("("+productCount+ " Ürün)");
	    	
	    	
/*--------------------------Status Update--------------------------*/
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
			                toastr.success('Durum Güncellendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 5000})
			            },
			            error: function () {
			                alert('Hata');
			            }
			        });
			        
			    });

/*--------------------------!Status Update--------------------------*/



/*--------------------------Product Delete--------------------------*/
			$(".productDelete").click(function() {
			    var silinecekId = $(this).attr("id");
				productDelete(silinecekId);
			})

			//sweatAlert
			function productDelete(silinecekId){
				$(function() {
				
					Swal.fire({
					title: "Ürünü silmek istediğinizden emin misiniz?",
					text: "Bu işlemi onaylarsanız geri alamazsınız!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Evet, sil!",
					cancelButtonText: "Hayır, iptal et!",
					reverseButtons: true
					}).then(function(result) {
					if (result.value) {
						$.ajax({
						url: HOST_URL + "/rest/product/"+silinecekId+"/",
						type: "DELETE",
					    contentType: "application/json",
						success: function(sonuc) {
						  $("#"+silinecekId).remove();
						  $("#kt_subheader_total").html("(Toplam "+(counter-1)+ " ürün)");
						}
						});
					
					    Swal.fire({
							position: "top-right",
					        title: "Ürün başarıyla silindi!",
					        icon: "success",
							showConfirmButton: false,
							timer: 1500
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
			 //sweatAlert

/*--------------------------!Product Delete--------------------------*/
		}
	});
	
	
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
			        
			        var unit = $(".productUnit").val();
			        var price = $(".productPrice").val();
			        var offerPercent = $(".productOfferPercent").val();
			        var isOfferAvailable;
				        if(offerPercent > 0){
							isOfferAvailable = true;
						}else{
							isOfferAvailable = false;
						}
			        var productStock = $(".productProductStock").val();
			        
			        
			        //var imageUrl = $(".foto").context.URL;
		    		/*alert("merhaba");
		    		console.log($(".foto"));
		    		alert($(".foto").context.URL);
					console.log($(".foto").context.URL);*/
			    	var param={
			    			"enable":true,
			    			"title":title,
			    			"keywords":keywords,
			    			"description":description,
			    			"sku":sku,
			    			"categoryName":categoryName,
			    			"categoryId": categoryId,
			    			"imageUrl": imageUrlBase64
			    	}
	    			  /*
	    			"variant":[{
		    			"unit":unit,
		    			"price":price,
		    			"isOfferAvailable":isOfferAvailable,
		    			"offerPercent":offerPercent,
		    			"productStock":productStock
					}]*/
			        console.log(param);
			    	var ser_data=JSON.stringify(param);
			    	
			        $.ajax({
			        	url: HOST_URL + "/rest/product/",
						type: "POST",
			            data: ser_data,
					    contentType: "application/json",
			            success: function (result) {
			                toastr.success('Ürün Eklendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 5000})
			            },
			            error: function () {			        
					        if(title == "" || title == null){
								toastr.error('Başlık alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(keywords == "" || keywords == null){
								toastr.error('Anahtar kelime alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(description == "" || description == null){
								toastr.error('Açıklama boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(sku == "" || sku == null){
								toastr.error('Stok tutma birimi boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(categoryId == "" || categoryId == null){
								toastr.error('Kategori boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(unit == "" || unit == null){
								toastr.error('Kapasite boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(price == "" || price == null){
								toastr.error('Fiyat boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(offerPercent == "" || offerPercent == null){
								toastr.error('Teklif boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(productStock == "" || productStock == null){
								toastr.error('Stok boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else{
								toastr.error('Bİr hata oluştu', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}
			            }
			        });
			    });

/*--------------------------!Product Add--------------------------*/




/*--------------------------Product Add Category View--------------------------*/
		$.ajax({
		url: HOST_URL + "/rest/categories/",
		type: "GET",
		success:function(data) {
			data = data;
			data.forEach(function(categoryData,index){
				var category=("<option value='"+categoryData._id+"'>"+categoryData.title+"</option>");
				//value içinde array sorunu giderilsin value="['Name A', '2413']"
				$(".productCategory").append(category);

	    	});
	    }
	    });

/*--------------------------!Product Add Category View--------------------------*/

			    $('.categorySelect').on('change', function() {
					$(".productSubCategory option").remove();
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
							var subCategory=("<option>"+subCategoryData.title+"</option>");	 
							$(".productSubCategory").append(subCategory);
			
				    	});
				    }
				    });
				    
				});




});