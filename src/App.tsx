import "./utils/Firebase"
import { ChangeEvent, useState } from "react";
import { Button } from "./components/Button"
import { generateCSV } from "./utils/Converter";
import { Title } from "./components/Title";

export const App = () => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if(selectedFile){
      setExcelFile(selectedFile);
    }
  }

  // Function to handle CSV creation when a form is submitted
  const handleCsvCreation = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Preventing the default form submission behavior

  if (excelFile) { // Checking if an Excel file is selected
      generateCSV(excelFile) // Generating CSV data from the Excel file
          .then((csvContent) => { // Handling the resolved Promise with the CSV content
              // Creating a download link for the CSV file
              const link = document.createElement('a');
              link.href = URL.createObjectURL(csvContent); // Setting the link's href to the CSV data
              link.download = excelFile.name.replace('.xlsx', '.csv').replace('.xls', '.csv'); // Setting the download filename

              document.body.append(link); // Appending the link to the document body
              link.click(); // Programmatically clicking the link to trigger the download
              document.body.removeChild(link); // Removing the link from the document after download
          })
          .catch((error) => { // Handling any errors that occur during CSV generation
              console.error("Error converting Excel file to CSV: ", error); // Logging the error to the console
          });
  }
}
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-200 w-screen h-screen flex flex-col justify-center items-center gap-y-2">
      <Title />
      <form className="flex flex-col gap-y-2 items-center" onSubmit={handleCsvCreation}>
        <input
          type="file" 
          accept=".xls, .xlsx" 
          required 
          onChange={handleFileChange} 
        />
        <Button title="Convert" isExcel={excelFile ? true : false}/>
      </form>
    </div>
  )
}
