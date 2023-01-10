import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowHeaders } from "../features/global";
import { BiCar } from 'react-icons/bi';
import { MdMeetingRoom } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import ImageSlider from "./ImageSlider";
import { useState } from "react";
import { WeatherViewer } from '../../src/components/WeatherViewer';
import axios from 'axios';



const Home = () => {
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      Navigate("/login", { replace: true });
    } else {
      dispatch(setShowHeaders(true));
    }

  });


  

  const slides = [  
    { url:"image-1.jpg", title: "PROLOGIC" },
    { url: "image-2.jpg", title: "PROLOGIC" },
    { url: "image-3.jpg", title: "PROLOGIC" },
    { url: "image-4.jpg", title: "PROLOGIC" },
    { url: "image-5.jpg", title: "PROLOGIC" },
    { url: "image-6.jpg", title: "PROLOGIC" },
    { url: "image-7.jpg", title: "PROLOGIC" },
    { url: "image-8.jpg", title: "PROLOGIC" },
  ];
 
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  const [citySearch, setCitySearch] = useState('');
  const [cityData, setCityData]=useState(null);

  // city search form
  const fetchCity = (e) =>{
    e.preventDefault();
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=AGiESKtZI2dkCA84qbsAo3GNOiGkjBb4&q=${citySearch}`)
    .then((res)=>{
      setCityData(res.data[0]);
      setCitySearch('');
    }).catch(err=>console.log(err.message));
  }


  return (
  <div style ={{marginTop: "10px"}} className='w-full h-full flex flex-col'>
          <div className="w-100 h-60 mt-5  " style={containerStyles}>
        <ImageSlider slides={slides} autoPlay={3} />
      </div>
<br></br>
      <div className="w-full flex flex-row pt-4 px-2">
        <div className="w-1/3 px-2">
          <div className="w-full h-40 bg-white rounded shadow-xl">
            <p className="text-xl font-bold text-gray-600 py-4 px-2">Vehicle</p>
            <div className="w-full flex justify-between px-4">
            <p className="text-lg font-bold text-gray-600 "></p>
            <BiCar  size={30} />
            </div>
          </div>
        </div>
        
        <div className="w-1/3 px-2">
          <div className="w-full h-40 bg-white rounded shadow-xl">
            <p className="text-xl font-bold text-gray-600 py-4 px-2 ">Confirance Rooms</p>
            <div className="w-full flex justify-between px-4">
            <p className="text-lg font-bold text-gray-600 "></p>
            <MdMeetingRoom  size={30} />
            </div>
          </div>
        </div>
        <div className="w-1/3 px-2">
          <div className="w-full h-40 bg-white rounded shadow-xl">
            <p className="text-xl font-bold text-gray-600 py-4 px-2 ">Technician</p>
            <div className="w-full flex justify-between px-4">
            <p className="text-lg font-bold text-gray-600 "></p>
            <FiUser  size={30} />
            </div>
          </div>
        </div>


        </div>


     <br></br>



      <div style={{width:"50%",height:"30%"}} className="wrapper bodySun ">
      <h1 className="headline">Météo</h1>
      <form className='form-group custom-form' autoComplete='off'
      onSubmit={fetchCity}>
        <label>Search for a city to get weather </label>
        <div className='search-box'>
          <input className='form-control' required placeholder='Enter city name...'
          value={citySearch} onChange={(e)=>setCitySearch(e.target.value)}/>
          <button type='submit' className="btn btn-secondary btn-sm">
          </button>
        </div>
      </form>
      {cityData&& <div style={{padding:10+'px', width: 100+'%'}}><WeatherViewer cityData={cityData}/></div>}
    </div>
   </div>
   
     
    
  )
}
export default Home;

