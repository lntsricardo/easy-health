package br.com.easy.health.config;

import static org.springframework.transaction.TransactionDefinition.PROPAGATION_NESTED;

import org.jooq.TransactionContext;
import org.jooq.TransactionProvider;
import org.jooq.tools.JooqLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class EasyHealthTransactionProvider implements TransactionProvider {

	private static final JooqLogger log = JooqLogger.getLogger(EasyHealthTransactionProvider.class);

	@Autowired
	DataSourceTransactionManager txMgr;

	@Override
	public void begin(final TransactionContext ctx) {
		log.info("Begin transaction");
		final TransactionStatus tx = txMgr.getTransaction(new DefaultTransactionDefinition(PROPAGATION_NESTED));
		ctx.transaction(new EasyHealthTransaction(tx));
	}

	@Override
	public void commit(final TransactionContext ctx) {
		log.info("commit transaction");
		txMgr.commit(((EasyHealthTransaction) ctx.transaction()).tx);
	}

	@Override
	public void rollback(final TransactionContext ctx) {
		log.info("rollback transaction");

		txMgr.rollback(((EasyHealthTransaction) ctx.transaction()).tx);
	}
}
