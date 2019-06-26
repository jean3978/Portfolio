using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using PortfolioToolForm.DAL;
using PortfolioToolForm.GUI;

namespace PortfolioToolForm
{
    public partial class Form1 : Form
    {
        private List<IDataControl> _dataControls = new List<IDataControl>();
        private IDataControl _currentControl = null;

        public Form1()
        {
            InitializeComponent();

            _dataControls.Add(translationControl1);
            AddDataControl<Project>();
            AddDataControl<Categorie>();
            AddDataControl<CreditCategorie>();
            AddDataControl<Credit>();
            AddDataControl<ProjectTask>();
            AddDataControl<SkillCategorie>();
            AddDataControl<Skill>();

            Loader.LoadData();
            
            _dataControls.ForEach(d => d.LoadData());
        }

        private void tabControl1_TabIndexChanged(object sender, EventArgs e)
        {
            _currentControl?.Save();

            _dataControls.ForEach(d =>
                {
                    d.DataLoaded = false;
                    d.LoadData();
                }
            );

            foreach (var control in tabControl1.SelectedTab.Controls)
            {
                _currentControl = control as IDataControl;


                if (_currentControl != null)
                {
                    _currentControl = (IDataControl) control;
                    break;
                }
            }
        }

        protected override void OnClosing(CancelEventArgs e)
        {
            base.OnClosing(e);

            translationControl1.Save();
            _dataControls.ForEach(d => d.Save());
        }

        private void AddDataControl<T>()
        {
            var page = new TabPage(typeof(T).Name)
            {
                Dock = DockStyle.Fill,
                AutoSize = true,
                AutoSizeMode = AutoSizeMode.GrowAndShrink
            };
            tabControl1.TabPages.Add(page);

            var dataControl = new DataControl<T>
            {
                Dock = DockStyle.Fill,
                AutoSize = true,
                AutoSizeMode = AutoSizeMode.GrowAndShrink
            };

            _dataControls.Add(dataControl);
            page.Controls.Add(dataControl);
        }
    }
}
