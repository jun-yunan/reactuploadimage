import { useEffect, useState } from 'react';
import styles from './App.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)


function App() {

    const [image, setImage] = useState('')
    const [allImage, setAllImage] = useState([])

    const convertToBase64 = (e) => {
        console.log(e);
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result); //base64encoded string
            setImage(reader.result)
        }
        reader.onerror = error => {
            console.log("Error: ", error);
        }
    }

    useEffect(() => {
        getImage()
    },[setImage])

    const uploadImage = () => {
        fetch("http://localhost:3001/upload-image", {
            method: "POST",
            crossDomain: true,
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                base64: image
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    const getImage = () => {
        fetch("http://localhost:3001/get-image", {method: "GET"})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllImage(data.data)
            })
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                Let's Upload Image <br/>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={convertToBase64}
                />  
                {image === "" || image === null ? "" : <img width={100} height={100} src={image} alt="" />}
                <button onClick={uploadImage}>Upload</button>

                {allImage.map((data, index) => (
                    <img key={index} width={100} height={100} src={data.image} alt="" />
                ))}
            
            
            </div>
        </div>
    );
}

export default App;