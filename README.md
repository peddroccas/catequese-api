# Catequese API

![Em Desenvolvimento](https://img.shields.io/badge/status-em%20desenvolvimento-orange)

## 📋 Requisitos

### Requisitos Funcionais (RFs)

- [x] Deve ser possível cadastrar nova turma
- [x] Deve ser possível cadastrar novo catequista
- [x] Deve ser possível cadastrar novo catequizando
- [ ] Deve ser possível catequista se autenticar
- [x] Deve ser possível cadastrar novo parcela do catequizando
- [x] Deve ser possível consultar catequizandos por sala
- [x] Deve ser possível adicionar catequizandos em uma sala
- [x] Deve ser possível adicionar catequista em uma sala
- [ ] Deve ser possível consultar catequista pelo nome
- [ ] Deve ser possível consultar catequizando pelo nome


### Regras de Negócio (RNs)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado


### Requisitos Não-Funcionais (RNFs)

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisam estar persistido em um banco PostgreSQL
- [ ] O usuário deve ser identificado por um JWT (Json Web Token)

## 🛠 Tecnologias Utilizadas

- **Backend:** Node.js
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT (Json Web Token)
