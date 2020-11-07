"""
    Given an array of integers of size 'n'.
    Our aim is to calculate the maximum sum of 'k' 
    consecutive elements in the array.

    Input  : arr[] = {100, 200, 300, 400,1000}
            k = 2
    Output : 700

    Input  : arr[] = {1, 4, 2, 10, 23, 3, 1, 0, 20}
            k = 4 
    Output : 39
    We get maximum sum by adding subarray {4, 2, 10, 23}
    of size 4.

    Input  : arr[] = {2, 3}
            k = 3
    Output : Invalid
    There is no subarray of size 3 as size of whole
    array is 2.

"""
def maxKConsecutiveSum(a,k):
    if k> len(a):
        return False
    current_sum = sum(a[:k])
    for i in range(len(a)-k):
        current_sum = max(current_sum - a[i] + a[i+k], current_sum)
    return current_sum


"""
   Consider an array of size N with all initial values as 0. 
   Perform given 'm' add operations from index 'a' to 'b' and evaluate highest element in array. 
   An add operation adds 100 to all elements from index a to b (both inclusive).

   Input : n = 5 // We consider array {0, 0, 0, 0, 0}
        m = 3.
        a = 2, b = 4.
        a = 1, b = 3.
        a = 1, b = 2.
    Output : 300

    Explanation : 
    After I operation -
    A : 0 100 100 100 0

    After II operation -
    A : 100 200 200 100 0

    After III operation -
    A : 200 300 200 100 0

    Highest element : 300
"""
def maxAfterOperations(n, m, ops):
    a = [0]*n
    for op in ops:
        a[op[0]-1] = a[op[0]-1] +1
        if op[-1] < len(a):
            a[op[-1]] = a[op[-1]] -1
    # prefix sum
    for i in range(1,len(a)):
        a[i] = a[i]+a[i-1]
    return max(a), a.index(max(a))


"""
    Range Sum Queries using Prefix Sum
    We are given an Array of n integers, We are given q queries having indices l and r . 
    We have to find out sum between the given range of indices.

    Input 
    [4, 5, 3, 2, 5]
    3
    0 3
    2 4
    1 3
    Output
    14 (4+5+3+2)
    10 (3+2+5)
    10 (5+3+2)
"""
def querySum(a, m, ops):
    prefix_sum = [0]*len(a)
    prefix_sum[0] = a[0]
    sums = []
    for i in range(1, len(a)):
        prefix_sum[i] = prefix_sum[i-1]+a[i]
    for op in ops:
        if op[0] == 0:
            sum = prefix_sum[op[1]]
        else:
            sum = prefix_sum[op[1]]-prefix_sum[op[0]-1]
        sums.append(sum)
    return sums

"""
    Equilibrium index of an array

    Equilibrium index of an array is an index such that the sum of elements at lower indexes is equal to the sum of elements at higher indexes.
    We are given an Array of integers, We have to find out the first index i from left such that -
    A[0] + A[1] + ... A[i-1] = A[i+1] + A[i+2] ... A[n-1]
    Input
    [-7, 1, 5, 2, -4, 3, 0]
    Output
    3
"""
def equilibrium(a):
    total_sum = sum(a)
    current_sum = 0
    for i in range(len(a)):
        current_target = total_sum-a[i]
        if current_target%2==0 and current_sum == int(current_target/2):
            return i
        current_sum = current_sum+a[i]    
    return current_sum


"""
    Largest Sum Subarray
    We are given an array of positive and negative integers. We have to find the subarray having maximum sum.
    Input
    [-3, 4, -1, -2, 1, 5]
    Output
    7 (4+(-1)+(-2)+1+5)
"""
def largetSubarraySumusingDP(a):
    current_sum = a[0]
    max_so_far = a[0]
    for i in range(1,len(a)):
        current_sum = current_sum + a[i]
        if current_sum < a[i]: #check: = here means we give the shortest and largest subsequence
            current_sum = a[i]
        max_so_far = max(max_so_far, current_sum)
    return max_so_far

def largetSubarraySumUsingPrefixSum(a):
    prefix_sum_array = [0]*len(a)
    prefix_sum_array[0] = a[0]
    for i in range(1,len(a)):
        prefix_sum_array[i] = prefix_sum_array[i-1]+a[i]
    r= prefix_sum_array.index(max(prefix_sum_array))
    if r == 0:
        return a[r]
    min, l = prefix_sum_array[0], 0
    for i in range(1,len(a)):
        if prefix_sum_array[i] < min and i<=r:
            min, l = prefix_sum_array[i], i
    if l==r:
        return a[l]
    return prefix_sum_array[r]-prefix_sum_array[l] if a[l] < 0 else prefix_sum_array[r]-prefix_sum_array[l-1]
    
"""
    Merge two sorted Arrays

    Input
    1 3 4 6
    2 5 7 8
    Output
    1 2 3 4 5 6 7 8
"""
def mergeSortedArrays(a,b):
    if len(a) == 0:
        return b
    elif len(b) == 0:
        return a
    lower, higher = a, b
    if a[0] >= b[0]:
        lower, higher = b, a
    l, h, i = 0, 0, 0
    c = [0]*(len(a)+len(b))
    while l<len(lower) and h<len(higher) and lower[l] <= higher[h]:
        c[i], l, i = lower[l], l+1, i+1
    if l == len(lower):
        for j in range(len(higher)):
            c[i+j] = higher[j]
        return c
    while True:
        if i==(len(a)+len(b)):
            break
        if h==len(higher):
            c[i],i,l = lower[l],i+1,l+1
        elif l==len(lower):
            c[i],i,h = higher[h],i+1,h+1
        elif lower[l]<= higher[h]:
            c[i],i,l = lower[l],i+1,l+1
        elif lower[l]>higher[h]:
            c[i],i,h = higher[h],i+1,h+1
    
    return c

"""
    Reverse in groups
"""
def reverse(a,l,r):
    for i in range(int((r-l+1)/2)):
        a[l+i], a[l+(r-l+1)-i-1] = a[l+(r-l+1)-i-1], a[l+i]
    print(a)
    
#Complete this function
def reverseInGroups(A,N,K):
    #Your code here
    for i in range(int(N/K)):
        reverse(A,i*K,(i+1)*K-1)
    if N%K!=0:
        reverse(A,int(N/K)*K,N-1)


"""
    Rotate Array
    Input:
    N = 5, D = 2
    arr[] = {1,2,3,4,5}
    Output: 3 4 5 1 2
    Explanation: 1 2 3 4 5  when rotated
    by 2 elements, it becomes 3 4 5 1 2.
"""

def reverse(A,l,N):
    for i in range(int(N/2)):
        A[l+i], A[l+N-i-1] = A[l+N-i-1], A[l+i]

def rotateArr(A,D,N):
    #Your code here
    reverse(A,0,D)
    reverse(A,D,N-D)
    reverse(A,0,N)



def maxOccured(L,R,N,maxx):
    ##Your code here
    temp = [0]*(maxx+1)
    for i in range(len(L)):
        temp[L[i]] = temp[L[i]]+1
        if(R[i]<maxx):
            temp[R[i]+1] = temp[R[i]+1]-1
    index,value = 0, 0
    for i in range(1,maxx+1):
        temp[i] = temp[i]+temp[i-1]
        if value< temp[i]:
            value = temp[i]
            index = i
    return index


"""
    Frequencies of limited range array elements
"""
def frequencycount(A,N):
    # code here
    i=0
    while True:
        if i>N-1:
            break
        if A[i]<=0:
            i=i+1
            continue
        temp = A[i]-1 #index to increment
        A[i] = A[temp] if A[temp]>0 else 0 #current value on that index to preserve
        if A[temp]>0:
            A[temp] = 0
        A[temp] = A[temp]-1
    for i in range(N):
        A[i] = -1*A[i]
    return A


"""
    Smallest positive missing number
"""
def missingNumber(arr,n):
    #Your code here
    for i in range(n):
        if arr[i]<=0 or arr[i]>n:
            arr[i]=0
    i=0
    while True:
        if i>=n:
            break
        if arr[i]<=0:
            i=i+1
            continue
        index = arr[i]
        arr[i] = arr[index-1] if arr[index-1]>0 else 0
        if arr[index-1]>0:
            arr[index-1]=0
        arr[index-1] = arr[index-1]-1
    
    for i in range(n):
        if arr[i]==0:
            return i+1
    return n+1

"""
    Rearrange array
"""
def rearrange(arr, n): 
    max_element = arr[n-1]+1
    k=0
    for i in range(n):
        if i%2==0:
            # print(arr[n-1-k]) remainder = old element , quotient = new element
            arr[i] = max_element*(arr[n-1-k]%max_element)+arr[i]
        else:
            # print(arr[k])
            arr[i] = max_element*(arr[k]%max_element)+arr[i]
            k=k+1
    for i in range(n):
        arr[i] = int(arr[i]/max_element)
    return arr

"""
    Rearrange an array with O(1) extra space
    Given an array arr[] of size N where every element is in the range from 0 to n-1. 
    Rearrange the given array so that arr[i] becomes arr[arr[i]].
    Input:
    N = 5
    arr[] = {4,0,2,1,3}
    Output: 3 4 2 0 1
"""
def arrange(arr, n): 
    #Your code here
    max = n+1
    for i in range(n):
        # new_val*max+old_val
        # new_val can get updated, to retain old value: take modulo
        arr[i] = (arr[arr[i]]%max)*max+arr[i]
    for i in range(n):
        arr[i] = int(arr[i]/max)

"""
    Maximum Index
    Given an array A[] of N positive integers. The task is to find the maximum of j - i subjected to the constraint of A[i] <= A[j].
    Input:
    N = 9
    A[] = {34,8,10,3,2,80,30,33,1}
    Output: 6
    Explanation: In the given array 
    A[1] < A[7] satisfying the required 
    condition(A[i] <= A[j]) thus giving 
    the maximum difference of j - i 
    which is 6(7-1).
"""
def maxIndexDiff(arr, n): 




if __name__=="__main__":
    # print(maxKConsecutiveSum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4))
    # print(maxKConsecutiveSum([100, 200, 30000, 400,1000], 2))
    # print(maxAfterOperations(5, 3, [[2,4],[1,3],[1,2]]))
    # print(querySum([4, 5, 3, 2, 5], 3, [[0,3],[2,4],[1,3]]))
    # print(equilibrium([-7, 1, 5, 2, -4, 3, 0]))
    # print(largetSubarraySumusingDP([-3, 4, -1, -2, 1, 5]))
    # print(largetSubarraySumUsingPrefixSum([-3, 4, -1, -2, 1, 5]))
    # print(mergeSortedArrays([1,3,4,6],[2,5,7,8]))
    # print(mergeSortedArrays([1,3,4,6],[7,8]))
    # print(mergeSortedArrays([7,8],[1,3,4,6]))
    # reverseInGroups([1,2,3,4,5], 5, 3)
    # print(maxOccured([1,4,3,1],[15,8,5,4],4,15))
    # print(frequencycount([2,3,2,3,5],5))
    # print(missingNumber([0,-10,1,3,-20],5))
    # print(missingNumber([0,1],2))
    # print(missingNumber([33, -50, 18, -34, -4, -1, -13, -29, 9, -47, 
    # 37, -29, -8, -7, 25, 27, -40, 12, 36, 20 ,47 ,43 ,-33, 11 ,-22 ,
    # -26 ,-33 ,16 ,8 ,9 ,16, 43, 9, 36, -41, 7, -15, -4 ,-20, 45, 
    # -48, -33, -34, 46, -37, 42 ,24 ,-27, -44], 49))
    # print(rearrange([1,2,3,4,5,6,7],7))
    print(arrange([4,0,2,1,3],5))