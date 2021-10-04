package com.gnsoft.bazzar.dashboard.companies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gnsoft.bazzar.dashboard.controller.DashboardController;

@Controller
@RequestMapping("/company")
public class CompanyController {

	@Autowired
	private DashboardController dashboardController;

	/*------------ Company ------------*/
	@RequestMapping(value = "/invokeCourier", method = RequestMethod.GET)
	public String invokeCourier(Model model) {
		dashboardController.printUsername(model);
		return "company/invokeCourier.html";
	}
	@GetMapping
	public String index(Model model) {
		return "company/index.html";
	}

	@RequestMapping(value = "/products", method = RequestMethod.GET)
	public String companyProducts(Model model) {
		dashboardController.printUsername(model);
		return "company/products";
	}

	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public String companyCategories(Model model) {
		dashboardController.printUsername(model);
		return "company/categories";
	}

	@RequestMapping(value = "/categoryAdd", method = RequestMethod.GET)
	public String companyCategoryAdd(Model model) {
		dashboardController.printUsername(model);
		return "company/category-add";
	}

	@RequestMapping(value = "/categoryEdit", method = RequestMethod.GET)
	public String companyCategoryEdit(Model model) {
		dashboardController.printUsername(model);
		return "company/category-edit";
	}

	@RequestMapping(value = "/productAdd", method = RequestMethod.GET)
	public String companyProductAdd(Model model) {
		dashboardController.printUsername(model);
		return "company/product-add";
	}

	@RequestMapping(value = "/productEdit", method = RequestMethod.GET)
	public String companyProductEdit(Model model) {
		dashboardController.printUsername(model);
		return "company/product-edit";
	}

	@RequestMapping(value = "/orders", method = RequestMethod.GET)
	public String companyOrders(Model model) {
		dashboardController.printUsername(model);
		return "company/orders";
	}

	@RequestMapping(value = "/orderEdit", method = RequestMethod.GET)
	public String companyOrderEdit(Model model) {
		dashboardController.printUsername(model);
		return "company/order-edit";
	}
	/*------------ !Company ------------*/

}
