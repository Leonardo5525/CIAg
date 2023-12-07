package com.jhipster.demo.store.repository;

import com.jhipster.demo.store.domain.Produtos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Produtos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdutosRepository extends JpaRepository<Produtos, Long> {}
