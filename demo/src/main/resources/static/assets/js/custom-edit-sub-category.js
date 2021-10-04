
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
		url: "http://localhost:8080/rest/subCategory/"+id+"/",
		type: "GET",
		success:function(data) {
			$(".subCategoryTitle").val(data.title);
	        $(".subCategoryDescription").val(data.description);
	        var selected = data.categoryId;
	        $(".printCategory").append("<option value='"+data.categoryName+"'>"+data.categoryName+"</option>");
	        
/*--------------------------Product Add Category View--------------------------*/
		$.ajax({
		url: HOST_URL + "/rest/allCategories/",
		type: "GET",
		success:function(data) {
			data = data;
			data.forEach(function(categoryData,index){
				if(selected != categoryData._id){
					var category=("<option value='"+categoryData.title+"'>"+categoryData.title+"</option>");
					$(".printCategory").append(category);
				}

	    	});
	    }
	    });

/*--------------------------!Product Add Category View--------------------------*/


/*--------------------------SubCategory Update--------------------------*/
			    $('#subCategoryUpdate').click(function() {
					var title = $(".subCategoryTitle").val();
			        var description = $(".subCategoryDescription").val();
			        var categoryName = $(".printCategory").val();
			        
					    	var param={
					    			"title":title,
					    			"description":description,
					    			"categoryName":categoryName,
					    			
									"categoryId": data.categoryId,
									"subCategoryCount": data.subCategoryCount,
									"status": data.status,
									"imageId": data.imageId,
									"imageUrl": data.imageUrl,
									
									"filePath": data.filePath,
									"userId": data.userId,
									"createdAt": data.createdAt,
									
									"_v": data._v,
									"dealAvailable": data.dealAvailable	
					    	}
				
					    	var ser_data=JSON.stringify(param);
					        $.ajax({
					        	url: "http://localhost:8080/rest/subCategory/"+id+"/",
								type: "PUT",
					            data: ser_data,
							    contentType: "application/json",
					            success: function (result) {
					                toastr.success('Alt Kategori Güncellendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
									setTimeout(function(){   
							        window.location.assign("/dashboard/subCategories");
							        }, 1500);
					            },
					            error: function (error) {
							        if(title == "" || title == null){
										toastr.error('Başlık alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else if(description == "" || description == null){
										toastr.error('Açıklama alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else if(categoryName == "" || categoryName == null){
										toastr.error('Kategori boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else{
										
									}
					            }
					        });
			        
			    });

/*--------------------------!SubCategory Update--------------------------*/



		}
	});
});