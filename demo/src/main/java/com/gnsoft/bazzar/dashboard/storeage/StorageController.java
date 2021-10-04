package com.gnsoft.bazzar.dashboard.storeage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gnsoft.bazzar.dashboard.controller.DashboardController;

@Controller
@RequestMapping("/storage")
public class StorageController {
	@Autowired
	private DashboardController dashboardController;

	/*------------ Storage ------------*/

	@RequestMapping(value = "/storageProducts", method = RequestMethod.GET)
	public String storageProducts(Model model) {
		dashboardController.printUsername(model);
		return "storage/products";
	}

	@RequestMapping(value = "/storageControl", method = RequestMethod.GET)
	public String storageControl(Model model) {
		dashboardController.printUsername(model);
		return "storage/control";
	}

	@RequestMapping(value = "/storageControl2", method = RequestMethod.GET)
	public String storageControl2(Model model) {
		dashboardController.printUsername(model);
		return "storage/control2";
	}

}
