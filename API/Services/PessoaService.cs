using GestorContatos.Context;
using GestorContatos.IServices;
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

namespace GestorContatos.Services
{
    public class PessoaService : IPessoaService
    {
        private ISenhaService _senhaService;

        public PessoaService(ISenhaService senhaService)
        {
            _senhaService = senhaService;            
        }

        public string ValidarModelo(Pessoa model)
        {
            if (string.IsNullOrEmpty(model.Nome) || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Senha))
            {
                return "Todos os campos devem estar preenchidos.";
            }

            if (!ValidarEmail(model.Email))
            {
                return "E-mail em formato inválido";               
            }

            using (var context = new ApplicationContext())
            {
                var pessoa = context.Pessoa.Where(p => p.Email == model.Email).FirstOrDefault();

                if (pessoa != null)
                {
                    return "E-mail já cadastrado.";                   
                }                
            }

            return "";
        }

        public void CadastrarPessoa(Pessoa model)
        {
            model.Senha = _senhaService.CriptografarSenha(model.Senha);

            using (var context = new ApplicationContext())
            {
                context.Pessoa.Add(model);
                context.SaveChanges();
            }
        }

        public Pessoa Login(Pessoa model)
        {
            model.Senha = _senhaService.CriptografarSenha(model.Senha);

            using (var context = new ApplicationContext())
            {
                return context.Pessoa.Where(p => p.Email == model.Email && p.Senha == model.Senha).FirstOrDefault();                
            }   
        }

        public string GerarToken(Pessoa pessoa)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Startup.StaticConfig["JWT:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, pessoa.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public List<Pessoa> ListarTodas(bool listarMaisDoisTelefones)
        {
            using (var context = new ApplicationContext())
            {
                List<Pessoa> pessoas;

                if (listarMaisDoisTelefones)
                {
                    List<int> listaId = (from x in context.PessoaTelefone
                               group x by x.PessoaId into g
                               where g.Count() >= 2
                               select g.Key).ToList();


                    pessoas = context.Pessoa.Where(p => listaId.Any(x => x == p.Id)).OrderByDescending(p => p.Id).ToList();
                }  
                
                else
                {
                    pessoas = context.Pessoa.Where(p => p.Email == null).OrderByDescending(p => p.Id).ToList();
                }

                foreach (var pessoa in pessoas)
                {
                    pessoa.Telefones = context.PessoaTelefone.Where(t => t.PessoaId == pessoa.Id).ToList();
                }

                return pessoas;
            }
        }

        public Pessoa GetPessoa(int id)
        {
            using (var context = new ApplicationContext())
            {
                var pessoa = context.Pessoa.Where(p => p.Id == id).FirstOrDefault();

                pessoa.Telefones = context.PessoaTelefone.Where(t => t.PessoaId == pessoa.Id).ToList();

                return pessoa;
            }
        }

        public void AdicionarPessoa(Pessoa model)
        {
            using (var context = new ApplicationContext())
            {
                context.Pessoa.Add(model);
                context.SaveChanges();
            }
        }       

        public bool ValidarEmail(string email)
        {
            try
            {
                MailAddress m = new MailAddress(email);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}
