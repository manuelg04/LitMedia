/* eslint-disable no-empty */
import React, { useState } from 'react';
import { uploadPDFFile } from './../api/firebase';  // Asegúrate de que esta ruta esté correcta
import { Button, Upload, message, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const draggerProps = {
  name: 'file',
  multiple: false,
  accept: '.pdf',
  action: '', // Not required as we handle the upload manually
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const LiteraryDatabase = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(''); // Almacenamos aquí la URL del archivo subido

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      try {
        const fileUrl = await uploadPDFFile(selectedFile); // Obtenemos la URL del archivo subido
        setUploadedFileUrl(fileUrl); // Almacenamos la URL en el estado
        message.success('¡Subida exitosa!');
      } catch (error) {
        console.error('Error uploading file:', error);
        message.error('La subida del archivo falló.');
      }
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Base de datos literaria</h1>
      <Dragger {...draggerProps} beforeUpload={file => {
        setSelectedFile(file);
        return false; // Return false to not auto upload
      }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Haz click o arrastra un archivo a esta área para subirlo</p>
        <p className="ant-upload-hint">
          Asegúrate de que el archivo sea un PDF.
        </p>
      </Dragger>
      <Button type="primary" onClick={handleUpload} disabled={!selectedFile || uploading} className="mt-4">
        {uploading ? <Spin /> : 'Subir'}
      </Button>
      {uploadedFileUrl && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Descargas:</h2>
          <a href={uploadedFileUrl} download className="text-blue-500 underline">Descargar el archivo subido</a>
        </div>
      )}
    </div>
  );
}

export default LiteraryDatabase;
