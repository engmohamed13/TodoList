using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoAPI
{
    public class ApplicationRole : IdentityRole
    {
        public ApplicationRole() : base() { }

        public ApplicationRole(string roleName)
        {
            Name = roleName;
        }
        public Nullable<int> FK_Company_Id { get; set; }
        public string IconColor { get; set; }
    }
}