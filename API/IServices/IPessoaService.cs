using GestorContatos.Context;
using GestorContatos.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace GestorContatos.IServices
{
    public interface IPessoaService
    {
        public string ValidarModelo(Pessoa model);

        public void CadastrarPessoa(Pessoa model);

        public Pessoa Login(Pessoa model);

        public string GerarToken(Pessoa pessoa);

        public List<Pessoa> ListarTodas(bool listarMaisDoisTelefones);

        public Pessoa GetPessoa(int id);

        public void AdicionarPessoa(Pessoa model);
        
        public bool ValidarEmail(string email);
    }
}
