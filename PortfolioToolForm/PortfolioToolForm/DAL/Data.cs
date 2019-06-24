using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PortfolioToolForm.BLL;

namespace PortfolioToolForm.DAL
{
    public class Data
    {
        [DataType(Is = typeof(Project))]
        public List<Project> Projects { get; set; } = new List<Project>();


        [DataType(Is = typeof(Categorie))]
        public List<Categorie> Categories { get; set; } = new List<Categorie>();

        [DataType(Is = typeof(CreditCategorie))]
        public List<CreditCategorie> CreditCategories { get; set; } = new List<CreditCategorie>();
        

        [DataType(Is = typeof(Credit))]
        public List<Credit> Credits { get; set; } = new List<Credit>();

        [DataType(Is = typeof(ProjectTask))]
        public List<ProjectTask> ProjectTasks { get; set; } = new List<ProjectTask>();
    }
    

    public class Project
    {
        public string Key { get; set; }
        public string KTitle { get; set; }

        [Translate]
        public string KSubtitle { get; set; }
        [Translate]
        public string KDescription { get; set; }

        [Translate]
        public string Duration { get; set; }
        
        public string Date { get; set; }
        public string SrcImage { get; set; }
        public string SrcLogo { get; set; }
        public string SrcVideo { get; set; }
        public string ImageCount { get; set; }
        public string TechLogos { get; set; }

        [Relation(With = typeof(Categorie))]
        public string Categorie { get; set; }
    }

    public class Categorie
    {
        public string Key { get; set; }

        [Translate]
        public string KName { get; set; }

        public string Order { get; set; }
    }

    public class ProjectTask
    {
        public string Key { get; set; }

        [Translate]
        public string Description { get; set; }

        [Relation(With = typeof(Project))]
        public string Project { get; set; }
    }

    public class CreditCategorie
    {
        public string Key { get; set; }

        [Translate]
        public string KName { get; set; }
    }
    
    public class Credit
    {
        public string Key { get; set; }
        
        [Relation(With = typeof(Project))]
        public string Project { get; set; }

        [Relation(With = typeof(CreditCategorie))]
        public string Categorie { get; set; }
    }
    
    public class TranslationOnTheFly
    {
        public TranslationOnTheFly(string key)
        {
            En = Loader.En.ContainsKey(key) ? Loader.En[key] : "### INVALID ###";
            Fr = Loader.Fr.ContainsKey(key) ? Loader.Fr[key] : "### INVALID ###";
        }
        public string En { get; set; }
        public string Fr { get; set; }
        public override string ToString()
        {
            return string.Join(";", En, Fr);
        }
    }

    public class TranslationCSV
    {
        public string Key { get; set; }
        public string Fr { get; set; }
        public string En { get; set; }
    }
}
