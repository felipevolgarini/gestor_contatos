using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Aplicacao.Controllers
{
    public class PessoaController : Controller
    {
        public IActionResult Cadastro()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Adicionar()
        {
            return View();
        }

        public IActionResult GetPessoa(int id)
        {
            ViewBag.Id = id;
            return View();
        }

        public IActionResult ListarTodas()
        {
            return View();
        }
    }
}
