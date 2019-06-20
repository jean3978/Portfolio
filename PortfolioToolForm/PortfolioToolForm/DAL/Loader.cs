using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CsvHelper;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PortfolioToolForm.BLL;

namespace PortfolioToolForm.DAL
{
    public static class Loader
    {
        public static event Action ImportedCsv;
        private static readonly string _path;

        public static Dictionary<string, string> Fr { get; set; } = new Dictionary<string, string>();
        public static Dictionary<string, string> En { get; set; } = new Dictionary<string, string>();
        public static Data Data { get; set; }


        static Loader()
        {
            _path = ConfigurationManager.AppSettings["jsonLocation"];
        }

        public static void LoadData()
        {
            if (!Directory.Exists($"{_path}/i18n"))
                Directory.CreateDirectory($"{_path}/i18n");

            if (!File.Exists($"{_path}/i18n/en.json"))
                File.Create($"{_path}/i18n/en.json");

            if (!File.Exists($"{_path}/i18n/fr.json"))
                File.Create($"{_path}/i18n/fr.json");

            if (!File.Exists($"{_path}/data.json"))
                File.Create($"{_path}/data.json");

            var enTranslation = File.ReadAllText($"{_path}/i18n/en.json");
            var frTranslation = File.ReadAllText($"{_path}/i18n/fr.json");

            var data = File.ReadAllText($"{_path}/data.json");

            En = JsonConvert.DeserializeObject<Dictionary<string, string>>(enTranslation) ??
                 new Dictionary<string, string>();
            Fr = JsonConvert.DeserializeObject<Dictionary<string, string>>(frTranslation) ??
                 new Dictionary<string, string>();

            Data = JsonConvert.DeserializeObject<Data>(data) ?? new Data();
        }

        public static void Save()
        {
            var jsonSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            File.WriteAllText($"{_path}/i18n/en.json",
                JsonConvert.SerializeObject(En, Formatting.Indented, jsonSettings));
            File.WriteAllText($"{_path}/i18n/fr.json",
                JsonConvert.SerializeObject(Fr, Formatting.Indented, jsonSettings));
            File.WriteAllText($"{_path}/data.json",
                JsonConvert.SerializeObject(Data, Formatting.Indented, jsonSettings));
        }

        public static List<T> GetDataCollection<T>()
        {
            return GetDataCollection(typeof(T)) as List<T>;
        }

        public static IEnumerable<object> GetDataCollection(Type type)
        {
            var existingCollection = Data.GetType().GetProperties().FirstOrDefault(prop =>
            {
                var dataType = prop.GetCustomAttribute(typeof(DataType));
                return dataType != null && ((DataType) dataType).Is == type;
            });

            return existingCollection?.GetValue(Data) as IEnumerable<object>;
        }

        public static void LoadTranslationFromCSV(string path)
        {
            try
            {
                using (var reader = new StreamReader(new FileStream(path, FileMode.Open, FileAccess.ReadWrite),
                    Encoding.UTF8))
                using (var csv = new CsvReader(reader))
                {
                    csv.Configuration.PrepareHeaderForMatch = (string header, int index) => header.ToLower();
                    var records = csv.GetRecords<TranslationCSV>();

                    Fr.Clear();
                    En.Clear();

                    foreach (var record in records)
                    {
                        En.Add(record.Key, record.En);
                        Fr.Add(record.Key, record.Fr);
                    }
                }

                ImportedCsv?.Invoke();

            }
            catch (Exception ex)
            {
                MessageBox.Show("Error while importing: " + ex.Message);
            }
        }

        public static void ExportTranslationToCSV(string path)
        {
            try
            {
                if (!File.Exists(path))
                    File.Create(path).Close();

                var toExport = En.Select(kv => new TranslationCSV
                {
                    En = kv.Value,
                    Key = kv.Key,
                    Fr = Fr.ContainsKey(kv.Key) ? Fr[kv.Key] : string.Empty
                }).ToList();

                using (var writer = new StreamWriter(new FileStream(path, FileMode.Open, FileAccess.ReadWrite),
                    Encoding.UTF8))
                using (var csv = new CsvWriter(writer))
                {
                    csv.WriteRecords(toExport);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error while exporting: " + ex.Message);
            }
        }
    }
}
