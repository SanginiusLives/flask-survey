function countZeroes (arr) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            count++
        }
    }
    return count;
}


function sortedFrequency (arr, seek) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === seek) {
            count++
        } 
    }
    return count;
}

function findRotatedIndex(array, num) {
    var pivot = findPivot(array)
    if (pivot > 0 && num >= array[0] && num <= array[pivot - 1]) {
      return binarySearch(array, num, 0, pivot - 1);
    } else {
      return binarySearch(array, num, pivot, array.length - 1);
    }
  }
  
  function binarySearch(array, num, start, end) {
    if (array.length === 0) return -1;
    if (num < array[start] || num > array[end]) return -1;
  
    while (start <= end) {
      var mid = Math.floor((start + end) / 2);
      if (array[mid] === num) {
        return mid;
      } else if (num < array[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return -1;
  }
  
  function findPivot(arr) {
    if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;
    var start = 0
    var end = arr.length - 1;
    while (start <= end) {
      var mid = Math.floor((start + end) / 2);
      if (arr[mid] > arr[mid + 1]) return mid + 1
      else if (arr[start] <= arr[mid]) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }
  }

  function findRotationCount(arr, low = 0, high = arr.length - 1) {
    if (high < low) return 0;
    if (high === low) return low;
    let mid = Math.floor((low + high) / 2)
  
    if (mid < high && arr[mid + 1] < arr[mid])
      return mid + 1;
  
    if (mid > low && arr[mid] < arr[mid - 1]) {
      return mid;
    }
  
    if (arr[high] > arr[mid]) {
      return findRotationCount(arr, low, mid - 1);
    }
  
    return findRotationCount(arr, mid + 1, high);
  }
  
  function findFloor(arr, num, low = 0, high = arr.length - 1) {
    if (low > high) return -1;
    if (num >= arr[high]) return arr[high];
  
    let mid = Math.floor((low + high) / 2)
  
    if (arr[mid] === num) return arr[mid];
  
    if (mid > 0 && arr[mid - 1] <= num && num < arr[mid]) {
      return arr[mid - 1];
    }
  
    if (num < arr[mid]) {
      return findFloor(arr, num, low, mid - 1);
    }
  
    return findFloor(arr, num, mid + 1, high)
  }