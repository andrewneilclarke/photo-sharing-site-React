import React, { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai'
import ProgressBar from './ProgressBar';

const UploadForm = () => {
const [file, setFile] = useState(null);
const [error, setError] = useState(null);

const fileTypes = ['image/png', 'image/jpeg']

    const handleUpload = (e) => {
        // get first selected file
        let selected = e.target.files[0];
        if (selected && fileTypes.includes(selected.type)) {
            setFile(selected)
            setError('');
        } else {
            setFile(null); 
            setError('Please select a valid image file (*png or *jpeg)');
        }
    }
    return (
        <form>
            <label class="custom-file-upload"><AiOutlineUpload />
            <input type="file" className="file-upload" onChange={handleUpload} />
            </label>
            <div className="output">
                { error && <div className="error"> {error} </div> }
                { file && <div> {file.name} </div> }
                { file && <ProgressBar file={file} setFile={setFile} /> }
            </div>
        </form>
    )
}

export default UploadForm
