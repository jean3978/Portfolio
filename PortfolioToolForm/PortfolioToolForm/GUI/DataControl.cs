using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using PortfolioToolForm.BLL;
using PortfolioToolForm.DAL;

namespace PortfolioToolForm.GUI
{
    public partial class DataControl<T> : UserControl, IDataControl
    {
        public bool DataLoaded { get; set; }

        private Dictionary<string, PropertyInfo> _properies = new Dictionary<string, PropertyInfo>();
        private Dictionary<DataGridViewComboBoxColumn, Relation> _relationColumns = new Dictionary<DataGridViewComboBoxColumn, Relation>();

        public DataControl()
        {
            InitializeComponent();

            dataGridView1.Columns.Clear();

            foreach (var property in typeof(T).GetProperties())
            {
                var relation = (Relation)property.GetCustomAttribute(typeof(Relation));
                if (relation == null)
                {
                    dataGridView1.Columns.Add(new DataGridViewTextBoxColumn { HeaderText = property.Name, Name = property.Name });
                }
                else
                {
                    var column = new DataGridViewComboBoxColumn {HeaderText = property.Name, Name = property.Name};
                    _relationColumns.Add(column, relation);
                    dataGridView1.Columns.Add(column);
                }

                _properies.Add(property.Name, property);
            }
        }

        private void FillRelationColumns()
        {
            foreach (var relationColumn in _relationColumns)
            {
                relationColumn.Key.Items.Clear();
                List<string> items = new List<string>();
                
                var collection = Loader.GetDataCollection(relationColumn.Value.With);
                var keyProp = relationColumn.Value.With.GetProperty("Key");

                foreach (var item in collection)
                {
                    var value = (string) keyProp?.GetValue(item);
                    items.Add(value);
                    if (value != null)
                        relationColumn.Key.Items.Add(value);
                }
            }
        }

        public void LoadData()
        {
            Loader.LoadData();

            dataGridView1.Rows.Clear();

            FillRelationColumns();
            
           var collection = Loader.GetDataCollection<T>();

            var keyProp = typeof(T).GetProperty("Key");

            if (keyProp != null)
                collection.Sort((t1, t2) => ((IComparable)keyProp.GetValue(t1, null)).CompareTo(keyProp.GetValue(t2, null)));
            
            collection?.ForEach(row =>
            {
                string[] values = new string[_properies.Count];

                int i = 0;
                foreach (var prop in _properies)
                {
                    if (prop.Value.GetCustomAttribute<Translate>() != null)
                    {
                        values[i] = TranslationOnTheFly(prop.Value.GetValue(row)?.ToString()) ?? string.Empty;
                    }
                    else
                    {
                        values[i] = prop.Value.GetValue(row)?.ToString();
                    }

                    i++;
                }

                dataGridView1.Rows.Add(values);
            });


            DataLoaded = true;
        }

        public void Save()
        {
            if (!DataLoaded) return;

            var collection = Loader.GetDataCollection<T>();
            collection.Clear();

            for (int i = 0; i < dataGridView1.RowCount; i++)
            {
                var item = (T)Activator.CreateInstance(typeof(T));

                if (dataGridView1.Rows[i].Cells["Key"].Value == null)
                    continue;

                var key = dataGridView1.Rows[i].Cells["Key"].Value.ToString();

                foreach (var prop in _properies)
                {
                    if (prop.Value.GetCustomAttribute<Translate>() != null)
                    {
                        var translationKey = $"{typeof(T).Name.ToLower()}.{key}.{prop.Key.ToLower()}";
                        AddTranslation(translationKey, dataGridView1.Rows[i].Cells[prop.Key]?.Value?.ToString());
                        prop.Value.SetValue(item, translationKey);
                    }
                    else
                    {
                        prop.Value.SetValue(item, dataGridView1.Rows[i].Cells[prop.Key].Value?.ToString() ?? "");
                    }

                }
                collection.Add(item);
            }

            Loader.Save();

            LoadData();
        }

        private void AddTranslation(string key, string value)
        {
            if (value == null)
                value = string.Empty;

            var values = value.Split(';');

            if (values.Length == 1)
                values = new[] { values[0], "MISSING"};

        
            if (!Loader.En.ContainsKey(key))
                Loader.En.Add(key, values[0]);
            else
                Loader.En[key] = values[0];

            if (!Loader.Fr.ContainsKey(key))
                Loader.Fr.Add(key, values[1]);
            else
                Loader.Fr[key] = values[1];
        }

        private string TranslationOnTheFly(string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                return string.Empty;
            }
            var en = Loader.En.ContainsKey(key) ? Loader.En[key] : "### INVALID ###";
            var fr = Loader.Fr.ContainsKey(key) ? Loader.Fr[key] : "### INVALID ###";
            return string.Join(";", en, fr);
        }

        private void dataGridView1_CellValueChanged(object sender, DataGridViewCellEventArgs e)
        {
            //Save();
        }
    }
}
