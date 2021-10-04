
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
	var url = HOST_URL + "/categories?currentPage=";
	$.ajax({
		url: HOST_URL + "/delivery/categories",
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
		url: HOST_URL + "/delivery/categories?currentPage="+currentPage,
		type: "GET",
		success:function(data) {
			data = data.content;
			var counter = 0;
			data.forEach(function(categoryData,index){
				counter++;
				var imageUrl = "";
				if(categoryData.imageUrl != "" && categoryData.imageUrl != null){
					imageUrl = categoryData.imageUrl;
				}else{
					imageUrl = "https://market.bursakultur.com/images/resim-yok.png";
				}
				
				var image=("<tr id='"+categoryData._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+"<img width='75' src='"+imageUrl+"'>"+"</span></td>");
		        var name=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' data-toggle='modal' data-target='.bd-example-modal-lg' style='cursor: pointer;'>"+categoryData.title+"</span></td>");
		        var description=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+categoryData.description+"</span></td>");
		        
		        if(categoryData.status == true){
		        	statusPrint = "checked='checked'";
		        }else{
		        	statusPrint = "";
		        }
		        var status=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' id='"+categoryData._id+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>");
		        
				if(categoryData.status == true){
		        	statusPrint = "checked='checked'"; 
		        }else{
		        	statusPrint = "";
		        }
 				var options=("<td class='text-center'>"+"<a href='categoryEdit?id="+categoryData._id+"'><div class='btn btn-icon btn-dark btn-hover-dark btn-sm categoryEdit' id='"+categoryData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-edit'></div></span></div></a>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm categoryDelete' id='"+categoryData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
		        
				$("#printCategory").append(image+name+description+status+options);

	    	});
	    	
			$("#kt_subheader_total").html("("+counter+ " Ürün)");
	    	
	    	
/*--------------------------Status Update--------------------------*/
			    $('.statusUpdate').click(function (event) {
			        var id = $(this).attr("id");
			        var statusUpdate = ($(this).is(':checked')) ? true : false;
			        
			    	var param={
			    			"status": statusUpdate
			    	}
			    	
			    	var ser_data=JSON.stringify(param);
			    	
			        $.ajax({
			        	url: HOST_URL + "/delivery/category/updateStatus"+id,
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




/*--------------------------Category Delete--------------------------*/
			$(".categoryDelete").click(function() {
			    var silinecekId = $(this).attr("id");
				categoryDelete(silinecekId);
			})

			//sweatAlert
			function categoryDelete(silinecekId){
				$(function() {
				
					Swal.fire({
					title: "Kategoriyi silmek istediğinizden emin misiniz?",
					text: "Bu işlemi onaylarsanız geri alamazsınız!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Evet, sil!",
					cancelButtonText: "Hayır, iptal et!",
					reverseButtons: true
					}).then(function(result) {
					if (result.value) {
						$.ajax({
						url: HOST_URL + "/delivery/category/"+silinecekId,
						type: "DELETE",
					    contentType: "application/json",
						success: function(sonuc) {
						  $("#"+silinecekId).remove();
						  $("#kt_subheader_total").html("("+(counter-1)+ " Kategori)");
						}
						});
					
					    Swal.fire({
							position: "top-right",
					        title: "Kategori başarıyla silindi!",
					        icon: "success",
							showConfirmButton: false,
							timer: 1500
					    })
					} else if (result.dismiss === "cancel") {
					    Swal.fire(
					        "İptal edildi",
					        "Kategori güvende :)",
					        "error"
					    )
					}
					});
				
				
				});
			}
			 //sweatAlert

/*--------------------------!Category Delete--------------------------*/
		}
	});
	
	
	
/*--------------------------Category Add--------------------------*/

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
			    
			    $('#categorySave').click(function (event) {
			        var title = $(".categoryTitle").val();
			        var description = $(".categoryDescription").val();

			    	var param={
			    			"status":true,
			    			"title":title,
			    			"imageUrl": imageUrlBase64,
        					"imageId": "123",//validasyon silinecek
			    			"description":description,
        					"userId": "123"//validasyon silinecek
			    	}
			    	
			        console.log(param);
			    	var ser_data=JSON.stringify(param);
			    	
			        $.ajax({
			        	url: HOST_URL + "/delivery/category",
						type: "POST",
			            data: ser_data,
					    contentType: "application/json",
			            success: function (result) {
			                toastr.success('Kategori Eklendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
							setTimeout(function(){   
					        window.location.assign("/company/categories");
					        //3 saniye sonra yönlenecek
					        }, 1500);
			            },
			            error: function () {
					        if(title == "" || title == null){
								toastr.error('Başlık alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(description == "" || description == null){
								toastr.error('Açıklama alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else if(imageUrlBase64 == "" || imageUrlBase64 == null){
								toastr.error('Resim alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2500})
							}else{
								alert("Bir hata oluştu!");
							}
			            }
			        });
			    });

/*--------------------------!Category Add--------------------------*/


});