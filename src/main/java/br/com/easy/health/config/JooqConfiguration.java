package br.com.easy.health.config;

import javax.sql.DataSource;

import org.jooq.ConnectionProvider;
import org.jooq.DSLContext;
import org.jooq.ExecuteListenerProvider;
import org.jooq.SQLDialect;
import org.jooq.TransactionProvider;
import org.jooq.impl.DataSourceConnectionProvider;
import org.jooq.impl.DefaultConfiguration;
import org.jooq.impl.DefaultDSLContext;
import org.jooq.impl.DefaultExecuteListenerProvider;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;

import br.com.easy.health.config.exception.ExceptionTranslator;

@Configuration
@EnableAutoConfiguration(exclude = { DataSourceAutoConfiguration.class })
public class JooqConfiguration {

	@Bean
	@Primary
	@ConfigurationProperties(prefix = "datasource.easy.health")
	public DataSource dataSourceDev() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	public DataSourceTransactionManager transactionManager(final DataSource dataSource) {
		return new DataSourceTransactionManager(dataSource);
	}

	@Bean
	public DSLContext dsl(final org.jooq.Configuration config) {
		return new DefaultDSLContext(config);
	}

	@Bean
	public ConnectionProvider connectionProvider(final DataSource dataSource) {
		return new DataSourceConnectionProvider(new TransactionAwareDataSourceProxy(dataSource));
	}

	@Bean
	public TransactionProvider transactionProvider() {
		return new EasyHealthTransactionProvider();
	}

	@Bean
	public ExceptionTranslator exceptionTranslator() {
		return new ExceptionTranslator();
	}

	@Bean
	public ExecuteListenerProvider executeListenerProvider(final ExceptionTranslator exceptionTranslator) {
		return new DefaultExecuteListenerProvider(exceptionTranslator);
	}

	@Bean
	public org.jooq.Configuration jooqConfig(final ConnectionProvider connectionProvider, final TransactionProvider transactionProvider,
	        final ExecuteListenerProvider executeListenerProvider) {

		return new DefaultConfiguration().derive(connectionProvider).derive(transactionProvider).derive(executeListenerProvider).derive(SQLDialect.MYSQL);
	}
}