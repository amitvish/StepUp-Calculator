function calculateSIP() {
    let monthlyInvestment = parseFloat(document.getElementById('initialAmount').value);
    let stepUp = parseFloat(document.getElementById('stepUp').value) / 100;
    let annualReturnRate = parseFloat(document.getElementById('returnRate').value) / 100;
    let durationYears = parseInt(document.getElementById('duration').value);
  
    if (isNaN(monthlyInvestment) || isNaN(stepUp) || isNaN(annualReturnRate) || isNaN(durationYears)) {
      alert("Please fill in all fields with valid numbers.");
      return; // Exit the function if any input is invalid
    }
  
    const monthlyReturnRate = (1 + annualReturnRate) ** (1/12) - 1;
    let futureValue = 0;
    let totalInvestment = 0;
  
    for (let year = 1; year <= durationYears; year++) {
      for (let month = 1; month <= 12; month++) {
        futureValue += monthlyInvestment * Math.pow(1 + monthlyReturnRate, (durationYears * 12) - ((year - 1) * 12 + month));
        totalInvestment += monthlyInvestment;
      }
      monthlyInvestment += monthlyInvestment * stepUp; // Apply step-up at the end of each year
    }
  
    let estimatedReturns = futureValue - totalInvestment;
  
    // Format the numbers with commas for readability
    const formatter = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    });
  
    document.getElementById('result').innerHTML = `
      Future Value: ${formatter.format(futureValue)}<br>
      Total Investment: ${formatter.format(totalInvestment)}<br>
      Estimated Returns: ${formatter.format(estimatedReturns)}
    `;
  }
  