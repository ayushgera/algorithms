/**
 * Largest Sum Contiguous Subarray:
 * Write an efficient program to find the sum of contiguous subarray 
 * within a one-dimensional array of numbers which has the largest sum.
 * 
 * Algo has a name: Kadane's algorithm (implementation below handles negative values as well)
 * 
 * 3 implementations:
 * largestContiguousSum --> a better Kadane's handling negative values
 * largestContiguousSumWithIndices --> Kadane's which returns indices
 * largestContiguousSumRecursion --> using recursion, but needs revision
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

// following function also prints the indices
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

//largestContiguousSumWithIndices([-2, -3, 4, -1, -2, 1, 5, -4, 100]);
//console.log(largestContiguousSumRecursion(0, a.length-1));

// using recursion
function largestContiguousSumRecursion(l,h){
    if(h-l<=1){
        return Math.max(a[h],a[l])
    }
    return Math.max(largestContiguousSumRecursion(l,Math.floor((l+h)/2)),
        largestContiguousSumRecursion(Math.floor((l+h)/2)+1,h),
        largestMidContiguousSumRecursion(l ,h , Math.floor((l+h)/2)+1))
}

// revision needed for following function
function largestMidContiguousSumRecursion(l, h, mid){
    if(mid<=l){
        return -Infinity;
    }
    var currentSumLow= a[mid];
    var maxSumLow= a[mid];
    var currentSumHigh= a[mid];
    var maxSumHigh= a[mid];
    for(var i=mid-1;i>=l;i--){
        currentSumLow= a[i]+currentSumLow;
        maxSumLow= Math.max(maxSumLow, currentSumLow);
    }
    for(var i=mid+1;i<=h;i++){
        currentSumHigh= a[i]+currentSumHigh;
        maxSumHigh= Math.max(maxSumHigh, currentSumHigh);
    }
    return maxSumHigh+maxSumLow-a[mid];
}

var a= [-2, -3, 4, -1, -20, 1, 5, 100];
largestContiguousSum(a);