package br.org.ciag.fakestore.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.org.ciag.fakestore.IntegrationTest;
import br.org.ciag.fakestore.domain.Contato;
import br.org.ciag.fakestore.repository.ContatoRepository;
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
 * Integration tests for the {@link ContatoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ContatoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_RG = "AAAAAAAAAA";
    private static final String UPDATED_RG = "BBBBBBBBBB";

    private static final String DEFAULT_CPF = "AAAAAAAAAA";
    private static final String UPDATED_CPF = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/contatoes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restContatoMockMvc;

    private Contato contato;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contato createEntity(EntityManager em) {
        Contato contato = new Contato().nome(DEFAULT_NOME).email(DEFAULT_EMAIL).telefone(DEFAULT_TELEFONE).rg(DEFAULT_RG).cpf(DEFAULT_CPF);
        return contato;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Contato createUpdatedEntity(EntityManager em) {
        Contato contato = new Contato().nome(UPDATED_NOME).email(UPDATED_EMAIL).telefone(UPDATED_TELEFONE).rg(UPDATED_RG).cpf(UPDATED_CPF);
        return contato;
    }

    @BeforeEach
    public void initTest() {
        contato = createEntity(em);
    }

    @Test
    @Transactional
    void createContato() throws Exception {
        int databaseSizeBeforeCreate = contatoRepository.findAll().size();
        // Create the Contato
        restContatoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contato)))
            .andExpect(status().isCreated());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeCreate + 1);
        Contato testContato = contatoList.get(contatoList.size() - 1);
        assertThat(testContato.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testContato.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testContato.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testContato.getRg()).isEqualTo(DEFAULT_RG);
        assertThat(testContato.getCpf()).isEqualTo(DEFAULT_CPF);
    }

    @Test
    @Transactional
    void createContatoWithExistingId() throws Exception {
        // Create the Contato with an existing ID
        contato.setId(1L);

        int databaseSizeBeforeCreate = contatoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restContatoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contato)))
            .andExpect(status().isBadRequest());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllContatoes() throws Exception {
        // Initialize the database
        contatoRepository.saveAndFlush(contato);

        // Get all the contatoList
        restContatoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contato.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)))
            .andExpect(jsonPath("$.[*].rg").value(hasItem(DEFAULT_RG)))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF)));
    }

    @Test
    @Transactional
    void getContato() throws Exception {
        // Initialize the database
        contatoRepository.saveAndFlush(contato);

        // Get the contato
        restContatoMockMvc
            .perform(get(ENTITY_API_URL_ID, contato.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(contato.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE))
            .andExpect(jsonPath("$.rg").value(DEFAULT_RG))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF));
    }

    @Test
    @Transactional
    void getNonExistingContato() throws Exception {
        // Get the contato
        restContatoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingContato() throws Exception {
        // Initialize the database
        contatoRepository.saveAndFlush(contato);

        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();

        // Update the contato
        Contato updatedContato = contatoRepository.findById(contato.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedContato are not directly saved in db
        em.detach(updatedContato);
        updatedContato.nome(UPDATED_NOME).email(UPDATED_EMAIL).telefone(UPDATED_TELEFONE).rg(UPDATED_RG).cpf(UPDATED_CPF);

        restContatoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedContato.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedContato))
            )
            .andExpect(status().isOk());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
        Contato testContato = contatoList.get(contatoList.size() - 1);
        assertThat(testContato.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testContato.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContato.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testContato.getRg()).isEqualTo(UPDATED_RG);
        assertThat(testContato.getCpf()).isEqualTo(UPDATED_CPF);
    }

    @Test
    @Transactional
    void putNonExistingContato() throws Exception {
        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();
        contato.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContatoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, contato.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contato))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchContato() throws Exception {
        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();
        contato.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContatoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(contato))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamContato() throws Exception {
        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();
        contato.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContatoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(contato)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateContatoWithPatch() throws Exception {
        // Initialize the database
        contatoRepository.saveAndFlush(contato);

        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();

        // Update the contato using partial update
        Contato partialUpdatedContato = new Contato();
        partialUpdatedContato.setId(contato.getId());

        partialUpdatedContato.nome(UPDATED_NOME).email(UPDATED_EMAIL).cpf(UPDATED_CPF);

        restContatoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedContato.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedContato))
            )
            .andExpect(status().isOk());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
        Contato testContato = contatoList.get(contatoList.size() - 1);
        assertThat(testContato.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testContato.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContato.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testContato.getRg()).isEqualTo(DEFAULT_RG);
        assertThat(testContato.getCpf()).isEqualTo(UPDATED_CPF);
    }

    @Test
    @Transactional
    void fullUpdateContatoWithPatch() throws Exception {
        // Initialize the database
        contatoRepository.saveAndFlush(contato);

        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();

        // Update the contato using partial update
        Contato partialUpdatedContato = new Contato();
        partialUpdatedContato.setId(contato.getId());

        partialUpdatedContato.nome(UPDATED_NOME).email(UPDATED_EMAIL).telefone(UPDATED_TELEFONE).rg(UPDATED_RG).cpf(UPDATED_CPF);

        restContatoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedContato.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedContato))
            )
            .andExpect(status().isOk());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
        Contato testContato = contatoList.get(contatoList.size() - 1);
        assertThat(testContato.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testContato.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testContato.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testContato.getRg()).isEqualTo(UPDATED_RG);
        assertThat(testContato.getCpf()).isEqualTo(UPDATED_CPF);
    }

    @Test
    @Transactional
    void patchNonExistingContato() throws Exception {
        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();
        contato.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContatoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, contato.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contato))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchContato() throws Exception {
        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();
        contato.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContatoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(contato))
            )
            .andExpect(status().isBadRequest());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamContato() throws Exception {
        int databaseSizeBeforeUpdate = contatoRepository.findAll().size();
        contato.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restContatoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(contato)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Contato in the database
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteContato() throws Exception {
        // Initialize the database
        contatoRepository.saveAndFlush(contato);

        int databaseSizeBeforeDelete = contatoRepository.findAll().size();

        // Delete the contato
        restContatoMockMvc
            .perform(delete(ENTITY_API_URL_ID, contato.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Contato> contatoList = contatoRepository.findAll();
        assertThat(contatoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
