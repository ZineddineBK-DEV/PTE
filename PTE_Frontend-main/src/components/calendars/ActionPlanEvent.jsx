import { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library


import { useParams, useNavigate ,NavLink ,Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getPlanById,
  uploadPlan,
  reset,
  
} from "../../features/userPlans/userPlanSlice";

const ActionPlanEvent = () => {
  const [pdf, setPdf] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
const [Pdfjs ,setPdfjs]=useState(null)
  const initialState = {
    user:id,
    pdf: "",
  };
  const [formData, setFormData] = useState({
    ...initialState,
  });
  


 
  const [addPlanModalOpen, setAddPlanModalOpen] = useState(false);
  const [PlanModalOpen, setPlanModalOpen] = useState(false);
  const [EventInfo, setPlanInfo] = useState("");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  
  
  
  
  useEffect(() => {

        dispatch(
      getPlanById({
        user: id,
        pdf:pdf,
      })
    ).then((res) => {
      console.log(res.payload[0].pdf);
      setPdfjs(res.payload[0].pdf);
      if(Pdfjs !==null){
        setViewPdf(Pdfjs);    
      }
      else{
        setViewPdf(null);
      }
      if (res.payload === null) {
        navigate("/ActionPlan");

      }  
    });
  }, [id, reducerValue, dispatch, navigate]);
  
  
  
  const getPlans = (data) => {
    /** Get query*/

    const body = {
      user: id,
      pdf: data.pdf,
    };

    dispatch(getPlanById(body));
  };
  
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');
  // for submit event
  const [viewPdf, setViewPdf] = useState(null);
  const fileType=['application/pdf'];
  const [file,setFile]=useState('');
  const [filename, setFilename]=useState('');


  const onFileUpload = (e) => {
    // var splits =e.target.value.split('fakepath\\');
    setPdf(URL.createObjectURL(e.target.files[0]));
    setFormData((prevState) => ({
      ...prevState,
      pdf:e.target.files[0],
    }));

    
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);

  };
  const eventHandleAdd = async (data) => {

    dispatch(uploadPlan(data)).then(() => {
      forceUpdate();
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.pdf === "") {
      toast.error(" Required fields not filled");
    } else {
      eventHandleAdd({
       
        user: id,
        pdf:pdf,
        
        });
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      // dispatch(uploadPlan(data));
      setFormData({ ...initialState });
      setPdf(null);
      toast.success("plan Uploaded Succssefuly");

    }
    console.log(id);
    e.preventDefault();
    if(Pdfjs !==null){
      setViewPdf(Pdfjs);    
    }
    else{
      setViewPdf(null);
    }


  };

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   if (
  //     formData.pdf === ""
  //   ) {
  //     toast.error(" Required fields not filled");
  //   } else {
  //     const data = new FormData();
  //     Object.keys(formData).forEach((key) => {
  //       data.append(key, formData[key]);
  //       toast.success("Plan uploaded successfully");
  //     });

  //     dispatch(uploadPlan(id,data));
  //     setFormData({ ...initialState });
  //     setPdf(null);
  //   }
  //   console.log(id);


  //   event.preventDefault();

  //   if(pdfFile !==null){
  //     setViewPdf(pdfFile);    
  //   }
  //   else{
  //     setViewPdf(null);
  //   }
  // };
    return (
     <div className='container'>
        <form className='form-group' onSubmit={onSubmit}>
          <div>
            <input
              type="file"
              name="pdf"
              id="pdf"
              onChange={onFileUpload}
              accept="application/pdf"
            />
          </div>
          {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
          <br></br>
          <button
            type="submit"
            className="mt-3 w-full rounded px-5 py-2.5 overflow-hidden group bg-[#041e62] relative hover:bg-gradient-to-r hover:from-[#041e62] hover:to-[#041e62] text-white hover:ring-2 hover:ring-offset-2 hover:ring-[#041e62] transition-all ease-out duration-300"
          >
            <span className="absolute right-10 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Upload Action Plan</span>
          </button>
        </form>
        <br></br>
        <button onClick={()=>{
            window.open(Pdfjs, '_blank');
          }}>View Action Plan</button>
        <div className='pdf-container'>
          {/* show pdf conditionally (if we have one)  */}
        
           {viewPdf && <>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <Viewer fileUrl={Pdfjs}
              plugins={[defaultLayoutPluginInstance]} />
          </Worker></>}

          {/* if we dont have pdf or viewPdf state is null */}
          {!viewPdf && <>No pdf file selected</>}
        </div>
      </div>


    );
  
 
 
};

export default ActionPlanEvent;
