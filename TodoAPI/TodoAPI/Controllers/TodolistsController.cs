using Microsoft.AspNet.Identity;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TodoAPI;

namespace TodoAPI.Controllers
{
      [EnableCors(origins: "http://localhost:4202", headers: "*", methods: "*")]

    [Authorize]
    public class TodolistsController : ApiController
    {
        private TaskTododbEntities db = new TaskTododbEntities();

        // GET: api/Todolists
        public IHttpActionResult GetTodolists()
        {
            var userId = User.Identity.GetUserId();

            List<Todolist> list = db.Todolists.Where(item => item.FK_AspNetUser_Id == userId).ToList();
            JArray arr = new JArray();

            foreach (var item in list)
            {
                JObject obj = JObject.FromObject(new
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    CreatedDate = item.CreatedDate,
                    ModificationDate = item.ModificationDate,
                });
                arr.Add(obj);
            }

            

            return Ok(arr);
        }

        // GET: api/Todolists/5
        [ResponseType(typeof(Todolist))]
        public IHttpActionResult GetTodolist(int id)
        {
            Todolist todolist = db.Todolists.Find(id);
            if (todolist == null)
            {
                return NotFound();
            }
            JObject obj = JObject.FromObject(new
            {
                Id = todolist.Id,
                Name = todolist.Name,
                Description = todolist.Description,
                CreatedDate = todolist.CreatedDate,
                ModificationDate = todolist.ModificationDate,
            });

            return Ok(obj);
        }

        // PUT: api/Todolists/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTodolist(int id, Todolist todolist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != todolist.Id)
            {
                return BadRequest();
            }

            Todolist oldtodolist = db.Todolists.Find(id);
            oldtodolist.Name = todolist.Name != null ? todolist.Name : oldtodolist.Name;
            oldtodolist.Description = todolist.Description != null ? todolist.Description : oldtodolist.Description;
            db.Entry(oldtodolist).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodolistExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Todolists
        [ResponseType(typeof(Todolist))]
        public IHttpActionResult PostTodolist(Todolist todolist)
        {
            var userId = User.Identity.GetUserId();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            todolist.FK_AspNetUser_Id = userId != null ? userId : null;

            db.Todolists.Add(todolist);
            db.SaveChanges();

            return Ok();
        }

        // DELETE: api/Todolists/5
        [ResponseType(typeof(Todolist))]
        public IHttpActionResult DeleteTodolist(int id)
        {
            Todolist todolist = db.Todolists.Find(id);
            if (todolist == null)
            {
                return NotFound();
            }

            db.Todolists.Remove(todolist);
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TodolistExists(int id)
        {
            return db.Todolists.Count(e => e.Id == id) > 0;
        }
    }
}