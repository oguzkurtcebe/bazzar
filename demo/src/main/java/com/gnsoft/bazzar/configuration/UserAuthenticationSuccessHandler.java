package com.gnsoft.bazzar.configuration;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			Authentication authentication) throws IOException, ServletException {

		Collection<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());

		if (roles.contains("SUPER_ADMIN") || roles.contains("BAZZAR_ADMIN")) {
			httpServletResponse.sendRedirect("/dashboard");
		} else if (roles.contains("RT_ADMIN")) {
			httpServletResponse.sendRedirect("/company");
		} else if (roles.contains("STORAGER")) {
			httpServletResponse.sendRedirect("/storage/storageControl");
		}
		else {
			httpServletResponse.sendRedirect("/home");
		}
	}
}
