package com.gnsoft.bazzar.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.gnsoft.bazzar.dashboard.users.UserService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	private AuthenticationSuccessHandler authenticationSuccessHandler;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private UserService userService;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {

		return new BCryptPasswordEncoder();
	}

	@Autowired
	public SecurityConfiguration(AuthenticationSuccessHandler authenticationSuccessHandler) {
		this.authenticationSuccessHandler = authenticationSuccessHandler;
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
		auth.setUserDetailsService(userService);
		auth.setPasswordEncoder(passwordEncoder());
		return auth;
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		auth.userDetailsService(userService).passwordEncoder(passwordEncoder);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}

	// authorization
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.sessionManagement(cust -> cust.sessionCreationPolicy(SessionCreationPolicy.NEVER))
				.csrf(cust -> cust.disable());
		http.httpBasic().and().authorizeRequests().antMatchers("/forgotPassword/**","/resetPassword/**","/smsSender/**").permitAll()
				.antMatchers("/dashboard/**/**", "/rest/**/**", "/restaurant/**/**")
				.access("hasAnyAuthority('SUPER_ADMIN','BAZZAR_ADMIN')").antMatchers("/company/**/**")
				.access("hasAnyAuthority('RT_ADMIN', 'SUPER_ADMIN')").antMatchers("/storage/**/**")
				.access("hasAnyAuthority('STORAGER', 'SUPER_ADMIN')").antMatchers("/delivery/**/**")
				.access("hasAnyAuthority('RT_ADMIN', 'SUPER_ADMIN','BAZZAR_ADMIN')").antMatchers("/stockman/**/**")
				.access("hasAnyAuthority('STORAGER', 'SUPER_ADMIN','BAZZAR_ADMIN')").antMatchers("/courier/**/**")
				.access("hasAnyAuthority('DELIVERY_BOY', 'SUPER_ADMIN','BAZZAR_ADMIN')").anyRequest().authenticated()
				.and().formLogin().loginPage("/login").successHandler(authenticationSuccessHandler).permitAll().and()
				.logout().invalidateHttpSession(true).clearAuthentication(true)
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutUrl("/logout").permitAll();

		http.rememberMe().rememberMeParameter("remember-me").alwaysRemember(true)
				.userDetailsService(userDetailsService);

	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		super.configure(web);
		web.httpFirewall(allowUrlEncodedSlashHttpFirewall());
		// web.ignoring().antMatchers("/**");
		web.ignoring().antMatchers("/css/**");
		web.ignoring().antMatchers("/js/**");
		web.ignoring().antMatchers("/images/**");
		web.ignoring().antMatchers("/assets/**");
		web.ignoring().antMatchers("/static/**");
		web.ignoring().antMatchers("/plugins/**");
		web.ignoring().antMatchers("/security/**");
		web.ignoring().antMatchers("/register/**");
		web.ignoring().antMatchers("/login2/**");
		web.ignoring().antMatchers("/login3/**");
		web.ignoring().antMatchers("/forgotPassword/**");
		web.ignoring().antMatchers("/resetPassword/**");
		web.ignoring().antMatchers("/smsSender/**");
		

	}

	@Bean
	public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
		StrictHttpFirewall firewall = new StrictHttpFirewall();
		firewall.setAllowSemicolon(true);
		return firewall;
	}

}
