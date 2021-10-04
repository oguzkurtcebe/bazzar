
$(document).ready(function() {
$("#pageLoader").hide();
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
	var url = HOST_URL + "/restaurant/companies?currentPage=";
	$.ajax({
		url: HOST_URL + "/restaurant/companies/",
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
		url: HOST_URL + "/restaurant/companies?currentPage="+currentPage,
		type: "GET",
		success:function(data) {
			data = data.content;
			var counter = 0;
			data.forEach(function(companyData,index){
				counter++;
								
				var name=("<tr id='"+companyData._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+companyData.companyName+"</span></td>");
		        var categoryName=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+companyData.email+"</span></td>");
		        var description=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+companyData.username+"</span></td>");
		        
		        if(companyData.status == true){
		        	statusPrint = "checked='checked'";
		        }else{
		        	statusPrint = "";
		        }
		        var status=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' id='"+companyData._id+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>");
		        
				if(companyData.status == true){
		        	statusPrint = "checked='checked'"; 
		        }else{
		        	statusPrint = "";
		        }
 				var options=("<td class='text-center'>"+"<a href='restaurantEdit?id="+companyData._id+"'><div class='btn btn-icon btn-dark btn-hover-dark btn-sm categoryEdit' id='"+companyData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-edit'></div></span></div></a>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm subCategoryDelete' id='"+companyData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
		        
				$("#printCategory").append(name+categoryName+description+status+options);

	    	});
	    	
			$("#kt_subheader_total").html("("+counter+ " Restoran)");
	    	
	    	
/*--------------------------Status Update--------------------------*/
			    $('.statusUpdate').click(function (event) {
			        var id = $(this).attr("id");
			        var statusUpdate = ($(this).is(':checked')) ? true : false;
					    	//alert(statusUpdate)
			       
					    	var param={
					    			"status": statusUpdate
									
					    	}
					    	
					    	var ser_data=JSON.stringify(param);
					    	
					        $.ajax({
					        	url: HOST_URL + "/restaurant/companyStatus/"+id,
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


/*--------------------------SubCategory Delete--------------------------*/
			$(".subCategoryDelete").click(function() {
			    var silinecekId = $(this).attr("id");
				subCategoryDelete(silinecekId);
			})

			//sweatAlert
			function subCategoryDelete(silinecekId){
				$(function() {
				
					Swal.fire({
					title: "Restoranı silmek istediğinizden emin misiniz?",
					text: "Bu işlemi onaylarsanız geri alamazsınız!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Evet, sil!",
					cancelButtonText: "Hayır, iptal et!",
					reverseButtons: true
					}).then(function(result) {
					if (result.value) {
						$.ajax({
						url: HOST_URL + "/restaurant/company/"+silinecekId,
						type: "DELETE",
					    contentType: "application/json",
						success: function(sonuc) {
						  $("#"+silinecekId).remove();
						  $("#kt_subheader_total").html("("+(counter-1)+ " Restoran)");
						}
						});
					
					    Swal.fire({
							position: "top-right",
					        title: "Restoran başarıyla silindi!",
					        icon: "success",
							showConfirmButton: false,
							timer: 1500
					    })
					} else if (result.dismiss === "cancel") {
					    Swal.fire(
					        "İptal edildi",
					        "Alt Kategori güvende :)",
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
			        var categoryName = $(".printCategory option:selected" ).text();
			        var categoryId = $(".printCategory option:selected" ).val();
			        
			    	var param={
			    			"status":true,
			    			"title":title,
			    			"description":description,
			    			"categoryName":categoryName,
			    			"categoryId":categoryId
			    	}
			    	
			    	var ser_data=JSON.stringify(param);
			    	
			        $.ajax({
			        	url: HOST_URL + "/rest/subCategory/",
						type: "POST",
			            data: ser_data,
					    contentType: "application/json",
			            success: function (result) {
			                toastr.success('Alt Kategori Eklendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
									setTimeout(function(){   
							        window.location.assign("/dashboard/subCategories");
							        }, 1500);
			            },
			            error: function () {
					        if(title == "" || title == null){
								toastr.error('Başlık alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(description == "" || description == null){
								toastr.error('Açıklama alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(categoryName == "" || categoryName == null){
								toastr.error('Kategori boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else{
								
							}
			            }
			        });
			    });

/*--------------------------!SubCategory Add--------------------------*/


});