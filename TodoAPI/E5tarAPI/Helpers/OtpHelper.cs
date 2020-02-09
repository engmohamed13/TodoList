
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace TodoAPI
{
    public static class OtpHelper
    {
        private const string OTP_HEADER = "XOTP";

        public static bool HasValidTotp(this IOwinContext context, string key)
        {
            var form = context.Request.ReadFormAsync();
            form.Wait();

            var keycontain = false;

            foreach (var item in form.Result)
            {
                keycontain = item.Key.Contains(OTP_HEADER);

            }
            if (true)
            {
                var otp = form.Result.SingleOrDefault(k => k.Key == OTP_HEADER).Value[0];

                // We need to check the passcode against the past, current, and future passcodes

                if (!string.IsNullOrWhiteSpace(otp))
                {
                    if (TimeSensitivePassCode.GetListOfOTPs(key).Any(t => t.Equals(otp)))
                    {
                        return true;
                    }
                }

            }
            return false;
        }
    }
}