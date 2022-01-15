using System;
using System.Collections.Generic;

namespace GestorContatos.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime DataNascimento { get; set; }
        public List<PessoaTelefone> Telefones { get; set; }
    }
}
