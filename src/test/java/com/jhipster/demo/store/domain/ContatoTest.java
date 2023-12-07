package com.jhipster.demo.store.domain;

import static com.jhipster.demo.store.domain.ContatoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.jhipster.demo.store.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContatoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contato.class);
        Contato contato1 = getContatoSample1();
        Contato contato2 = new Contato();
        assertThat(contato1).isNotEqualTo(contato2);

        contato2.setId(contato1.getId());
        assertThat(contato1).isEqualTo(contato2);

        contato2 = getContatoSample2();
        assertThat(contato1).isNotEqualTo(contato2);
    }
}
