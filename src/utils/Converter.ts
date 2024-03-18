import * as XLSX from 'xlsx'; // Importing the XLSX library for Excel file handling

// Async function to generate CSV data from an Excel file
export async function generateCSV(excelfile: File): Promise<Blob>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader(); // Creating a new FileReader object to read the Excel file

        reader.onload = (e) => { // Event handler for when the file is loaded
            try{
                const data = e.target?.result as ArrayBuffer; // Getting the file data as an ArrayBuffer
                const workbook = XLSX.read(data, {type: 'array'}); // Using XLSX library to read the Excel file
                const sheetName = workbook.SheetNames[0]; // Getting the name of the first sheet in the Excel file
                const worksheet = workbook.Sheets[sheetName]; // Getting the first sheet from the workbook

                // Converting the sheet data to JSON format
                const jsonData = XLSX.utils.sheet_to_json<string[]>(worksheet, {header: 1, range: 0});
                
                // Converting JSON data to CSV format
                const csvData: string[] = jsonData.map(data => {
                    return data.join(',')
                })

                // Joining CSV data into a single string with newline characters
                const csvString = csvData.join('\n');

                // Creating a Blob object with the CSV data
                const blob = new Blob([csvString], {type: 'text/csv;charset=utf-8'});

                // Resolving the Promise with the Blob containing CSV data
                resolve(blob);
            }catch(error){
                // Rejecting the Promise if there's an error
                reject(error)
            }
        }

        // Reading the Excel file as an ArrayBuffer
        reader.readAsArrayBuffer(excelfile);
    });
}