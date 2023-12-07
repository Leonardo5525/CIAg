package br.org.ciag.fakestore.domain;

import static br.org.ciag.fakestore.domain.ProdutosTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import br.org.ciag.fakestore.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProdutosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Produtos.class);
        Produtos produtos1 = getProdutosSample1();
        Produtos produtos2 = new Produtos();
        assertThat(produtos1).isNotEqualTo(produtos2);

        produtos2.setId(produtos1.getId());
        assertThat(produtos1).isEqualTo(produtos2);

        produtos2 = getProdutosSample2();
        assertThat(produtos1).isNotEqualTo(produtos2);
    }
}
