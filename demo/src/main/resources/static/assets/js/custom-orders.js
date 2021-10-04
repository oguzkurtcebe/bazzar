
$(document).ready(function() {
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
	var url = HOST_URL + "/dashboard/orders?currentPage=";
	$.ajax({
		url: HOST_URL + "/rest/orders/",
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
		url: HOST_URL + "/rest/orders?currentPage="+currentPage,
		type: "GET",
		success:function(data) {
			var orderCount = data.totalElements;
			data = data.content;
			data.forEach(function(subCategoryData,index){
				console.log(subCategoryData)
				var grandTotal = subCategoryData.grandTotal;
				
				var orderID=("<tr id='"+subCategoryData._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+subCategoryData.orderID+"</span></td>");
		        var firstName=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+subCategoryData.user.firstName+" "+subCategoryData.user.lastName+"</span></td>");
		        if(subCategoryData.orderStatus == "CANCELLED"){
					orderStatus = '<span class="label label-lg font-weight-bold label-light-danger label-inline">İptal Edildi</span>'
				}else if(subCategoryData.orderStatus == "DELIVERED"){
					orderStatus = '<span class="label label-lg font-weight-bold label-light-success label-inline">Teslim Edildi</span>'
				}else{
					orderStatus = '<span class="label label-lg font-weight-bold label-light-success label-inline">'+subCategoryData.orderStatus+'</span>'
				}
		        //<span class="label label-lg font-weight-bold label-light-danger label-inline">Delivered</span>
		        var orderStatus=("<td class='text-center'>"+orderStatus+"</td>");
		        var grandTotal=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>₺"+Number(grandTotal.toFixed(2))+"</span></td>");
		        if(subCategoryData.paymentStatus == "SUCCESS"){
					paymentStatus = '<span class="label label-lg font-weight-bold label-light-success label-inline">Başarılı</span>'
				}else if(subCategoryData.paymentStatus == "FAILED"){
					paymentStatus = '<span class="label label-lg font-weight-bold label-light-danger label-inline">Başarısız</span>'
				}
		        var paymentStatus=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+paymentStatus+"</span></td>");
		        var ata = "";
		        if(subCategoryData.assignedToName == "" || !subCategoryData.assignedToName || subCategoryData.assignedToName == null){
					ata = "-";
				}else{
					ata = subCategoryData.assignedToName;
				}
		        ata=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+ata+"</span></td>");
		        var deliveryTime=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+subCategoryData.deliveryTime+"</span></td>");

 				var options=('<style type="text/css">.options a{ margin-left: 5px; margin-right: 5px; }</style>'+"<td class='text-center options'>"+"<a href='orderView?id="+subCategoryData._id+"'><div class='btn btn-icon btn-success btn-hover-dark btn-sm orderView' id='"+subCategoryData._id+"'><span class='svg-icon svg-icon-md svg-icon-success'><div class='fa fa-eye'></div></span></div></a>"+"<a href='orderEdit?id="+subCategoryData._id+"'><div class='btn btn-icon btn-dark btn-hover-light btn-sm categoryEdit' id='"+subCategoryData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-edit'></div></span></div></a>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm orderDelete' id='"+subCategoryData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
		        
				$("#printCategory").append(orderID+firstName+orderStatus+grandTotal+paymentStatus+ata+deliveryTime+options);

	    	});
	    	
			$("#kt_subheader_total").html("("+orderCount+ " Sipariş)");
	    	

/*--------------------------Status Update--------------------------*/
			    $('.statusUpdate').click(function (event) {
			        var id = $(this).attr("id");
			        var statusUpdate = ($(this).is(':checked')) ? true : false;
					    	//alert(statusUpdate)
			        $.ajax({
						url: HOST_URL + "/rest/subCategory/"+id,
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
					        	url: HOST_URL + "/rest/subCategory/"+id+"/",
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
		url: HOST_URL + "/rest/categories/",
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

/*--------------------------SubCategory Delete--------------------------*/
			$(".orderDelete").click(function() {
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
						url: HOST_URL + "/rest/order/"+silinecekId+"/",
						type: "DELETE",
					    contentType: "application/json",
						success: function(sonuc) {
						  $("#"+silinecekId).remove();
						  $("#kt_subheader_total").html("("+(counter-1)+ " Sipariş)");
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
			        	url: "http://localhost:8080/rest/subCategory/",
						type: "POST",
			            data: ser_data,
					    contentType: "application/json",
			            success: function (result) {
			                toastr.success('Alt Kategori Eklendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 5000})
			            },
			            error: function () {
			                alert('Hata');
			            }
			        });
			    });

/*--------------------------!SubCategory Add--------------------------*/


});