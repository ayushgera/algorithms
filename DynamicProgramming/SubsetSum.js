/**
 * Given a set of non-negative integers, and a value sum, determine 
 * if there is a subset of the given set with sum equal to given sum.
 * 
 * Input:  set[] = {3,5,8,1,2,7}, sum = 9
 * Output:  True  //There is a subset (1,3,5) with sum 9.
 * 
 * Extension: output all such subsets
 * Output: {1,3,5}, {1,8}, {2,7}
 **/

 // brute force : Find all possible subsets, extract those with given sum

 function subsetSumBruteForce(a, expectedSum){
    var subsetMappings={};
    var subsetSums=[];
    (function growSet(index){
        if(index>a.length-1){
            return;
        }
        var newKey= a[index].toString();
        if(index!==0){
            var currentKeys= Object.keys(subsetMappings);
            for(var i=0;i<currentKeys.length;i++){
                var currentKeysArray= (currentKeys[i].split(","));
                var sum=0;
                for(var k=0;k<currentKeysArray.length;k++){
                    sum+= parseInt(currentKeysArray[k]);
                }
                sum+= a[index];
                subsetMappings[currentKeys[i]+","+newKey]=sum;
                if(sum==expectedSum){
                    subsetSums.push(currentKeys[i]+","+newKey);
                }
            }
        }
        subsetMappings[newKey]=a[index];
        // tailed recursion.. senseless, but actually the whole function seems to be so.. :)
        growSet(index+1);
    })(0)
    console.log(JSON.stringify(subsetMappings));
    console.log(subsetSums)
 }

 subsetSumBruteForce([3,5,8,1,2,7],9);