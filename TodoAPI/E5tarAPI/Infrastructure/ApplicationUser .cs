

using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace TodoAPI
{
    public class ApplicationUser : IdentityUser
    {

        [MaxLength(100)]
        public string FirstName { get; set; }


        [MaxLength(100)]
        public string LastName { get; set; }

        public string Extantion { get; set; }
        public string Profile_photo { get; set; }
        //public async Task<ClaimsIdentity> GenerateUserIdentityAsync(ApplicationUserManager userManager, UserManager<ApplicationUser> manager)
        //{
        //    // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
        //    var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);


        //    // Add custom user claims here
        //    return userIdentity;
        //}
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);


            // Add custom user claims here
            return userIdentity;
        }

    }
}