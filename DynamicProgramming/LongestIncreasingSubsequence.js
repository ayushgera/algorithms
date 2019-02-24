/**
 * The Longest NON DECREASING Subsequence problem is to find the length 
 * of the longest subsequence of a given sequence such that all elements of 
 * the subsequence are sorted in increasing order. For example, the length of 
 * LIS for {10, 22, 9, 33, 21, 50, 41, 60, 80} is 6 and LIS is 
 * {10, 22, 33, 50, 60, 80}.
 * 
 * Input  : arr[] = {3, 10, 2, 1, 20}
 * Output : Length of LIS = 3
 * The longest NON DECREASING subsequence is 3, 10, 20
 * 
 * Input : arr[] = {50, 3, 10, 7, 40, 80}
 * Output : Length of LIS = 4
 * The longest NON DECREASING subsequence is {3, 7, 40, 80}
 **/

 // brute force : O(n^2)

 function findLISBrute(a){
    var increasingSequences=[];
    var alreadyIncludedNumIndices=[];
    for(var i=0;i<a.length-1;i++){
        // we had saved the index of the number that was already included in an NON DECREASING sequence.
        // And because any sequence starting from this number would be contained by a  
        // sequence already, we can skip the iteration if this index is covered already
        if(alreadyIncludedNumIndices.indexOf(i)!==-1){
            continue;
        }
        var sequence=[a[i]];
        var currSeqLength=1;
        for(var j=i+1;j<a.length;j++){
            if(a[j]>=sequence[currSeqLength-1]){
                sequence.push(a[j]);
                alreadyIncludedNumIndices.push(j);
                currSeqLength++;
            }
        }
        increasingSequences.push(sequence);
    }
    console.log(increasingSequences.join("\n"));
 }

 findLISTBruteDP([10, 22, 9, 33, 21, 50, 41, 60, 80])

// DP : O(n^2))
/**
 * we maintain an array such that, each elemnt at index i, represents the count of 
 * the subsequence till the element in original array a[i]
 * 
 * t[i]= max(t[i],1+t[j]) for all 0<j<i
 * 
 *      j  i
 * a= [10 22 9 33 21 50 41 60 80]
 * t= [ 1  1 1  1  1  1  1  1  1]
 */
function findLISTBruteDP(a){
    var increasingSequence= [];
    // intialise all with ones (the sequence will atleast be that number)
    for(var i=0; i<a.length; i++){
        increasingSequence.push(1);
    }
    for(var i=1;i<a.length;i++){
        for(var j=0;j<i;j++){
            if(a[i]>=a[j]){
                increasingSequence[i]= Math.max(increasingSequence[i],increasingSequence[j]+1);
            }
        }
    }
    console.log(increasingSequence + " Max: "+ Math.max.apply(null,increasingSequence));
    // find the longest sequence
    // for the sake of simplicity, we'll consider only 1 max value
    // there can be multiple sequences of same length
    var end= Math.max.apply(null,increasingSequence);
    var sequence=[];
    sequence.push(a[increasingSequence.indexOf(end)]);
    // not end is not the index, but the max value till an index
    while(end>1){
        sequence.push(a[increasingSequence.indexOf(--end)]);
    }
    console.log(sequence.reverse());
}

