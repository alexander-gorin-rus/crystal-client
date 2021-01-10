import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const DropZoneComponent = ({ refreshFunction }) => {

    const { user } = useSelector((state) => ({ ...state }));

    const [Images, setImages] = useState([]);

    const onDrop = files => {
        let formData = new FormData();
        const config = {
            header: {
                'content-type': 'multipart/form-data'
            }
        }
        formData.append("file", files[0]);

        axios.post(`${process.env.REACT_APP_API}/home-create-image`, formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.image]);
                    refreshFunction([...Images, response.data.image]);
                } else {
                    alert('Failed to save the Image in Server');
                }
            });
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: '300px',
                            height: '240px',
                            border: '1px solid lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <p className="h1 text-center" >X</p>
                    </div>
                )}
            </Dropzone>

            <div
                style={{
                    display: 'flex',
                    width: '350px',
                    height: '240px',
                    overflowX: 'scroll'
                }}
            >
                {/* {Images.map((image, index) => (
            <div onClick={() => onDelete(image)}>
              <img
                style={{ minWidth: '300px', width: '300px', height: '240px' }}
                src={`http://localhost:5000/${image}`}
                alt={`productImg-${index}`}
              />
            </div>
          ))} */}
            </div>
        </div>
    )
}

export default DropZoneComponent
