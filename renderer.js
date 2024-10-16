const addBtn = document.getElementById('add-btn');
const filePathInput = document.getElementById('file-path');
const fileList = document.getElementById('file-list');
const errorMessage = document.getElementById('error-message');
const finishBtn = document.getElementById('finish-btn');
let filePaths = [];

// Function to update the file list UI
function updateFileList() {
  fileList.innerHTML = '';
  filePaths.forEach((path, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${path} <button class="remove-btn" data-index="${index}">Remove</button>`;
    fileList.appendChild(li);
  });

  // Attach event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      filePaths.splice(index, 1);  // Remove file path from the array
      updateFileList();  // Refresh the list
    });
  });
}

// Function to validate file path input
function isValidFilePath(path) {
  return path.trim() !== '';  // Basic validation for non-empty input
}

// Add button click event listener
addBtn.addEventListener('click', () => {
  const filePath = filePathInput.value;

  if (isValidFilePath(filePath)) {
    errorMessage.style.display = 'none';  // Hide error message
    filePaths.push(filePath);  // Add file path to the array
    updateFileList();  // Refresh the file list
    filePathInput.value = '';  // Clear input field
  } else {
    errorMessage.style.display = 'block';  // Show error message
  }
});

// Finish button click event listener
finishBtn.addEventListener('click', () => {
  if (filePaths.length > 0) {
    const batchContent = filePaths.map(path => `start "" "${path}"`).join('\n');
    const batchFile = `@echo off\n${batchContent}`;
    const fs = require('fs');
    fs.writeFileSync('start_files.bat', batchFile);
    alert('Batch file created successfully!');
  } else {
    alert('No file paths to create a batch file.');
  }
});
