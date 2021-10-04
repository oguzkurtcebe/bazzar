<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <!-- Bootstrap -->
    <link href="https://truvaasoft.com/documents/vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<br>
	<form id="hesaplaForm" action="#" method="get">
		
		<label>
			Sayı 1 : <input class="form-control" type="text" id="sayi1" name="sayi2" />
		</label>
		
		<label>
			Sayı 2 : <input class="form-control" type="text" id="sayi2" name="sayi2" />
		</label>
		
		<button class="btn btn-success">Hesapla</button>
	
	</form>
	 <b> <% out.println("Yasin"); %> </b>
	
	
    <!-- jQuery -->
    <script src="https://truvaasoft.com/documents/vendors/jquery/dist/jquery.min.js"></script>
    <!-- Bootstrap -->
    <script src="https://truvaasoft.com/documents/vendors/bootstrap/dist/js/bootstrap.min.js"></script>
</body>
</html>