package com.gnsoft.bazzar.dashboard.controller;

import java.util.Arrays;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gnsoft.bazzar.courier.Courier;
import com.gnsoft.bazzar.courier.CourierRepository;
import com.gnsoft.bazzar.dashboard.companies.Company;
import com.gnsoft.bazzar.dashboard.companies.CompanyRepository;
import com.gnsoft.bazzar.dashboard.storeage.Storeage;
import com.gnsoft.bazzar.dashboard.storeage.StoreageRepository;
import com.gnsoft.bazzar.dashboard.users.Role;
import com.gnsoft.bazzar.dashboard.users.User;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {

	@Autowired
	private StoreageRepository storeageRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private CourierRepository courierRepository;

	public String printUsername(Model model) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Collection<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());

		if (roles.contains("STORAGER")) {
			Storeage storeage = (Storeage) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String userName = storeage.getFirstName() + " " + storeage.getLastName();
			model.addAttribute("firstName", userName);
		}

		else if (roles.contains("RT_ADMIN")) {
			Company company = (Company) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String userName = company.getCompanyName();
			model.addAttribute("firstName", userName);
		} else {
			User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String userName = user.getFirstName() + " " + user.getLastName();
			model.addAttribute("firstName", userName);
		}

		Collection<?> statusType = authentication.getAuthorities();
		String commaDelimitedString = StringUtils.collectionToCommaDelimitedString(statusType);

		model.addAttribute("statuss", commaDelimitedString);
		return "commaDelimitedString";
	}

	@RequestMapping(method = RequestMethod.GET)
	public String index(Model model, HttpServletRequest req) {
		printUsername(model);
		model.addAttribute("user", req.getSession().getAttribute("user"));
		System.out.println(req.getRemoteAddr());
		model.addAttribute("serverTime", "/");
		return "index";
	}

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public String users(Model model) {
		printUsername(model);
		return "users";
	}

	@RequestMapping(value = "/products", method = RequestMethod.GET)
	public String products(Model model) {
		printUsername(model);
		return "products";
	}

	@RequestMapping(value = "/productAdd", method = RequestMethod.GET)
	public String productAdd(Model model) {
		printUsername(model);
		return "product-add.html";
	}

	@RequestMapping(value = "/productEdit", method = RequestMethod.GET)
	public String productEdit(Model model) {
		printUsername(model);
		return "product-edit.html";
	}

	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public String categories(Model model) {
		printUsername(model);
		return "categories.html";
	}

	@RequestMapping(value = "/categoryAdd", method = RequestMethod.GET)
	public String categoryAdd(Model model) {
		printUsername(model);
		return "category-add.html";
	}

	@RequestMapping(value = "/categoryEdit", method = RequestMethod.GET)
	public String categoryEdit(Model model) {
		printUsername(model);
		return "category-edit.html";
	}

	@RequestMapping(value = "/subCategories", method = RequestMethod.GET)
	public String subCategory(Model model) {
		printUsername(model);
		return "sub-categories.html";
	}

	@RequestMapping(value = "/newSubCategories", method = RequestMethod.GET)
	public String newSubCategories(Model model) {
		printUsername(model);
		return "newsubcategories.html";// Default template datatable
	}

	@RequestMapping(value = "/subCategoryEdit", method = RequestMethod.GET)
	public String subCategoryEdit(Model model) {
		printUsername(model);
		return "sub-category-edit.html";
	}

	@RequestMapping(value = "/subCategoryAdd", method = RequestMethod.GET)
	public String subCategoryAdd(Model model) {
		printUsername(model);
		return "sub-category-add.html";
	}

	@RequestMapping(value = "/newOrders", method = RequestMethod.GET)
	public String newOrders(Model model) {
		printUsername(model);
		return "neworders.html";
	}

	@RequestMapping(value = "/orders", method = RequestMethod.GET)
	public String orders(Model model) {
		printUsername(model);
		return "orders.html";
	}

	@RequestMapping(value = "/orderView", method = RequestMethod.GET)
	public String orderView(Model model) {
		printUsername(model);
		return "order-view.html";
	}

	@RequestMapping(value = "/orderEdit", method = RequestMethod.GET)
	public String orderEdit(Model model) {
		printUsername(model);
		return "order-edit.html";
	}

	/*------------ !Storage ------------*/

	@RequestMapping(value = "/storages", method = RequestMethod.GET)
	public String storages(Model model) {
		printUsername(model);
		return "storages";
	}

	@ModelAttribute("storager")
	public Storeage storagerRegistration() { // yeni bir depocu kullanıcısı oluşturma
		return new Storeage();
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@GetMapping("storageAdd")
	public String showStoragerRegistrationForm(Model model) { // depocu kaydı formu
		printUsername(model);
		return "storage-add";
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@RequestMapping(value = "/storagerEdit", method = RequestMethod.GET)
	public String storageEdit(Model model) {
		printUsername(model);
		return "storager-edit";
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PostMapping("storageAdd")
	public String registrationStoragerAccount(@ModelAttribute("storager") Storeage storeage) {

		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Storeage storage2 = new Storeage(storeage.getFirstName(), storeage.getLastName(), storeage.getEmail(),
				passwordEncoder.encode(storeage.getPassword()), storeage.getMobileNumber(),
				Arrays.asList(new Role("STORAGER")));

		storage2.setStatus(true);
		storage2.setStoreageId(user.get_id());
		storage2.setRole("STORAGER");
		storeageRepository.save(storage2);

		return "redirect:/dashboard/storages?success";
	}

	/* *********Restorant Admin Kaydı Formu ********* */
	/* ********************************************* */

	@RequestMapping(value = "/restaurants", method = RequestMethod.GET)
	public String restaurants(Model model) {
		printUsername(model);
		return "restaurants";
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@RequestMapping(value = "/restaurantAdd", method = RequestMethod.GET)
	public String restaurantAdd(Model model) {
		printUsername(model);
		return "restaurant-add";
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@RequestMapping(value = "/restaurantEdit", method = RequestMethod.GET)
	public String restaurantEdit(Model model) {
		printUsername(model);
		return "restaurant-edit";
	}

	@ModelAttribute("company")
	public Company companyRegistration() { // yeni bir company kullanıcı oluşturma
		return new Company();
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@GetMapping("restaurant-add")
	public String showRt_AdminRegistrationForm(Model model) { // admin kaydı formu
		printUsername(model);
		return "restaurant-add";
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PostMapping("restaurant-add")
	public String registrationRt_AdminAccount(@ModelAttribute("company") Company company) {

		Company company2 = new Company(company.getCompanyName(), company.getMobileNumber(),
				passwordEncoder.encode(company.getPassword()), company.getEmail(), company.getAddress(),
				Arrays.asList(new Role("RT_ADMIN")));

		company2.setStatus(true);
		company2.setRole("RT_ADMIN");
		companyRepository.save(company2);

		return "redirect:/dashboard/restaurants?success";
	}

	/* ********************************************* */

	/* *********Kurye Kaydı Formu ********* */
	/* ********************************************* */

	@RequestMapping(value = "/couriers", method = RequestMethod.GET)
	public String couriers(Model model) {
		printUsername(model);
		return "couriers";
	}

	@RequestMapping(value = "/courierEdit", method = RequestMethod.GET)
	public String courierEdit(Model model) {
		printUsername(model);
		return "courier-edit";
	}

	@ModelAttribute("courier")
	public Courier courierRegistration() { // yeni bir kurye kullanıcı oluşturma
		return new Courier();
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@GetMapping("addCourier")
	public String showCourierRegistrationForm() { // kurye kaydı formu

		return "courier-add";
	}

	@PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
	@PostMapping("addCourier")
	public String registrationCourierAccount(@ModelAttribute("courier") Courier courier) {

		Courier courier2 = new Courier(courier.getFirstName(), courier.getLastName(), courier.getEmail(),
				passwordEncoder.encode(courier.getPassword()), courier.getMobileNumber(),
				Arrays.asList(new Role("DELIVERY_BOY")));

		courier2.setStatus(true);
		courier2.setRole("DELIVERY_BOY");
		courierRepository.save(courier2);

		return "redirect:/dashboard/couriers?success";
	}
	/* ********************************************* */
	
	


	@RequestMapping(value = "/shopping", method = RequestMethod.GET)
	public String shopping(Model model) {
		printUsername(model);
		return "shopping";
	}
}
