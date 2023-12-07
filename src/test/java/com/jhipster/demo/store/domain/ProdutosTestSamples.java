package com.jhipster.demo.store.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ProdutosTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Produtos getProdutosSample1() {
        return new Produtos().id(1L).nome("nome1").categoria("categoria1").imagem("imagem1");
    }

    public static Produtos getProdutosSample2() {
        return new Produtos().id(2L).nome("nome2").categoria("categoria2").imagem("imagem2");
    }

    public static Produtos getProdutosRandomSampleGenerator() {
        return new Produtos()
            .id(longCount.incrementAndGet())
            .nome(UUID.randomUUID().toString())
            .categoria(UUID.randomUUID().toString())
            .imagem(UUID.randomUUID().toString());
    }
}
