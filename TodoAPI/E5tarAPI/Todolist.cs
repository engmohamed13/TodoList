//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TodoAPI
{
    using System;
    using System.Collections.Generic;
    
    public partial class Todolist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> ModificationDate { get; set; }
        public string FK_AspNetUser_Id { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
    }
}
