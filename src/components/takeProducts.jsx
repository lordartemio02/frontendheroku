import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import "../style/style.css";
import { useState } from "react";
import FileUpload from "./uploadPhoto";
var url = "https://whispering-peak-01746.herokuapp.com/getProducts";
var urlAddProduct = "https://whispering-peak-01746.herokuapp.com/addProduct";
var urlUpdateProduct =
  "https://whispering-peak-01746.herokuapp.com/updateProduct";
var urlDeleteProduct =
  "https://whispering-peak-01746.herokuapp.com/deleteProduct/";
var urlGetImg = "https://whispering-peak-01746.herokuapp.com/getImg";
var urlGetDoc = "https://whispering-peak-01746.herokuapp.com/getDocument";
var urlGetVideo = "https://whispering-peak-01746.herokuapp.com/getVideo";
var urlGetAudio = "https://whispering-peak-01746.herokuapp.com/getAudio";

var productList;
var imgList;
var videoList;
var audioList;
var docList;
function TakeProducts() {
  var state = {
    name: "",
    massa: "",
    price: "",
    currency: "",
    url: "",
  };
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImg] = useState(true);
  const [isLoadingDoc, setIsLoadingDoc] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);

  function handleInputChange(event) {
    var id = event.target.id;
    var name = document.getElementById(id).value;
    // document.getElementById(inputValueId[0]).value = event.target.value;
    productList[0].name = "some";
  }
  function updateProduct(event) {
    var _Id = event.target.id;
    var Name = document
      .getElementById(_Id)
      .getElementsByClassName("name")[0].value;
    var Massa = document
      .getElementById(_Id)
      .getElementsByClassName("massa")[0].value;
    var Price = document
      .getElementById(_Id)
      .getElementsByClassName("price")[0].value;
    var Currency = document
      .getElementById(_Id)
      .getElementsByClassName("currency")[0].value;
    var Url = document
      .getElementById(_Id)
      .getElementsByClassName("url")[0].value;

    var prod = {
      name: Name,
      price: Price,
      massa: Massa,
      currency: Currency,
      url: Url,
      _id: _Id,
    };
    axios
      .put(urlUpdateProduct, {
        product: prod,
      })
      .then((res) => {
        console.log(res);
      });
  }
  function deleteProduct(event) {
    var _Id = event.target.id;

    axios.delete(urlDeleteProduct + _Id).then((res) => {
      console.log(res);
    });
  }
  function addProduct() {
    axios
      .post(urlAddProduct, {
        name: state.name,
        price: state.price,
        massa: state.massa,
        currency: state.currency,
        url: state.url,
      })
      .then((res) => {
        console.log(res);
      });
  }
  function getImg() {
    var result;
    let files = [];
    axios.get(urlGetImg).then((res) => {
      result = res.data;
      console.log(result);
      result.map((element) => {
        files.push(
          "https://whispering-peak-01746.herokuapp.com" + "/img/" + element
        );
      });

      console.log(files);
    });
  }
  function getDoc() {
    var result;
    let files = [];
    axios.get(urlGetDoc).then((res) => {
      result = res.data;
      console.log(result);
      result.map((element) => {
        files.push(
          "https://whispering-peak-01746.herokuapp.com" + "/document/" + element
        );
      });
      console.log(files);
    });
  }
  useEffect(() => {
    axios.get(url).then((res) => {
      productList = res.data;
      setIsLoading(false);
    });
    axios.get(urlGetImg).then((res) => {
      var result;
      let files = [];
      result = res.data;
      result.map((element) => {
        files.push(
          "https://whispering-peak-01746.herokuapp.com" + "/img/" + element
        );
      });
      imgList = files;
      setIsLoadingImg(false);
    });
    axios.get(urlGetVideo).then((res) => {
      var result;
      let files = [];
      result = res.data;
      result.map((element) => {
        files.push(
          "https://whispering-peak-01746.herokuapp.com" + "/video/" + element
        );
      });
      videoList = files;
      setIsLoadingVideo(false);
    });
    axios.get(urlGetDoc).then((res) => {
      var result;
      let files = [];
      result = res.data;
      result.map((element) => {
        files.push(
          "https://whispering-peak-01746.herokuapp.com" + "/document/" + element
        );
      });
      docList = files;
      setIsLoadingDoc(false);
    });
    axios.get(urlGetAudio).then((res) => {
      var result;
      let files = [];
      result = res.data;
      result.map((element) => {
        files.push(
          "https://whispering-peak-01746.herokuapp.com" + "/audio/" + element
        );
      });
      audioList = files;
      setIsLoadingAudio(false);
    });
  });
  return (
    <>
      <div>
        {isLoading ? (
          <div></div>
        ) : (
          <div className="container">
            <h1 className="h1">List of product</h1>
            {productList.map((el) => (
              <div key={el._id} id={el._id}>
                Name :{" "}
                <input
                  className="name inputField"
                  id={el._id}
                  type="text"
                  defaultValue={el.name}
                  onChange={handleInputChange}
                />
                Massa :{" "}
                <input
                  className="massa inputField"
                  id={el._id}
                  type="text"
                  defaultValue={el.massa}
                />
                Price :{" "}
                <input
                  className="price inputField"
                  id={el._id}
                  type="text"
                  defaultValue={el.price}
                />
                Currency :{" "}
                <input
                  className="currency inputField"
                  id={el._id}
                  type="text"
                  defaultValue={el.currency}
                />
                Url :{" "}
                <input
                  className="url inputField"
                  id={el._id}
                  type="text"
                  defaultValue={el.url}
                />
                <button id={el._id} onClick={updateProduct}>
                  update
                </button>
                <button id={el._id} onClick={deleteProduct}>
                  delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <form className="container">
        <h1 className="h1">Add New product</h1>
        Name :{" "}
        <input
          className="inputField"
          onChange={(e) => {
            state.name = e.target.value;
          }}
          type="text"
        />
        Massa :{" "}
        <input
          className="inputField"
          onChange={(e) => {
            state.massa = e.target.value;
          }}
          type="text"
        />
        Price :{" "}
        <input
          className="inputField"
          onChange={(e) => {
            state.price = e.target.value;
          }}
          type="text"
        />
        Currency :{" "}
        <input
          className="inputField"
          onChange={(e) => {
            state.currency = e.target.value;
          }}
          type="text"
        />
        Url :{" "}
        <input
          className="inputField"
          onChange={(e) => {
            state.url = e.target.value;
          }}
          type="text"
        />
        <button onClick={addProduct}>Add new product</button>
      </form>
      <FileUpload />
      {isLoadingImage && isLoadingAudio && isLoadingDoc && isLoadingVideo ? (
        <div></div>
      ) : (
        <div className="container flex">
          <div>
            {imgList?.map((el) => (
              <img className="image" src={el} alt="" />
            ))}
          </div>
          <div>
            <h2 className="h1">list Img</h2>
            {imgList?.map((el) => (
              <a href={el} target="_blank">
                {el}
                <br />
              </a>

            ))}
            <h2 className="h1">list Doc</h2>
            {docList?.map((el) => (
              <a href={el} target="_blank">
                {el}
                <br />
              </a>
            ))}
            <h2 className="h1">list Audio</h2>
            {audioList?.map((el) => (
              <a href={el} target="_blank">
                {el}
                <br />
              </a>
            ))}
            <h2 className="h1">list Video</h2>
            {videoList?.map((el) => (
              <a href={el} target="_blank">
                {el}
                <br />
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default TakeProducts;
