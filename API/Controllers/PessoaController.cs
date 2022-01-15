using GestorContatos.Models;
using GestorContatos.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using GestorContatos.IServices;

namespace GestorContatos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;
        private readonly IHttpContextAccessor _accessor;

        public PessoaController(IHttpContextAccessor accessor, IPessoaService pessoaService)
        {
            _accessor = accessor;
            _pessoaService = pessoaService;
        }


        [Route("cadastro")]
        [HttpPost]
        public IActionResult Cadastro(Pessoa model)
        {
            string message = _pessoaService.ValidarModelo(model);

            if (message != "")
            {
                return BadRequest(new
                {
                    message = message
                });
            }

            _pessoaService.CadastrarPessoa(model);

            return Ok(new
            {
                message = "Pessoa cadastrada com sucesso."
            });
        }

        [Route("adicionar")]
        [HttpPost]
        public IActionResult Adicionar(Pessoa model)
        {
            _pessoaService.AdicionarPessoa(model);

            return Ok(new
            {
                message = "Pessoa cadastrada com sucesso."
            });
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login(Pessoa model)
        {
            Pessoa pessoa = _pessoaService.Login(model);

            if (pessoa == null)
            {
                return BadRequest(new
                {
                    message = "Usuário ou senha inválidos"
                });
            }

            var token = _pessoaService.GerarToken(pessoa);

            return Ok(new
            {
                token = token
            });
        }

        [Route("getPessoa")]
        [Authorize]
        [HttpGet]
        public IActionResult GetPessoa(int id)
        {
            var pessoa = _pessoaService.GetPessoa(id);

            if (pessoa == null)
            {
                return BadRequest(new
                {
                    message = "Essa pessoa não existe."
                });
            }

            return Ok(new
            {
                pessoa = pessoa
            });
        }       

        [Route("listarTodas")]
        [Authorize]
        [HttpGet]
        public IActionResult ListarTodas(bool listarMaisDoisTelefones)
        {
            List<Pessoa> pessoas = _pessoaService.ListarTodas(listarMaisDoisTelefones);

            return Ok(new
            {
                pessoas = pessoas
            });

        }       
    }
}
