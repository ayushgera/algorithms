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

/**
 * sort the inital array
 * 
 * A map of [n] keys (length of main array) x [sum] values. Any entry A[i][j] is 1, if
 * there exists a subset {a[0],a[1],...a[i]} with sum = j; 0 otherwise
 * 
 * Complexity: O(nlogn + n*sum)
 */
function subsetSumDP(a, sum){
    // subset sum map
    // first key's values can be filled by comparing the number with the sum
    // since set has only 1 number, which shoes the sum
    // also sum=0 is always possible by any set, so first column has all 1
    var subsum={};
    a=a.sort(); // important, else it becomes impossible to get the lists
    // sorting not needed if only expect ouput is the length
    for(var i=0;i<a.length;i++){
        if(!subsum[a[i]]){
            subsum[a[i]]=[];
        }
        for(var j=0;j<=sum;j++){
            if(j===0){
                subsum[a[i]][j]=1;
            }else if(i===0){
                subsum[a[i]][j]=(j===a[i])?1:0;
            }else{
                // put 1 if: 
                // if previous row has 1 OR
                // sum "j-a[i]" is possible in previous row
                subsum[a[i]][j]= subsum[a[i-1]][j] || 
                    (j-a[i]>=0 ? subsum[a[i-1]][j-a[i]] : 0);
            }
        }
    }
    console.log("Result: "+Boolean(subsum[a[i-1]][sum]));
    console.log(JSON.stringify(subsum));
    var subsets=[];
    (function findsubsets(keyIndex, localSum, subsetIndex){
        if(localSum==0){
            return;
        }
        while(keyIndex>=0 && subsum[a[keyIndex]][localSum]==1){
            // sum contendor only if number is less than the sum
            if(a[keyIndex]<=localSum){
                if(!subsets[subsetIndex]){
                    subsets[subsetIndex]=[];
                }
                subsets[subsetIndex].push(a[keyIndex]);
                findsubsets(keyIndex-1, localSum-a[keyIndex], subsetIndex);
                subsetIndex++;
            }
            keyIndex--;
        }
    })(a.length-1, sum, 0)
    console.log(JSON.stringify(subsets));
}

subsetSumDP([3,5,8,1,2,7],9);