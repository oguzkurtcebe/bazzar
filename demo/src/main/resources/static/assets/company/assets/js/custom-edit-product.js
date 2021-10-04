
$(document).ready(function() {
$("#pageLoader").remove();
	
	var $_GET = {};
	
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	    function decode(s) {
	        return decodeURIComponent(s.split("+").join(" "));
	    }
	
	    $_GET[decode(arguments[1])] = decode(arguments[2]);
	});
	var id = $_GET["id"];
	       
	$.ajax({
		url: "http://localhost:8080/delivery/product/"+id,
		type: "GET",
		success:function(data) {
			//alert(data.variant[0]._id);
			$(".productTitle").val(data.title);
	        $(".productKeywords").val(data.keywords);
	        $(".productDescription").val(data.description);
	        $(".imagesProduct").append("<img src='"+data.imageUrl+"' width='75'>");
	        $(".productSku").val(data.sku);
	        $(".productPrice").val(data.price);
	        var selected = data.categoryId;
	        $(".productCategory").append("<option value='"+data.categoryId+"'>"+data.categoryName+"</option>");
	        
	        
/*--------------------------Product Add Category View--------------------------*/
		$.ajax({
		url: HOST_URL + "/delivery/categories",
		type: "GET",
		success:function(data) {
			data = data;
			data.forEach(function(categoryData,index){
				if(selected != categoryData._id){
					var category=("<option value='"+categoryData._id+"'>"+categoryData.title+"</option>");
					$(".productCategory").append(category);
				}
	    	});
	    }
	    });

/*--------------------------!Product Add Category View--------------------------*/
			

/*--------------------------Product Update--------------------------*/

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
				
			    $('#productUpdate').click(function() {
			        var categoryName = $(".productCategory option:selected" ).text();
			        var categoryId = $(".productCategory option:selected" ).val();
			        
					var title = $(".productTitle").val();
			        var keywords = $(".productKeywords").text();
			        var description = $(".productDescription").val();
			        var sku = $(".productSku").val();
			        
			        var unit = $(".productUnit").val();
			        var offerPercent = $(".productOfferPercent").val();
			        
			        
			    	var price = $(".productPrice").val();
					 
						if(imageUrlBase64 == "" || imageUrlBase64 == null){
							imageUrlBase64 = data.imageUrl;
						}else{
							imageUrlBase64 = imageUrlBase64;
						}
			         
					    	var param={
					    			"categoryId": categoryId,
					    			"categoryName": categoryName,
					    			"title":title,
					    			"keywords":data.keywords,
					    			"description":description,
					    			"sku":sku,
			    			
									"enable":data.enable,					    			
									"averageRating":data.averageRating,
									"totalRating":data.totalRating,
									"noOfUsersRated":data.noOfUsersRated,
									"imageUrl": imageUrlBase64,
									"type":data.type,
									
									"subCtegoryId":data.subCtegoryId,
									"filePath":data.filePath,
									"subCategoryName":data.subCategoryName,
									"createdDate":data.createdDate,
									"_v":data._v,
									"dealId":data.dealId,
									
									"dealPercent":data.dealPercent,
									"dealType":data.dealType,
									"dealAvailable":data.dealAvailable,
									
					    			"status":data.status,
					    			"unit":data.unit,
					    			"price": price
					    	}
							
					    	var ser_data=JSON.stringify(param);
					    	
					        $.ajax({
					        	url: "http://localhost:8080/delivery/product/"+id,
								type: "PUT",
					            data: ser_data,
							    contentType: "application/json",
					            success: function (result) {
					                toastr.success('Ürün Güncellendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
									setTimeout(function(){   
							        window.location.assign("/company/products");
							        //3 saniye sonra yönlenecek
							        }, 1500);
					            },
					            error: function () {			        
							        if(title == "" || title == null){
										toastr.error('Başlık alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
									}else if(description == "" || description == null){
										toastr.error('Açıklama boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
									}else if(categoryId == "" || categoryId == null){
										toastr.error('Kategori boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
									}else if(price == "" || price == null){
										toastr.error('Fiyat boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
									}else if(imageUrlBase64 == "" || imageUrlBase64 == null){
										toastr.error('Resim boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
									}else{
										toastr.error('Bİr hata oluştu', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
									}
					            }
					        });
			        
			    });

/*--------------------------!Product Update--------------------------*/



		}
	});
	
});