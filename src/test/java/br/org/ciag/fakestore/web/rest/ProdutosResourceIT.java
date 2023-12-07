package br.org.ciag.fakestore.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.org.ciag.fakestore.IntegrationTest;
import br.org.ciag.fakestore.domain.Produtos;
import br.org.ciag.fakestore.repository.ProdutosRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ProdutosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProdutosResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECO = 1F;
    private static final Float UPDATED_PRECO = 2F;

    private static final String DEFAULT_CATEGORIA = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIA = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGEM = "AAAAAAAAAA";
    private static final String UPDATED_IMAGEM = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/produtos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProdutosRepository produtosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProdutosMockMvc;

    private Produtos produtos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produtos createEntity(EntityManager em) {
        Produtos produtos = new Produtos().nome(DEFAULT_NOME).preco(DEFAULT_PRECO).categoria(DEFAULT_CATEGORIA).imagem(DEFAULT_IMAGEM);
        return produtos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produtos createUpdatedEntity(EntityManager em) {
        Produtos produtos = new Produtos().nome(UPDATED_NOME).preco(UPDATED_PRECO).categoria(UPDATED_CATEGORIA).imagem(UPDATED_IMAGEM);
        return produtos;
    }

    @BeforeEach
    public void initTest() {
        produtos = createEntity(em);
    }

    @Test
    @Transactional
    void createProdutos() throws Exception {
        int databaseSizeBeforeCreate = produtosRepository.findAll().size();
        // Create the Produtos
        restProdutosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(produtos)))
            .andExpect(status().isCreated());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeCreate + 1);
        Produtos testProdutos = produtosList.get(produtosList.size() - 1);
        assertThat(testProdutos.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testProdutos.getPreco()).isEqualTo(DEFAULT_PRECO);
        assertThat(testProdutos.getCategoria()).isEqualTo(DEFAULT_CATEGORIA);
        assertThat(testProdutos.getImagem()).isEqualTo(DEFAULT_IMAGEM);
    }

    @Test
    @Transactional
    void createProdutosWithExistingId() throws Exception {
        // Create the Produtos with an existing ID
        produtos.setId(1L);

        int databaseSizeBeforeCreate = produtosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdutosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(produtos)))
            .andExpect(status().isBadRequest());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllProdutos() throws Exception {
        // Initialize the database
        produtosRepository.saveAndFlush(produtos);

        // Get all the produtosList
        restProdutosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produtos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO.doubleValue())))
            .andExpect(jsonPath("$.[*].categoria").value(hasItem(DEFAULT_CATEGORIA)))
            .andExpect(jsonPath("$.[*].imagem").value(hasItem(DEFAULT_IMAGEM)));
    }

    @Test
    @Transactional
    void getProdutos() throws Exception {
        // Initialize the database
        produtosRepository.saveAndFlush(produtos);

        // Get the produtos
        restProdutosMockMvc
            .perform(get(ENTITY_API_URL_ID, produtos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(produtos.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO.doubleValue()))
            .andExpect(jsonPath("$.categoria").value(DEFAULT_CATEGORIA))
            .andExpect(jsonPath("$.imagem").value(DEFAULT_IMAGEM));
    }

    @Test
    @Transactional
    void getNonExistingProdutos() throws Exception {
        // Get the produtos
        restProdutosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingProdutos() throws Exception {
        // Initialize the database
        produtosRepository.saveAndFlush(produtos);

        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();

        // Update the produtos
        Produtos updatedProdutos = produtosRepository.findById(produtos.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedProdutos are not directly saved in db
        em.detach(updatedProdutos);
        updatedProdutos.nome(UPDATED_NOME).preco(UPDATED_PRECO).categoria(UPDATED_CATEGORIA).imagem(UPDATED_IMAGEM);

        restProdutosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedProdutos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedProdutos))
            )
            .andExpect(status().isOk());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
        Produtos testProdutos = produtosList.get(produtosList.size() - 1);
        assertThat(testProdutos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProdutos.getPreco()).isEqualTo(UPDATED_PRECO);
        assertThat(testProdutos.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
        assertThat(testProdutos.getImagem()).isEqualTo(UPDATED_IMAGEM);
    }

    @Test
    @Transactional
    void putNonExistingProdutos() throws Exception {
        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();
        produtos.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, produtos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(produtos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchProdutos() throws Exception {
        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();
        produtos.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProdutosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(produtos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamProdutos() throws Exception {
        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();
        produtos.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProdutosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(produtos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateProdutosWithPatch() throws Exception {
        // Initialize the database
        produtosRepository.saveAndFlush(produtos);

        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();

        // Update the produtos using partial update
        Produtos partialUpdatedProdutos = new Produtos();
        partialUpdatedProdutos.setId(produtos.getId());

        partialUpdatedProdutos.nome(UPDATED_NOME).imagem(UPDATED_IMAGEM);

        restProdutosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProdutos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProdutos))
            )
            .andExpect(status().isOk());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
        Produtos testProdutos = produtosList.get(produtosList.size() - 1);
        assertThat(testProdutos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProdutos.getPreco()).isEqualTo(DEFAULT_PRECO);
        assertThat(testProdutos.getCategoria()).isEqualTo(DEFAULT_CATEGORIA);
        assertThat(testProdutos.getImagem()).isEqualTo(UPDATED_IMAGEM);
    }

    @Test
    @Transactional
    void fullUpdateProdutosWithPatch() throws Exception {
        // Initialize the database
        produtosRepository.saveAndFlush(produtos);

        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();

        // Update the produtos using partial update
        Produtos partialUpdatedProdutos = new Produtos();
        partialUpdatedProdutos.setId(produtos.getId());

        partialUpdatedProdutos.nome(UPDATED_NOME).preco(UPDATED_PRECO).categoria(UPDATED_CATEGORIA).imagem(UPDATED_IMAGEM);

        restProdutosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProdutos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedProdutos))
            )
            .andExpect(status().isOk());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
        Produtos testProdutos = produtosList.get(produtosList.size() - 1);
        assertThat(testProdutos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProdutos.getPreco()).isEqualTo(UPDATED_PRECO);
        assertThat(testProdutos.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
        assertThat(testProdutos.getImagem()).isEqualTo(UPDATED_IMAGEM);
    }

    @Test
    @Transactional
    void patchNonExistingProdutos() throws Exception {
        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();
        produtos.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, produtos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(produtos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchProdutos() throws Exception {
        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();
        produtos.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProdutosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(produtos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamProdutos() throws Exception {
        int databaseSizeBeforeUpdate = produtosRepository.findAll().size();
        produtos.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProdutosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(produtos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Produtos in the database
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteProdutos() throws Exception {
        // Initialize the database
        produtosRepository.saveAndFlush(produtos);

        int databaseSizeBeforeDelete = produtosRepository.findAll().size();

        // Delete the produtos
        restProdutosMockMvc
            .perform(delete(ENTITY_API_URL_ID, produtos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Produtos> produtosList = produtosRepository.findAll();
        assertThat(produtosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
