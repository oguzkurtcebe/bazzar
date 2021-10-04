	
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
	var url = HOST_URL + "/dashboard/users?currentPage=";
	$.ajax({
		url: HOST_URL + "/rest/users",
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
		
/*--------------------------User Search--------------------------*/
$('#searchUser').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
   		document.getElementById("enterSearch").click();
    }
});

			$(".searchUser").click(function(){
				var searchValue = $("#searchUser").val();
				var counter = 0;
				
				if($.isNumeric(searchValue) == true){
					/* trueNumber */
					$("#pageLoader").show();
					$("#printPagination").hide();
					$("#printUser").html("");
					$.ajax({
						url: HOST_URL + "/rest/user/mobile?mn="+searchValue,
						type: "GET",
						success: function(data){
							$("#pageLoader").hide();
							var name=("<tr id='"+data._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' style='cursor: pointer;'>"+data.firstName+" "+data.lastName+"</span></td>");
							        var email=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+data.email+"</span></td>");
							        if(data.mobileNumberVerified == true){
							        	mobileNumberVerifiedPrint = "checked='checked'";
							        }else{
							        	mobileNumberVerifiedPrint = "";
							        }
							        var sms=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class='mobileNumberVerifiedUpdate' mobileNumber='"+data.mobileNumber+"' type='checkbox' "+mobileNumberVerifiedPrint+" name='select'/><span></span></label></span></div>"+"</td>");
							        
							        var phone=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+data.mobileNumber+"</span></td>");
									
									var createdat=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+new Date(data.createdAt).toLocaleDateString()+"</span></td>");
								        
										if(data.status == true){
								        	statusPrint = "checked='checked'"; 
								        }else{
								        	statusPrint = "";
								        }
									 
							        var status=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' mobileNumber='"+data.mobileNumber+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>");
							        var options=("<td class='text-center'>"+"<div class='btn btn-icon btn-success btn-hover-dark btn-sm userView' id='"+data._id+"' data-toggle='modal' data-target='.bd-example-modal-lg'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-eye'></div></span></div>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm userDelete' id='"+data._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
							        
									$("#printUser").append(name+email+sms+phone+createdat+status+options);

							statusUpdate();
							mobileNumberVerified();
							userDelete();
							userView();
						}
					})
					
					/* !trueNumber */
				}else{
					/* !falseNumber */
					var firstNameOrLastName = $("#searchUser").val().split(' ');
					var firstName = firstNameOrLastName[0];
					
					var lastName = "" ;
					if(firstNameOrLastName[1]){
						lastName = firstNameOrLastName[1];
					}
					
					$("#pageLoader").show();
					var url = "";
					if(searchValue == "" || searchValue == null){
						url = HOST_URL + "/rest/users?currentPage="+currentPage+"&fn=&ln=";
						$("#printPagination").show();
					}else{
						$("#printPagination").hide();
						$("#printUser").html("");
						url = HOST_URL + "/rest/user/search?fn="+firstName+"&ln="+lastName;
					}
					$.ajax({
						url: url,
						type: "GET",
						success: function(data){
							$("#pageLoader").hide();
							if(url == HOST_URL + "/rest/users?currentPage="+currentPage+"&fn=&ln="){
								var userCount = data.totalElements;
								data = data.content;
							}
							data.forEach(function(data,index){
									counter++;
									var name=("<tr id='"+data._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' style='cursor: pointer;'>"+data.firstName+" "+data.lastName+"</span></td>");
							        var email=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+data.email+"</span></td>");
							        if(data.mobileNumberVerified == true){
							        	mobileNumberVerifiedPrint = "checked='checked'";
							        }else{
							        	mobileNumberVerifiedPrint = "";
							        }
							        var sms=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class='mobileNumberVerifiedUpdate' mobileNumber='"+data.mobileNumber+"' type='checkbox' "+mobileNumberVerifiedPrint+" name='select'/><span></span></label></span></div>"+"</td>");
							        
							        var phone=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+data.mobileNumber+"</span></td>");
									
									var createdat=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+new Date(data.createdAt).toLocaleDateString()+"</span></td>");
								        
										if(data.status == true){
								        	statusPrint = "checked='checked'"; 
								        }else{
								        	statusPrint = "";
								        }
									 
							        var status=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' mobileNumber='"+data.mobileNumber+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>");
							        var options=("<td class='text-center'>"+"<div class='btn btn-icon btn-success btn-hover-dark btn-sm userView' id='"+data._id+"' data-toggle='modal' data-target='.bd-example-modal-lg'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-eye'></div></span></div>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm userDelete' id='"+data._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
							        
									$("#printUser").append(name+email+sms+phone+createdat+status+options);
							})
							if(url == HOST_URL + "/rest/users?currentPage="+currentPage+"&fn=&ln="){
								data = data.content;
							}else{
								userCount = counter;
							}
							$("#kt_subheader_total").html("("+userCount+ " Kullanıcı)");
							statusUpdate();
							mobileNumberVerified();
							userDelete();
							userView();
						}
					})
					/* !falseNumber */
				}
				
				
			});
			
/*--------------------------User Search--------------------------*/
	$.ajax({
		url: HOST_URL + "/rest/users?currentPage="+currentPage+"&fn=&ln=",
		type: "GET",
		success:function(data) {
			var userCount = data.totalElements;
			data = data.content;
			data.forEach(function(userData,index){
		        var name=("<tr id='"+userData._id+"'><td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg' style='cursor: pointer;'>"+userData.firstName+" "+userData.lastName+"</span></td>");
		        var email=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+userData.email+"</span></td>");
		        if(userData.mobileNumberVerified == true){
		        	mobileNumberVerifiedPrint = "checked='checked'";
		        }else{
		        	mobileNumberVerifiedPrint = "";
		        }
		        var sms=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class='mobileNumberVerifiedUpdate' mobileNumber='"+userData.mobileNumber+"' type='checkbox' "+mobileNumberVerifiedPrint+" name='select'/><span></span></label></span></div>"+"</td>");
		        
		        var phone=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+userData.mobileNumber+"</span></td>");
				
				var createdat=("<td class='text-center'><span class='text-dark-75 font-weight-bolder d-block font-size-lg'>"+new Date(userData.createdAt).toLocaleDateString()+"</span></td>");
			        
					if(userData.status == true){
			        	statusPrint = "checked='checked'"; 
			        }else{
			        	statusPrint = "";
			        }
				 
		        var status=("<td class='text-center'>"+"<div class=''><div class='col-3'><span class='switch switch-outline switch-icon switch-success'><label><input class=' statusUpdate' mobileNumber='"+userData.mobileNumber+"' type='checkbox' "+statusPrint+" name='select'/><span></span></label></span></div>"+"</td>");
		        var options=("<td class='text-center'>"+"<div class='btn btn-icon btn-success btn-hover-dark btn-sm userView' id='"+userData._id+"' data-toggle='modal' data-target='.bd-example-modal-lg'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-eye'></div></span></div>"+"<div class='btn btn-icon btn-danger btn-hover-dark btn-sm userDelete' id='"+userData._id+"'><span class='svg-icon svg-icon-md svg-icon-primary'><div class='fa fa-trash'></div></span></div>"+"</td></tr>");
		        
				$("#printUser").append(name+email+sms+phone+createdat+status+options);

	    	})
	    	
			$("#kt_subheader_total").html("("+userCount+ " Kullanıcı)");
			statusUpdate();
			mobileNumberVerified();
			userDelete();
			userView();

		
		
/*--------------------------User View--------------------------*/
		/*$("#printApiClick").click( function () {
			$.ajax({
				type: "remote",
				source: "https://gnsofttr.com/user.json",
				success:function(data) {
					console.log(data);
					$("#printApi").html(data.firstName);
				}
			});
		});*/
/*--------------------------!User View--------------------------*/

		}
	});
	
	
	
	
/*--------------------------Status Update--------------------------*/
function statusUpdate(){
			    $('.statusUpdate').click(function (event) {
			        var mobileNumber = $(this).attr("mobileNumber");
					var statusUpdate = ($(this).is(':checked')) ? true : false;
			        var param={
			    		"status": statusUpdate
			    	}
			    	var ser_data=JSON.stringify(param);
			        $.ajax({
			        	url: HOST_URL + "/rest/user/status/"+mobileNumber,
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
}
/*--------------------------!Status Update--------------------------*/


/*--------------------------MobileNumberVerified Update--------------------------*/
function mobileNumberVerified(){
			    $('.mobileNumberVerifiedUpdate').click(function (event) {
			        var mobileNumber = $(this).attr("mobileNumber");
			        var mobileNumberVerifiedUpdate = ($(this).is(':checked')) ? true : false;
			        var param={
						"mobileNumberVerified":mobileNumberVerifiedUpdate
			    	}
			    	
			    	var ser_data=JSON.stringify(param);
			        $.ajax({
			        	url: HOST_URL + "/rest/user/mobileNumberVerified/"+mobileNumber,
						type: "PUT",
			            data: ser_data,
					    contentType: "application/json",
			            success: function (result) {
			                toastr.success('SMS Doğrulaması Güncellendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 5000})
			            },
			            error: function () {
			                alert('Hata');
			            }
			        });
			        
			    });
}
/*--------------------------!MobileNumberVerified Update--------------------------*/

/*--------------------------User Delete--------------------------*/
function userDelete(){
			$(".userDelete").click(function() {
			    var silinecekId = $(this).attr("id");
				userDelete(silinecekId);
			})

			//sweatAlert
			function userDelete(silinecekId){
				$(function() {
				
					Swal.fire({
					title: "Kullanıcıyı silmek istediğinizden emin misiniz?",
					text: "Bu işlemi onaylarsanız geri alamazsınız!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Evet, sil!",
					cancelButtonText: "Hayır, iptal et!",
					reverseButtons: true
					}).then(function(result) {
					if (result.value) {
						$.ajax({
						url: HOST_URL + "/rest/user/"+silinecekId,
						type: "DELETE",
					    contentType: "application/json",
						success: function(sonuc) {
						  $("#"+silinecekId).remove();
						  $("#kt_subheader_total").html("("+(counter-1)+ " Kullanıcı)");
						}
						});
					
					    Swal.fire({
							position: "top-right",
					        title: "Kullanıcı başarıyla silindi!",
					        icon: "success",
							showConfirmButton: false,
							timer: 1500
					    })
					} else if (result.dismiss === "cancel") {
					    Swal.fire(
					        "İptal edildi",
					        "Kullanıcı güvende :)",
					        "error"
					    )
					}
					});
				
				
				});
			}
			 //sweatAlert
}
/*--------------------------!User Delete--------------------------*/



/*--------------------------User View--------------------------*/
function userView(){
		$(".userView").click( function () {
			var id = $(this).attr("id");
			$.ajax({
				url: HOST_URL + "/rest/user/"+id,
				type: "GET",
				success:function(data) {
					$("#modal_userName").html(data.firstName+" "+data.lastName+'<i class="flaticon2-correct text-success icon-md ml-2"></i>');
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
					$("#mobileNumber").html(data.mobileNumber);

				}
			});
		});
}
/*--------------------------!User View--------------------------*/


});