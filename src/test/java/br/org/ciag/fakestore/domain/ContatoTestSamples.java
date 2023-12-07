package br.org.ciag.fakestore.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ContatoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Contato getContatoSample1() {
        return new Contato().id(1L).nome("nome1").email("email1").telefone("telefone1").rg("rg1").cpf("cpf1");
    }

    public static Contato getContatoSample2() {
        return new Contato().id(2L).nome("nome2").email("email2").telefone("telefone2").rg("rg2").cpf("cpf2");
    }

    public static Contato getContatoRandomSampleGenerator() {
        return new Contato()
            .id(longCount.incrementAndGet())
            .nome(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .telefone(UUID.randomUUID().toString())
            .rg(UUID.randomUUID().toString())
            .cpf(UUID.randomUUID().toString());
    }
}
