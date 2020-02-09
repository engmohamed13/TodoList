using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace TodoAPI
{
    public class EmailService
    {
        public static async Task Execute(string useremail, String text, String Subject, string htmlcontent,string code,string id)
        {

            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("mohamedhagag191@gmail.com", "E5tar");
            //email template
            //string filepath = "F:\\Mycompany\\Final\\offlineE5tar\\Todo\\EmailTemplate\\SignUp.html";
             string filepath = "F:\\Mycompany\\Final\\Todo\\EmailTemplate\\SignUp.html";
       

            StreamReader str = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/EmailTemplate/SignUp.html"));


            //end
            var subject = Subject;
            var to = new EmailAddress(useremail, "User");
            //test


            string plainTextContent = str.ReadToEnd();
            str.Close();


            //Repalce [newusername] = signup user name   
            plainTextContent = plainTextContent.Replace("[newusername]", subject/*.Text.Trim()*/);
            plainTextContent = plainTextContent.Replace("[code]", code/*.Text.Trim()*/);
            plainTextContent = plainTextContent.Replace("[id]", id/*.Text.Trim()*/);

            //
            //var plainTextContent = text;

            var htmlContent = htmlcontent;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, /*htmlContent*/plainTextContent);
            var response = await client.SendEmailAsync(msg);

            //old
            //var apiKey = "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";
            //var client = new SendGridClient(apiKey);
            //var from = new EmailAddress("mohamedhagag191@gmail.com", "E5tar");
            ////email template
            //string filepath = "http://ahmedviber-001-site1.ftempurl.com/EmailTemplate/SignUp.html";
            //StreamReader str = new StreamReader(filepath);


            ////end
            //var subject = Subject;
            //var to = new EmailAddress(useremail, "User");
            ////test


            //string plainTextContent = str.ReadToEnd();
            //str.Close();


            ////Repalce [newusername] = signup user name   
            //plainTextContent = plainTextContent.Replace("[newusername]", subject/*.Text.Trim()*/);

            ////
            ////var plainTextContent = text;

            //var htmlContent = htmlcontent;
            //var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            //var response = await client.SendEmailAsync(msg);

        }
        public static async Task ExecuteForgetpassword(string useremail, String text, String Subject, string htmlcontent, string code, string id)
        {

            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("mohamedhagag191@gmail.com", "E5tar");
            //email template
            //string filepath = "F:\\Mycompany\\Final\\offlineE5tar\\Todo\\EmailTemplate\\SignUp.html";
            string filepath = "F:\\Mycompany\\Final\\Todo\\EmailTemplate\\SignUp.html";


            StreamReader str = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/EmailTemplate/ResetPassword.html"));


            //end
            var subject = Subject;
            var to = new EmailAddress(useremail, "User");
            //test


            string plainTextContent = str.ReadToEnd();
            str.Close();


            //Repalce [newusername] = signup user name   
            plainTextContent = plainTextContent.Replace("[newusername]", subject);
            plainTextContent = plainTextContent.Replace("[code]", code);
            plainTextContent = plainTextContent.Replace("[id]", id);

            //
            //var plainTextContent = text;

            var htmlContent = htmlcontent;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, /*htmlContent*/plainTextContent);
            var response = await client.SendEmailAsync(msg);

           

            
        }

    }
}