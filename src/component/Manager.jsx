import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
function Manager() {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      try {
        let parsedPasswords = JSON.parse(passwords);
        if (Array.isArray(parsedPasswords)) {
          setpasswordArray(parsedPasswords);
        } else {
          console.error("Invalid data format for passwords.");
        }
      } catch (e) {
        console.error("Error parsing passwords from localStorage:", e);
      }
    }
  }, []);
   const ref = useRef();
   const HandleSubmit = () => {
     if (ref.current.src.includes("icons/eyecross.png")) {
       ref.current.src = "icons/eye.png";
     } else {
       ref.current.src = "icons/eyecross.png";
     }
   };

  const savePassword = () => {
    setpasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray,  {...form,id:uuidv4()}]));
    setform({ site: "", username: "", password: "" });
    toast("Saved succesfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // console.log(...passwordArray, form);
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (Text) => {
    navigator.clipboard.writeText(Text);
    toast("copy succesfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };


  const deletes = (id)=>{
  
  console.log(id)
  const c = confirm("Do you really want to delete this Data?")
  if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
  localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
  toast("Deleted succesfully!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  }

  }
  const editPass = (id)=>{
    console.log(id)
    const item = passwordArray.find(item=>item.id===id)
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    setform(item)
   
    
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="p-5 md:px-0 ml-[7%]  md:container">
        <div className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">Mng&gt;</span>
        </div>
        <p className="text-green-700 text-semibold text-center text-xl">
          Your Own Password Manager
        </p>
        <div className="text-black  flex flex-col justify-center p-4 gap-6 items-center">
          <input
            type="text"
            value={form.site}
            name="site"
            onChange={handlechange}
            placeholder="Enter website Url"
            className="rounded-full text-black w-full   p-4 py-1 border border-green-600"
          />
          <div className="flex w-full gap-6 justify-between ">
            <input
              type="text"
              value={form.username}
              name="username"
              onChange={handlechange}
              placeholder="Enter Username or Email"
              className="rounded-full text-black w-full p-4 py-1 border border-green-600"
            />
            <div className="relative">
              <input
                type="password"
                value={form.password}
                name="password"
                onChange={handlechange}
                placeholder="Enter Password"
                className="rounded-full text-black w-full p-4 py-1 border border-green-600"
              />
              {/* <span
                className="absolute right-[4px] top-[3px] cursor-pointer"
                onClick={HandleSubmit}
              >
                <img
                  ref={ref}
                  src="icons/eye.png"
                  className="p-1"
                  width={30}
                  alt="eye"
                />
              </span> */}
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex gap-2 justify-center itmes-center text-xl font-bold bg-green-400 px-4 py-2 rounded-full w-fit hover:bg-green-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="md:password">
          <h2 className="text-2xl font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length == 0 && <div> No Password </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-lg">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username Or email</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border-white border text-center ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border-white border text-center ">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>

                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border-white border text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>

                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border-white border text-center ">
                        <div className="flex items-center justify-center gap-4">
                          <span onClick={()=>{deletes(item.id)}}> <lord-icon 
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px",cursor:"pointer" }}
                          ></lord-icon></span>
                         <span onClick={()=>{editPass(item.id)}}>  <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px",cursor:"pointer" }}
                          ></lord-icon></span>
                        
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
