using System;

namespace GestorContatos.Models
{
    public class PessoaTelefone
    {
        public int Id { get; set; }
        public string Numero { get; set; }
        public int PessoaId { get; set; }               
    }
}
