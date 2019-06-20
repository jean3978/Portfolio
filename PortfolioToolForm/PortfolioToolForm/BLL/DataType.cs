using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioToolForm.BLL
{
    public class DataType: Attribute
    {
        public Type Is { get; set; }
    }
}
