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
		url: HOST_URL + "/stockman/storager/"+id,
		type: "GET",
		success:function(data) {
			$(".firstName").val(data.firstName);
			$(".lastName").val(data.lastName);
			$(".mobileNumber").val(data.mobileNumber);
			$(".email").val(data.email);


/*--------------------------Storager Update--------------------------*/
			    $('.storageEdit').click(function() {
					var firstName = $(".firstName").val();
					var lastName = $(".lastName").val();
					var mobileNumber = $(".mobileNumber").val();
					var email = $(".email").val();
					    	var param={
					    			"firstName":firstName,
					    			"lastName":lastName,
					    			"email":email,
					    			"mobileNumber":mobileNumber
					    	}
				
					    	var ser_data=JSON.stringify(param);
					        $.ajax({
					        	url: HOST_URL + "/stockman/storager/"+id,
								type: "PUT",
					            data: ser_data,
							    contentType: "application/json",
					            success: function (result) {
					                toastr.success('Depocu Güncellendi.', 'İşlem Başarılı', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 1500})
									setTimeout(function(){   
							        window.location.assign("/dashboard/storages");
							        }, 1500);
					            },
					            error: function (error) {
							        if(firstName == "" || firstName == null){
										toastr.error('Adı alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else if(lastName == "" || lastName == null){
										toastr.error('Soyadı alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else if(email == "" || email == null){
										toastr.error('Email alanı boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else if(mobileNumber == "" || mobileNumber == null){
										toastr.error('Telefon Numarası boş geçilemez', 'Hata!', {"progressBar": true,positionClass: "toast-bottom-right",timeOut: 2000})
									}else{
										
									}
					            }
					        });
			        
			    });

/*--------------------------!Storager Update--------------------------*/



		}
	});
	
		
		
});