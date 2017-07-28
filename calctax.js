var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];



function testSalesData(salesData){
  var result = {};
  var totalSales = 0;
  for(var i = 0; i< salesData.length; i++) {
    for(var x = 0; x<salesData[i].sales.length; x++) {

      totalSales+=salesData[i].sales[x];
    }

    var province = salesData[i].province;

    result[province] = {};
    result[province]['name'] = salesData[i].name;
    result[province]['total'] = totalSales;
    totalSales =0;
  }
  /*

  {
    BC: { name: Telus, total: 700 },
    AB: { name: 'Bombardier', total: 800 },
    SK: { name: 'Telus', total: 600 }
  }

  */
  return result;
}

function testTax(salesData, taxRates){
  var result = {};

  var totalSales = testSalesData(salesData);

  for (var province in totalSales) {

    if (taxRates[province]) {
      var total = totalSales[province].total;
      var totalTax = taxRates[province] * total;

      var companyName = totalSales[province].name;

      if (!result[companyName]) {
        result[companyName] = totalTax;
      } else {
        result[companyName] = result[companyName] + totalTax;
      }
    }
  }

  /*
    {
      Telus: 144,
      Bombardier: 80
    }
  */
  return result;
}
// console.log(testTax(companySalesData, salesTaxRates))
function calculateSalesTax(salesData, taxRates) {
  var totalSales = testSalesData(companySalesData)
  var totalTaxes = testTax(salesData, taxRates)

  var result = {};

  for (var province in totalSales) {
    var companyName = totalSales[province].name;
    // Telus

    if (!result[companyName]) {
      result[companyName] = {};
      // result = { Telus: { } };

      result[companyName]['totalSales'] = totalSales[province].total;
      /* result =
        {
          Telus:
            {
              totalSales: 700 + 600
            },
          Bombardier:
          {
            totalSales: 800
          }
        }; */
    } else {
      result[companyName].totalSales = result[companyName].totalSales + totalSales[province].total;
    }

    // get total taxes
    /*

    totalTaxes: {
      Telus: 144,
      Bombardier: 80
    }
    totalTaxes['Telus']
    // => 144
    */
    result[companyName]['totalTaxes'] = totalTaxes[companyName];
  }
  return result;
}




var results = calculateSalesTax(companySalesData, salesTaxRates);

console.log(results)


/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/

// calculateSalesTax(companySalesData, salesTaxRates)