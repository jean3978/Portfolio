using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using PortfolioToolForm.DAL;

namespace PortfolioToolForm.GUI
{
    public partial class TranslationControl : UserControl, IDataControl
    {
        public bool DataLoaded { get; set; }

        public TranslationControl()
        {
            InitializeComponent();

            Loader.ImportedCsv += FillData;
        }
        
        public void LoadData()
        {
            Loader.LoadData();
            FillData();
        }

        private void FillData()
        {
            dataGridView1.Rows.Clear();

            var keys = Loader.Fr.Keys.OrderBy(k => k);
            foreach (var key in keys)
            {
                dataGridView1.Rows.Add(key, Loader.En[key], Loader.Fr[key]);
            }

            DataLoaded = true;

        }

        public void Save()
        {
            if (!DataLoaded)
                return;

            Loader.Fr.Clear();
            Loader.En.Clear();

            for (int i = 0; i < dataGridView1.RowCount; i++)
            {
                if (dataGridView1.Rows[i].Cells[0].Value == null)
                    continue;

                var key = dataGridView1.Rows[i].Cells[0].Value?.ToString();
                var en = dataGridView1.Rows[i].Cells[1].Value?.ToString();
                var fr = dataGridView1.Rows[i].Cells[2].Value?.ToString();

                Loader.En.Add(key, en);
                Loader.Fr.Add(key, fr);
            }

            Loader.Save();
            LoadData();
        }

        private void dataGridView1_CellValueChanged(object sender, DataGridViewCellEventArgs e)
        {
            //Save();
        }

        private void btnImport_Click(object sender, EventArgs e)
        {
            var ofd = new OpenFileDialog{Filter = "csv files (*.csv)|*.csv" };

            if (ofd.ShowDialog() == DialogResult.OK)
                Loader.LoadTranslationFromCSV(ofd.FileName);
        }

        private void btnExport_Click(object sender, EventArgs e)
        {
            var ofd = new SaveFileDialog { Filter = "csv files (*.csv)|*.csv" };

            if (ofd.ShowDialog() == DialogResult.OK)
                Loader.ExportTranslationToCSV(ofd.FileName);
        }
    }
}