package br.com.easy.health.config;

import java.util.Locale;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@Configuration
@ComponentScan
public class WebConfig extends WebMvcConfigurerAdapter {

	private static final String BRAZIL = "BR";
	private static final String PORTUGUESE = "pt";
	private static final String LANGUAGE_PARAMETER = "lang";

	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		final LocaleChangeInterceptor interceptor = new LocaleChangeInterceptor();
		interceptor.setParamName(LANGUAGE_PARAMETER);
		return interceptor;
	}

	@Bean
	public LocaleResolver localeResolver() {
		final SessionLocaleResolver resolver = new SessionLocaleResolver();
		resolver.setDefaultLocale(new Locale(PORTUGUESE, BRAZIL));
		return resolver;
	}

	@Override
	public void addInterceptors(final InterceptorRegistry registry) {
		registry.addInterceptor(localeChangeInterceptor());
	}

	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resource/static/**").addResourceLocations("/resources/static/**");
	}

	@Override
	public void addViewControllers(final ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
	}

	@Override
	public void addCorsMappings(final CorsRegistry registry) {
		registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE");
	}

}
