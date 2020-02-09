using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using System.Web.Http.Cors;

namespace TodoAPI.Providers
{
   // [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class CustomOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {   
            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
           TodoAPIDBEntities db = new TodoAPIDBEntities();

            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            ApplicationUserManager _AppUserManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            ApplicationRoleManager _AppRoleManger = context.OwinContext.GetUserManager<ApplicationRoleManager>();


            IdentityUser user = await _AppUserManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                // user = await db.AspNetUsers.SingleOrDefault(u => u.Email == search)
                user = await _AppUserManager.FindByEmailAsync(context.UserName.Trim());
                // user = await _AppUserManager.FindAsync(context.UserName, context.Password);
            }
            if (user == null)
            {

                //var userphone = db.AspNetUsers.SingleOrDefault(
                //x =>
                //x.PhoneNumber == context.UserName
                //||
                //x.UserName == context.UserName

                //);

                //if (userphone != null)
                //{
                //    user = await _AppUserManager.FindAsync(userphone.UserName, context.Password);
                //}


            }
            if (user == null)
            {
                context.SetError("invalid_grant", "The username or password is incorrect");
                return;
            }
            
           
            //var userActive = db.AspNetUsers.SingleOrDefault(x => x.Id== user.Id & x.s == 2);//Means That User Active

            //if (userActive == null)
            //{
            //    context.SetError("invalid_grant", "User Status Is Locked");
            //    return;
            //}



            //var u = db.AspNetUsers.SingleOrDefault(x => x.Id == user.Id & x.EmailConfirmed == true);

            //if (u == null)
            //{
            //    context.SetError("invalid_grant", "You Must Confirm Email.");
            //    return;
            //}


            if (user != null)
            {
                user = await _AppUserManager.FindAsync(user.UserName, context.Password);
                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect");
                    return;
                }
            }
            string OTP_HEADER = "XOTP";

            var form = context.OwinContext.Request.ReadFormAsync();
            form.Wait();

            var keycontain = false;

            foreach (var item in form.Result)
            {
                keycontain = item.Key.Contains(OTP_HEADER);

            }

            #region old
            //var twoFactorEnabled = await _AppUserManager.GetTwoFactorEnabledAsync(user.Id);

            //if (twoFactorEnabled)
            //{


            //   code = await _AppUserManager.GenerateTwoFactorTokenAsync(user.Id, "PhoneCode");


            //    var message = new IdentityMessage
            //    {
            //        Body = "Your security code is: " + code
            //    };
            //    await _AppUserManager.SmsService.SendAsync(message);

            //}
            #endregion

            if (keycontain)
            {

                var otp = form.Result.SingleOrDefault(k => k.Key == OTP_HEADER).Value[0];

                //string otp = context.OwinContext.Request.Headers.GetValues(OTP_HEADER).First();
              



            }
            else
            {

                //var user2 = db.AspNetUsers.SingleOrDefault(y => y.Id == user.Id);
                var twoFactorEnabled = await _AppUserManager.GetTwoFactorEnabledAsync(user.Id);

                if (twoFactorEnabled)
                {


                    var code = await _AppUserManager.GenerateTwoFactorTokenAsync(user.Id, "PhoneCode");



                    //var message = new IdentityMessage
                    //{
                    //    Body = "Your security code is: " + code,
                    //    Destination = "+" + user2.Country.PhoneCode + user.PhoneNumber
                    //};
                    //await _AppUserManager.SmsService.SendAsync(message);
                    context.SetError("invalid_grant", "TowFactorAuthentication.");
                    return;
                }

            }


            var roles = await _AppUserManager.GetRolesAsync(user.Id);


           var appuser = db.AspNetUsers.SingleOrDefault(ru => ru.Id == user.Id);

            var identity = new ClaimsIdentity("JWT");

            identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, appuser.Id));
            identity.AddClaim(new Claim("Email", appuser.Email));
            identity.AddClaim(new Claim("UserName", appuser.UserName));





            foreach (var role in roles)
            {
                var rolefind = await _AppRoleManger.FindByNameAsync(role);
                //var junk = db.AspNetRoles.SingleOrDefault(r => r.Id == rolefind.Id);
                //var company = junk.FK_Company_Id;

                identity.AddClaim(new Claim(ClaimTypes.Role, rolefind.Name));


            }
            var tokenExpiration = TimeSpan.FromDays(10);

            var props = new AuthenticationProperties(new Dictionary<string, string>
{
{
"audience", (context.ClientId == null) ? string.Empty : context.ClientId

},
//to add data to token
{
"email", (context.UserName == null) ? string.Empty : context.UserName

},


})
            {
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.Add(tokenExpiration),
               
            
            };


            var ticket = new AuthenticationTicket(identity, props);

            context.Validated(ticket);
            return;
        }
    }

    //   public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    //   {
    //       DB_A3F1D4_E5tardpEntities db = new DB_A3F1D4_E5tardpEntities();
    //       private readonly string _publicClientId;

    //       public ApplicationOAuthProvider(string publicClientId)
    //       {
    //           if (publicClientId == null)
    //           {
    //               throw new ArgumentNullException("publicClientId");
    //           }

    //           _publicClientId = publicClientId;
    //       }

    //       public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
    //{







    //           var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();





    //           ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

    //           if (user == null)
    //           {
    //               user = await userManager.FindByEmailAsync(context.UserName.Trim());
    //           }
    //           if (user == null)
    //           {

    //               var userphone = db.AspNetUsers.SingleOrDefault(
    //               x =>
    //                x.Email == context.UserName
    //                ||
    //                x.PhoneNumber == context.UserName



    //               );

    //               if (userphone != null)
    //               {
    //                   user = await userManager.FindAsync(userphone.UserName, context.Password);
    //               }


    //           }
    //           var u = db.AspNetUsers.SingleOrDefault(x => x.Id == user.Id & x.EmailConfirmed == true);

    //           if (u == null)
    //           {
    //               context.SetError("invalid_grant", "You Must Confirm Mail.");
    //               return;
    //           }



    //           if (user == null)
    //           {
    //               context.SetError("invalid_grant", "The user name or password is incorrect.");
    //               return;
    //           }


    //           #region
    //           /// use jwt
    //           //string OTP_HEADER = "XOTP";

    //           //var form = context.OwinContext.Request.ReadFormAsync();
    //           //form.Wait();

    //           //var keycontain = false;

    //           //foreach (var item in form.Result)
    //           //{
    //           //    keycontain = item.Key.Contains(OTP_HEADER);

    //           //}


    //           //if (keycontain)
    //           //{

    //           //    var otp = form.Result.SingleOrDefault(k => k.Key == OTP_HEADER).Value[0];

    //           //    //string otp = context.OwinContext.Request.Headers.GetValues(OTP_HEADER).First();
    //           //    var x = await Verfiytoken.verfiy(context.OwinContext, u.Psk, otp);
    //           //    if (x != true)
    //           //    {
    //           //        context.SetError("invalid_grant", "TowFactorAuthentication.");
    //           //        return;
    //           //    }




    //           //}
    //           //else
    //           //{

    //           //    var user2 = db.AspNetUsers.SingleOrDefault(y => y.Id == user.Id);
    //           //    var twoFactorEnabled = await userManager.GetTwoFactorEnabledAsync(user.Id);

    //           //    if (twoFactorEnabled)
    //           //    {


    //           //        var code = await userManager.GenerateTwoFactorTokenAsync(user.Id, "PhoneCode");



    //           //        var message = new IdentityMessage
    //           //        {
    //           //            Body = "Your security code is: " + code,
    //           //            Destination = "+" + user2.Country.PhoneCode + user.PhoneNumber
    //           //        };
    //           //        await _AppUserManager.SmsService.SendAsync(message);
    //           //        context.SetError("invalid_grant", "TowFactorAuthentication.");
    //           //        return;
    //           //    }

    //           //}
    //           ///
    //           #endregion



    //           ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager,
    //              OAuthDefaults.AuthenticationType);
    //           ClaimsIdentity cookiesIdentity = await user.GenerateUserIdentityAsync(userManager,
    //               CookieAuthenticationDefaults.AuthenticationType);

    //           AuthenticationProperties properties = CreateProperties(user.UserName, user);
    //           //test
    //           //AuthenticationProperties propertie1 = CreateProperties(user.Email);
    //           //AuthenticationProperties propertie2 = CreateProperties(user.Id);
    //           //test
    //           AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);

    //           //AuthenticationTicket ticket1 = new AuthenticationTicket(oAuthIdentity, properties);
    //           context.Validated(ticket);
    //           //context.Validated(ticket1);
    //           context.Request.Context.Authentication.SignIn(cookiesIdentity);
    //       }

    //       public override Task TokenEndpoint(OAuthTokenEndpointContext context)
    //       {
    //           foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
    //           {
    //               context.AdditionalResponseParameters.Add(property.Key, property.Value);

    //           }

    //           return Task.FromResult<object>(null);
    //       }

    //       public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
    //       {
    //           // Resource owner password credentials does not provide a client ID.
    //           if (context.ClientId == null)
    //           {
    //               context.Validated();
    //           }

    //           return Task.FromResult<object>(null);
    //       }

    //       public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
    //       {
    //           if (context.ClientId == _publicClientId)
    //           {
    //               Uri expectedRootUri = new Uri(context.Request.Uri, "/");

    //               if (expectedRootUri.AbsoluteUri == context.RedirectUri)
    //               {
    //                   context.Validated();
    //               }
    //           }

    //           return Task.FromResult<object>(null);
    //       }

    //       public static AuthenticationProperties CreateProperties(string userName, ApplicationUser user)
    //       {
    //           IDictionary<string, string> data = new Dictionary<string, string>
    //                       {
    //                           { "userName", userName }
    //                       };
    //           //IDictionary<string, string> data = new Dictionary<string, string>
    //           //{
    //           //    { "Email", userName }
    //           //};

    //           data["Id"] = user.Id;
    //           data["Email"] = user.Email;
    //           if (user.FK_UserType_Id == 1)
    //           {
    //               data["UserTypeId"] = user.FK_UserType_Id.ToString();
    //               data["UserTypeName"] = "Original";

    //           }
    //           else if (user.FK_UserType_Id == 2)
    //           {
    //               data["UserTypeId"] = user.FK_UserType_Id.ToString();
    //               data["UserTypeName"] = "Admin";

    //           }
    //           else
    //           {
    //               data["UserTypeId"] = "";
    //           }

    //           return new AuthenticationProperties(data);
    //       }
    //   }
}