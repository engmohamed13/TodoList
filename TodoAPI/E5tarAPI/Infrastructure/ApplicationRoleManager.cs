using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace TodoAPI
{
    public class ApplicationRoleManager : RoleManager<ApplicationRole>
    {
        public ApplicationRoleManager(
            IRoleStore<ApplicationRole, string> roleStore)
            : base(roleStore)
        {
            this.RoleValidator = new MyRoleValidator(this);
            RoleValidator = new MyRoleValidator(this);
        }
        public static ApplicationRoleManager Create(
            IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            var manager = new ApplicationRoleManager(new RoleStore<ApplicationRole>(context.Get<ApplicationDbContext>()));



            return manager;
            return new ApplicationRoleManager(
                new RoleStore<ApplicationRole>(context.Get<ApplicationDbContext>()));
        }


    }
    public class MyRoleValidator : RoleValidator<ApplicationRole>
    {
        private RoleManager<ApplicationRole, string> Manager { get; set; }

        public MyRoleValidator(RoleManager<ApplicationRole, string> manager) : base(manager)
        {
            this.Manager = manager;
        }

        public override async Task<IdentityResult> ValidateAsync(ApplicationRole item)
        {
            if ((object)item == null)
            {
                throw new ArgumentNullException("item");
            }

            var errors = new List<string>();
            await this.ValidateRoleName(item, errors);
            return errors.Count <= 0 ? IdentityResult.Success : IdentityResult.Failed(errors.ToArray());
        }
        private async Task ValidateRoleName(ApplicationRole role, List<string> errors)
        {
            if (string.IsNullOrWhiteSpace(role.Name))
            {
                errors.Add("Name cannot be null or empty.");
            }
            else
            {
                var existingRole = await this.Manager.Roles.FirstOrDefaultAsync(x => x.Id == role.Id && x.Name == role.Name);
                if (existingRole == null)
                {
                    return;
                }

                errors.Add(string.Format("{0} is already taken.", role.Name));
            }
        }
    }
}
