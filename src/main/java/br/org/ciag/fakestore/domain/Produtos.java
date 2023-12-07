package br.org.ciag.fakestore.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Produtos.
 */
@Entity
@Table(name = "produtos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Produtos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "preco")
    private Float preco;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "imagem")
    private String imagem;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Produtos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Produtos nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Float getPreco() {
        return this.preco;
    }

    public Produtos preco(Float preco) {
        this.setPreco(preco);
        return this;
    }

    public void setPreco(Float preco) {
        this.preco = preco;
    }

    public String getCategoria() {
        return this.categoria;
    }

    public Produtos categoria(String categoria) {
        this.setCategoria(categoria);
        return this;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getImagem() {
        return this.imagem;
    }

    public Produtos imagem(String imagem) {
        this.setImagem(imagem);
        return this;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produtos)) {
            return false;
        }
        return getId() != null && getId().equals(((Produtos) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produtos{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", preco=" + getPreco() +
            ", categoria='" + getCategoria() + "'" +
            ", imagem='" + getImagem() + "'" +
            "}";
    }
}
