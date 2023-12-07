package com.jhipster.demo.store.web.rest;

import com.jhipster.demo.store.domain.Produtos;
import com.jhipster.demo.store.repository.ProdutosRepository;
import com.jhipster.demo.store.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.jhipster.demo.store.domain.Produtos}.
 */
@RestController
@RequestMapping("/api/produtos")
@Transactional
public class ProdutosResource {

    private final Logger log = LoggerFactory.getLogger(ProdutosResource.class);

    private static final String ENTITY_NAME = "produtos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProdutosRepository produtosRepository;

    public ProdutosResource(ProdutosRepository produtosRepository) {
        this.produtosRepository = produtosRepository;
    }

    /**
     * {@code POST  /produtos} : Create a new produtos.
     *
     * @param produtos the produtos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new produtos, or with status {@code 400 (Bad Request)} if the produtos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Produtos> createProdutos(@RequestBody Produtos produtos) throws URISyntaxException {
        log.debug("REST request to save Produtos : {}", produtos);
        if (produtos.getId() != null) {
            throw new BadRequestAlertException("A new produtos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Produtos result = produtosRepository.save(produtos);
        return ResponseEntity
            .created(new URI("/api/produtos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /produtos/:id} : Updates an existing produtos.
     *
     * @param id the id of the produtos to save.
     * @param produtos the produtos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produtos,
     * or with status {@code 400 (Bad Request)} if the produtos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the produtos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Produtos> updateProdutos(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Produtos produtos
    ) throws URISyntaxException {
        log.debug("REST request to update Produtos : {}, {}", id, produtos);
        if (produtos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, produtos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!produtosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Produtos result = produtosRepository.save(produtos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, produtos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /produtos/:id} : Partial updates given fields of an existing produtos, field will ignore if it is null
     *
     * @param id the id of the produtos to save.
     * @param produtos the produtos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produtos,
     * or with status {@code 400 (Bad Request)} if the produtos is not valid,
     * or with status {@code 404 (Not Found)} if the produtos is not found,
     * or with status {@code 500 (Internal Server Error)} if the produtos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Produtos> partialUpdateProdutos(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Produtos produtos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Produtos partially : {}, {}", id, produtos);
        if (produtos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, produtos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!produtosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Produtos> result = produtosRepository
            .findById(produtos.getId())
            .map(existingProdutos -> {
                if (produtos.getNome() != null) {
                    existingProdutos.setNome(produtos.getNome());
                }
                if (produtos.getPreco() != null) {
                    existingProdutos.setPreco(produtos.getPreco());
                }
                if (produtos.getCategoria() != null) {
                    existingProdutos.setCategoria(produtos.getCategoria());
                }
                if (produtos.getImagem() != null) {
                    existingProdutos.setImagem(produtos.getImagem());
                }

                return existingProdutos;
            })
            .map(produtosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, produtos.getId().toString())
        );
    }

    /**
     * {@code GET  /produtos} : get all the produtos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of produtos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Produtos>> getAllProdutos(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Produtos");
        Page<Produtos> page = produtosRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /produtos/:id} : get the "id" produtos.
     *
     * @param id the id of the produtos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the produtos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Produtos> getProdutos(@PathVariable Long id) {
        log.debug("REST request to get Produtos : {}", id);
        Optional<Produtos> produtos = produtosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produtos);
    }

    /**
     * {@code DELETE  /produtos/:id} : delete the "id" produtos.
     *
     * @param id the id of the produtos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProdutos(@PathVariable Long id) {
        log.debug("REST request to delete Produtos : {}", id);
        produtosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
