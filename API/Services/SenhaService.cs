using GestorContatos.IServices;
using System.Security.Cryptography;
using System.Text;

namespace GestorContatos.Services
{
    public class SenhaService : ISenhaService
    {
        private HashAlgorithm _algoritmo = SHA512.Create();       

        public string CriptografarSenha(string senha)
        {
            var encodedValue = Encoding.UTF8.GetBytes(senha);
            var encryptedPassword = _algoritmo.ComputeHash(encodedValue);

            var sb = new StringBuilder();
            foreach (var caracter in encryptedPassword)
            {
                sb.Append(caracter.ToString("X2"));
            }

            return sb.ToString();
        }
    }
}
