using Microsoft.AspNetCore.Mvc;

namespace GestorContatos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IniciarController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Servidor iniciado com sucesso!";
        }
    }
}
