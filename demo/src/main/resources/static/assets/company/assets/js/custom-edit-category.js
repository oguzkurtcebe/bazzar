
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
		url: "http://localhost:8080/delivery/category/"+id,
		type: "GET",
		success:function(data) {
			//alert(data.variant[0]._id);
			$(".categoryTitle").val(data.title);
	        $(".categoryDescription").val(data.description);
	        $(".imagesCategory").append("<img src='"+data.imageUrl+"' width='75'>");
	        

/*--------------------------Category Update--------------------------*/
				let imageUrlBase64 = "";
				$(".categoryImage").change(function(event){
					var input = $(event.currentTarget);
					var file = input[0].files[0];
					var reader = new FileReader();
					reader.onload = function(e){
						imageUrlBase64 = e.target.result;
					};
					reader.readAsDataURL(file);
				});
				
			    $('#categoryUpdate').click(function() {
					var title = $(".categoryTitle").val();
			        var description = $(".categoryDescription").val();
			        
							if(imageUrlBase64 == "" || imageUrlBase64 == null){
								imageUrlBase64 = data.imageUrl;
							}else{
								imageUrlBase64 = imageUrlBase64;
							}
			        
					    	var param={
					    			"title":title,
					    			"description":description,
				
				
									"subCategoryCount": data.subCategoryCount,
									"status": data.status,
									"imageId": data.imageId,
									"imageUrl": imageUrlBase64,
									
									"filePath": data.filePath,
									"userId": data.userId,
									"createdAt": data.createdAt,
									
									"_v": data._v,
									"dealAvailable": data.dealAvailable	
					    	}
				
					    	var ser_data=JSON.stringify(param);
					        $.ajax({
					        	url: "http://localhost:8080/delivery/category/"+id,
								type: "PUT",
					            data: ser_data,
							    contentType: "application/json",
					            success: function (result) {
					                toastr.success('Kategori G??ncellendi.', '????lem Ba??ar??l??', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
									setTimeout(function(){   
							        window.location.assign("/company/categories");
							        //3 saniye sonra y??nlenecek
							        }, 1500);
					            },
					            error: function () {
							        if(title == "" || title == null){
										toastr.error('Ba??l??k alan?? bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
									}else if(description == "" || description == null){
										toastr.error('A????klama alan?? bo?? ge??ilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
									}else{
										
									}
					            }
					        });
			        
			    });

/*--------------------------!Category Update--------------------------*/



		}
	});
});