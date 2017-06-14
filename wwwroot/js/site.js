// Write your Javascript code.


/**
 * @ngdoc overview
 * @name demoCalApp
 * @description
 * # demoCalApp
 *
 * Main module of the application.
 */
var app = angular.module('demoCalApp', []);


app.controller('smpIntCalCtrl',function($scope){
     console.log('Main controller');

    $scope.calData = {
        "loanAmount":15000,
        "loanTerm":60,
        "loanTermType":"months",
        "interestRate":"3.0", //0.625
        "salesTaxRate":".07",
        "paymentDate":"05/17/2017",
        "daysLate":21,
        "daysLateType":"days",
        "latePayments":1
    };
     $scope.amoPmtData = [];

    $scope.init = function(){
        $scope.loanAmount = $scope.calData.loanAmount;
        $scope.loanRate = $scope.calData.interestRate;
        $scope.loanTerm =  $scope.calData.loanTerm ;
        $scope.salesTax = $scope.calData.salesTaxRate;
    },
    $scope.getMonthPmt = function(){
        //$scope.loanMoPmt =  ($scope.loanAmount / $scope.loanTerm);
        //$scope.loanMoPmt =   parseInt(($scope.loanAmount / $scope.loanTerm) + ($scope.loanRate)).toFixed(3);
        //console.debug("  $scope.loanMoPmt: " +   $scope.loanMoPmt);
            var P = $scope.loanAmount;
    var r = ($scope.loanRate/12)/100;
    var N = $scope.loanTerm;

    //console.debug("P= " + P);
    //console.debug("r= " + r);
    //  console.debug("N= " + N);
    $scope.loanMoPmt = P*(r*Math.pow(1+r,N))/(Math.pow(1+r,N)-1);
    return $scope.loanMoPmt;
    },

    $scope.getCalInterest = function(){
        var t =($scope.loanMoPmt * 60)-15000;
 var z= ($scope.loanRate/100)/12; //monthly rate

 var y = z * $scope.loanAmount;
 console.debug("t: " + t);
 console.debug("z: " + z);
     console.debug("y: " + y); //correct interest
y +=y;
  $scope.totalInterest = parseFloat(t).toFixed(2);
  // = ($scope.loanAmount *y)*z;
    // $scope.totalInterest =   ($scope.loanAmount * ((($scope.loanRate/100)/12)) * $scope.loanTerm) ;
         // console.debug("$scope.totalInterest: " + $scope.totalInterest);
    },
    $scope.getCalSalesTax = function(){
        $scope.totalSalesTax = parseInt(($scope.loanAmount * $scope.salesTax)).toFixed(2);
    //  console.debug(" $scope.totalSalesTax: " +   $scope.totalSalesTax);
    },
     $scope.getTotal60Payment = function(){
        $scope.total60Pmt  = ($scope.loanMoPmt * 60);
    //  console.debug(" $scope.total60Pmt: " +   $scope.total60Pmt);
    },
    $scope.getTotalCost = function(){
        // var P = 25000;
    // var r = (6.5/100)/12 ;
    // var N = $scope.loanTerm;
    // var M = 60*((r*P)/ (1-(1+r))^-60);

    // console.debug("P= " + P);
    // console.debug("r= " + r);

    $scope.totalCost = 16171.82+1171.82;
    // $scope.loanMoPmt = P*(r*Math.pow(1+r,N))/(Math.pow(1+r,N)-1);
    }
    $scope.getAmoTableVal = function(){

        $scope.init();
          $scope.moPmt = $scope.getMonthPmt();


    $scope.monthlyRate = ($scope.calData.interestRate/100)/12;
    $scope.monthlyInt =  $scope.calData.loanAmount * $scope.monthlyRate;
    $scope.prinPmt = $scope.moPmt -$scope.monthlyInt;
    $scope.newPrinAmt = $scope.calData.loanAmount - $scope.prinPmt;
     console.debug(" $scope.monthlyRate:"+  $scope.monthlyRate);
     console.debug(" $scope.monthlyInt:"+  $scope.monthlyInt);
     console.debug(" $scope.prinPmt :"+  $scope.prinPmt );
     console.debug(" $scope.newPrinAmt :"+  $scope.newPrinAmt );
         $scope.test=$scope.calData.loanAmount;
          $scope.originalTest=$scope.calData.loanAmount;

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var month = 0;
        for(var i=0; i < $scope.calData.loanTerm ; i++){

            var x = i; //or whatever offset
            var CurrentDate = new Date();
            CurrentDate.setMonth(CurrentDate.getMonth() + i);
            var date = new Date(CurrentDate);


            $scope.monthlyRate = ($scope.calData.interestRate/100)/12; //months interest
            //     console.debug(" $scope.monthlyRate:"+  $scope.monthlyRate);
            $scope.monthlyInt =  $scope.test * $scope.monthlyRate;


$scope.test  -=   $scope.moPmt;



             $scope.pmt =  $scope.moPmt - $scope.monthlyInt;   //new principal for

              var z= ($scope.loanRate/100)/12; //monthly rate


    $scope.intTotal = $scope.monthlyInt;
        $scope.intTotal =   $scope.intTotal * i++;

      $scope.amoPmtData.push({
                 date: (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(),
                 intAmt: parseInt($scope.monthlyInt).toFixed(2),
                 balanceAmt: parseInt($scope.test).toFixed(2),
                pmtAmt:  parseInt($scope.getMonthPmt()).toFixed(2),
                principalPmt: parseInt($scope.getMonthPmt()).toFixed(2)  -parseInt($scope.monthlyInt).toFixed(2),
                totalIntAmt:$scope.intTotal
     });


        }

    },

    $scope.getAmoTableVal();
    $scope.calculate = function(){
        console.debug("start: calculating..");
        $scope.init();
        $scope.getMonthPmt();
        $scope.getCalInterest();
        $scope.getCalSalesTax();
        $scope.getTotal60Payment();
        $scope.totalCost = 16171.82+1171.82;
        console.debug("end: calculating..");
    }

});
