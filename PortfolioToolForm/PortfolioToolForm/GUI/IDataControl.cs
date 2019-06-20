using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioToolForm.GUI
{
    interface IDataControl
    {
        bool DataLoaded { get; set; }
        void LoadData();
        void Save();
    }
}
