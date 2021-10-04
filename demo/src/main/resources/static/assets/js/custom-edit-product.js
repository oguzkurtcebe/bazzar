
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
		url: HOST_URL + "/rest/product/"+id+"/",
		type: "GET",
		success:function(data) {
			$(".productTitle").val(data.title);
	        //$(".productKeywords").html('<input id="kt_tagify_1" class="form-control tagify" value="'+data.keywords+'" /><script src="assets/js/pages/crud/forms/widgets/tagify.js"></script>');
	        $(".productKeywords").val(data.keywords);
	        $(".productDescription").val(data.description);
	        $(".productSku").val(data.sku);
	        
	        var selected = data.categoryId;
	        $(".productCategory").html("<option value='"+data.categoryId+"'>"+data.categoryName+"</option>");
	        $(".productSubCategory").append("<option value='"+data.subCategoryId+"'>"+data.subCategoryName+"</option>");
	        
			var imageUrl = "";
			
			if(data.imageUrl == "" || data.imageUrl == null || !data.imageUrl){
				if(data.productImages != "" && data.productImages != null){
					imageUrl = data.productImages[0].imageUrl;
				}else{
					imageUrl = "https://market.bursakultur.com/images/resim-yok.png";
				}
			}else{
				imageUrl = data.imageUrl;
			}
	        $(".imagesProduct").append("<img src='"+imageUrl+"' width='75'>");
	        
	        
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
		 
	  	$.ajax({
		url: HOST_URL + "/rest/subcategory/"+data.categoryId,
		type: "GET",
		success:function(data) {
			data = data;
			data.forEach(function(subCategoryData,index){
				var subCategory=("<option value='"+subCategoryData._id+"'>"+subCategoryData.title+"</option>");	 
				$(".productSubCategory").append(subCategory);

	    	});
	    }
	    });
	    
			    $('.categorySelect').on('change', function() {
					$(".productSubCategory option").remove();
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


	        var variant = data.variant;
	        if(variant){
		        variant.forEach(function(variant) {
			
					var deneme = '<div data-repeater-list="" class="col-9"><div data-repeater-item="" class="form-group row align-items-center"><div class="col-md-2"><label>Kapasite:</label><input type="email" class="form-control productUnit" value="'+variant.unit+'" /><div class="d-md-none mb-2"></div></div><div class="col-md-2"><label>Fiyat:</label><input type="text" class="form-control productPrice" value="'+variant.price+'" /><div class="d-md-none mb-2"></div></div><div class="col-md-2"><label>Teklif:</label><input type="email" class="form-control productOfferPercent" value="'+variant.offerPercent+'" /><div class="d-md-none mb-2"></div></div><div class="col-md-2"><label>Stok:</label><input type="text" class="form-control productProductStock" value="'+variant.productStock+'" /><div class="d-md-none mb-2"></div></div><div class="col-md-1"><label style="color:white">-</label><a href="javascript:;" data-repeater-delete="" class="btn btn-sm font-weight-bolder btn-light-danger"><i class="la la-trash-o"></i></a></div></div></div>';
			        $(".productVariant").append(deneme);
					//alert(variant.unit);
				});
			}
			
			

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
					var title = $(".productTitle").val();
			        var keywords = $(".productKeywords").val();
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
			        
						if(imageUrlBase64 == "" || imageUrlBase64 == null){
							imageUrlBase64 = data.imageUrl;
						}else{
							imageUrlBase64 = imageUrlBase64;
						}
			         
					    	var param={
					    			"title":title,
					    			"keywords":keywords,
					    			"description":description,
					    			"sku":sku,
					    			"categoryId": categoryId,
					    			"categoryName": categoryName,
					    			"subCategoryId": subCategoryId,
					    			"subCategoryName": subCategoryName,
					    			"variant": variant,
			    			
									"imageUrl": imageUrlBase64
									
					    	}
				
					    	var ser_data=JSON.stringify(param);
					    	console.log(ser_data);
					    	
					        $.ajax({
					        	url: HOST_URL + "/rest/product/"+id+"/",
								type: "PUT",
					            data: ser_data,
							    contentType: "application/json",
					            success: function (result) {
					                toastr.success('Ürün Güncellendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
									setTimeout(function(){   
							        window.location.assign("/dashboard/products");
							        }, 1500);
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

/*--------------------------!Product Update--------------------------*/



		}
	});
	
});