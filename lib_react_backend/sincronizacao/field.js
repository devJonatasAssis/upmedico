class Field {
  constructor(nome) {
    this.nome = nome;
  }

  /**
   * Define o campo como uma pk, seu tipo será 'int PRIMARY KEY AUTO_INCREMENT NOT NULL'
   */
  pk() {
    this.isPk = true;
    return this;
  }

  /**
   * Referencia uma chave primaria.
   */
  references(referencia, nomeReferencia) {
    this.referencia = referencia;
    this.nomeReferencia = nomeReferencia;
    return this;
  }


  /**
   * Define um valor default para o campo
   */
  default(valor) {
    this.valorDefault = valor;
    return this;
  }

  /**
   * Define o campo como um TEXT
   */
  text() {
    this.tipo = 'text';
    return this;
  }

  /**
   * Seta o campo como um double
   * @param {double} tamanho O Tamanho do double  - Padrão 12,2
   */
  double(tamanho) {
    this.tipo = 'double';
    this.tamanhoCampo = tamanho || '12, 2';
    return this;
  }

  /**
   * Seta o campo como um decimal
   * @param {decimal} tamanho O Tamanho do decimal - Padrão 23,7
   */
  decimal(tamanho) {
    this.tipo = 'decimal';
    this.tamanhoCampo = tamanho || '23, 7';
    return this;
  }

  /**
   * Seta o campo como um blob
   */
  blob() {
    this.tipo = 'blob';
    return this;
  }

  /**
   * Seta o campo como um inteiro
   * @param {int} tamanho O Tamanho do inteiro
   */
  int(tamanho) {
    this.tipo = 'int';
    this.tamanhoCampo = tamanho || 6;
    return this;
  }

  /**
   * Define esse campo como 'unico', ele não poderá
   * ser repetido.
   */
  unique() {
    this.uniqueValue = true;
    return this;
  }

  /**
   * Seta o campo como uma string
   * @param {*} tamanho O Tamanho do varchar
   */
  varchar(tamanho) {
    this.tipo = 'varchar';
    this.tamanhoCampo = tamanho || 255;
    return this;
  }

  /**
   * Seta o campo como um time
   */
  time() {
    this.tipo = 'time';
    return this;
  }

  /**
   * Seta o campo como um date
   */
  date() {
    this.tipo = 'date';
    return this;
  }

  /**
   * Seta o campo como um datetime
   */
  datetime() {
    this.tipo = 'datetime';
    return this;
  }

  /**
   * Define o campo como um enum, os parâmetros podem ser infinitos nesse
   * método, e todos os parâmetros serão o valor do enum.
   * ex: enum('S', 'B', 'V', 'C')
   */
  enum() {
    this.tipo = 'enum';
    this.enumValues = '';
    for (let i = 0; i < arguments.length; i++) {
      this.enumValues += ('"' + arguments[i] + '", ');
    }
    this.enumValues = this.enumValues.substring(0, this.enumValues.length - 2);
    return this;
  }
}

module.exports = (nome) => {
  return new Field(nome);
};
