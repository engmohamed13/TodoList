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
  //  [EnableCors(origins: "http://localhost:4202", headers: "*", methods: "*")]

     //  [Authorize]
    public class TodolistsController : ApiController
    {
        private TodoAPIDBEntities db = new TodoAPIDBEntities();

        // GET: api/Todolists
        public IHttpActionResult GetTodolists()
        {
          //  var hh = Id_User;

           var userId =User.Identity.GetUserId();
            var name = User.Identity.GetUserName();

            JObject test = new JObject();
            //Where(item => item.FK_AspNetUser_Id == userId

           var listTodo=db.Todolists.OrderBy(item=>item.ModificationDate);
          


            try
            {
                return Ok( listTodo);
            }
            catch (Exception e)
            {
                return BadRequest();
            }

        }

        // GET: api/Todolists/5
        [ResponseType(typeof(Todolist))]
        public IHttpActionResult GetTodolist(int id)
        {
            var userId = User.Identity.GetUserId();
            Todolist todolist = db.Todolists.Find(id);
            if (todolist == null)
            {
                return NotFound();
            }

            return Ok(todolist);
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
            Todolist oldtodo = db.Todolists.Find(id);
            oldtodo.Name = todolist.Name != null ? todolist.Name : oldtodo.Name;
            oldtodo.Description = todolist.Description != null ? todolist.Description : oldtodo.Description;

            db.Entry(oldtodo).State = EntityState.Modified;

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
            var userId = User.Identity.Name;


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            todolist.FK_AspNetUser_Id = userId;
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