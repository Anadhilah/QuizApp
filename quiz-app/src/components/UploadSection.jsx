import React from 'react';
import { Upload } from 'lucide-react';

function UploadSection({ selectedFile, handleFileChange }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-12">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <Upload className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">Generate Custom Quiz</h3>
          <p className="text-gray-600 mb-6">
            Upload your document and we'll create personalized questions
          </p>
          <label className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
            Upload Document
          </label>
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadSection;
