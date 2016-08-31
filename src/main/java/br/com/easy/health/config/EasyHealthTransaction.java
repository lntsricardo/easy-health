package br.com.easy.health.config;

import org.jooq.Transaction;
import org.springframework.transaction.TransactionStatus;

public class EasyHealthTransaction implements Transaction {
	final TransactionStatus tx;

	EasyHealthTransaction(final TransactionStatus tx) {
		this.tx = tx;
	}
}
