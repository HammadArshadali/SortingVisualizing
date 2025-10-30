// Selecting HTML elements
const algorithmSelect = document.getElementById('algorithm');
const generateButton = document.getElementById('generate');
const sortButton = document.getElementById('sort');
const barsContainer = document.getElementById('bars-container');

// Function to generate a random array
function generateArray() {
  const array = [];
  const arraySize = 50;
  const maxBarHeight = 300;

  for (let i = 0; i < arraySize; i++) {
    const randomHeight = Math.floor(Math.random() * maxBarHeight) + 1;
    array.push(randomHeight);
  }

  displayArray(array);
}

// Function to display the array as bars
function displayArray(array) {
  barsContainer.innerHTML = '';

  array.forEach((height, index) => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    bar.style.backgroundColor = '#3498db';
    barsContainer.appendChild(bar);
  });
}

// Adding event listeners to buttons
generateButton.addEventListener('click', generateArray);
sortButton.addEventListener('click', sortArray);

// Function to perform Bubble Sort
async function bubbleSort(array) {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const bar1 = barsContainer.children[j];
      const bar2 = barsContainer.children[j + 1];

      bar1.classList.add('comparing');
      bar2.classList.add('comparing');

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        await sleep(100);
        displayArray(array);
      }

      bar1.classList.remove('comparing');
      bar2.classList.remove('comparing');
    }
  }

  array.forEach((_, index) => {
    barsContainer.children[index].classList.add('sorted');
  });
}

// Function to perform Quick Sort
async function quickSort(array, left, right) {
  if (left < right) {
    const partitionIndex = await partition(array, left, right);
    await quickSort(array, left, partitionIndex - 1);
    await quickSort(array, partitionIndex + 1, right);
  }
}

// Function to partition the array
async function partition(array, left, right) {
  const pivot = array[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    const bar1 = barsContainer.children[j];
    const bar2 = barsContainer.children[right];

    bar1.classList.add('comparing');
    bar2.classList.add('comparing');

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      await sleep(100);
      displayArray(array);
    }

    bar1.classList.remove('comparing');
    bar2.classList.remove('comparing');
  }

  [array[i + 1], array[right]] = [array[right], array[i + 1]];
  await sleep(100);
  displayArray(array);

  return i + 1;
}

// Function to perform Merge Sort
async function mergeSort(array, left, right) {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);
    await mergeSort(array, left, middle);
    await mergeSort(array, middle + 1, right);
    await merge(array, left, middle, right);
  }
}

// Function to merge two subarrays
async function merge(array, left, middle, right) {
  const n1 = middle - left + 1;
  const n2 = right - middle;

  const L = array.slice(left, left + n1);
  const R = array.slice(middle + 1, middle + 1 + n2);

  let i = 0, j = 0, k = left;

  while (i < n1 && j < n2) {
    const bar1 = barsContainer.children[k];
    const bar2 = barsContainer.children[k + 1];

    bar1.classList.add('comparing');
    bar2.classList.add('comparing');

    if (L[i] <= R[j]) {
      array[k] = L[i];
      i++;
    } else {
      array[k] = R[j];
      j++;
    }

    await sleep(100);
    displayArray(array);

    bar1.classList.remove('comparing');
    bar2.classList.remove('comparing');

    k++;
  }

  while (i < n1) {
    array[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    array[k] = R[j];
    j++;
    k++;
  }

  await sleep(100);
  displayArray(array);
}

// Function to handle the Sort button click
async function sortArray() {
  const algorithm = algorithmSelect.value;
  const array = Array.from(barsContainer.children).map(bar => parseInt(bar.style.height));

  if (algorithm === 'bubble') {
    await bubbleSort(array);
  } else if (algorithm === 'quick') {
    await quickSort(array, 0, array.length - 1);
  } else if (algorithm === 'merge') {
    await mergeSort(array, 0, array.length - 1);
  }

  array.forEach((_, index) => {
    barsContainer.children[index].classList.add('sorted');
  });
}

// Function to introduce a delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}