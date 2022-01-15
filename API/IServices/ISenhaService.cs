using System.Security.Cryptography;
using System.Text;

namespace GestorContatos.IServices
{
    public interface ISenhaService
    {
        public string CriptografarSenha(string senha);
    }
}
