/**
 * Largest Sum Contiguous Subarray:
 * Write an efficient program to find the sum of contiguous subarray 
 * within a one-dimensional array of numbers which has the largest sum.
 * 
 * Algo has a name: Kadane's algorithm (implementation below handles negative values as well)
 **/

 function largestContiguousSum(a){
    var currentSum= a[0];
    var maximumTillNow= a[0];
    for(var i=1;i<a.length;i++){
        currentSum= Math.max(a[i]+currentSum,a[i]);
        maximumTillNow= Math.max(maximumTillNow, currentSum);
    }
    console.log(maximumTillNow);
 }

 function largestContiguousSumWithIndices(a){
    var currentSum= a[0];
    var maximumTillNow= a[0];
    var start=0; 
    var end=0;
    for(var i=1;i<a.length;i++){
        // if a[i]+currentSum < a[i], we would want to update the start index, since we found 
        // a way to increase the sum. But but.. 
        // if current sum was already bigger, then we dont update starte index 
        if(a[i]>(a[i]+currentSum) && currentSum<a[i]){
            start= i;
            end= Math.max(start,end);
        }
        currentSum= Math.max(a[i]+currentSum,a[i]);
        if(currentSum > maximumTillNow){
            end= i;
        }
        maximumTillNow= Math.max(maximumTillNow, currentSum);
    }
    console.log(maximumTillNow, start, end);
 }

 largestContiguousSumWithIndices([-2, -3, 4, -1, -2, 1, 5, -4, 100]);