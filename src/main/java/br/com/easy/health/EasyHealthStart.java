package br.com.easy.health;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
@EnableAutoConfiguration
public class EasyHealthStart {

	public static void main(final String[] args) {
		SpringApplication.run(EasyHealthStart.class, args);
	}

}
