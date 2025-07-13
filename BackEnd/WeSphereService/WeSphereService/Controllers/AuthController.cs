using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WeSphereService.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("login")]
        public IActionResult  Login([FromBody] LoginRequest request)
        {
            return new ApiResponse()
            //return Ok( new
            //{
            //    StatusCode = 200,
            //    Message = "Lấy token thành công",
            //    Data = "KAJNDKF9Q213H49I12834YQAEHSIOURH19Q23O918W3Y491LKIUJI"
            //}    
            //    );
        }
    }
}
