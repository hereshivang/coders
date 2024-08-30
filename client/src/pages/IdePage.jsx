import React, { useRef, useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LanguageSelector from "../components/editorComponents/LanguageSelector";
import Clients from '../components/editorComponents/Clients';
import Chat from '../components/editorComponents/Chat'
import Output from "../components/editorComponents/Output";
import {initSocket} from '../socket';
import useStore from "../store/store";
import toast from "react-hot-toast";
import useRunCode from '../hooks/useRunCode'
import RunButton from "../components/editorComponents/RunButton";
import SideMenu from "../components/editorComponents/SideMenu";
import Editor from "../components/Editor";
import useJoinRoom from '../hooks/useJoinRoom';


const IdePage = () => {
  const [language, setLanguage] = useState('java');
  const editorRef = useRef(null);
  const [code, setCode] = useState("");
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState("clients");
  const socketRef = useRef();
  const [output, setOutput] = useState("");
  const [input , setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomInfo , setRoomInfo] = useState({});
  const [roomLoading, setRoomLoading] = useState(false);
 
  

  const setChat = useStore((state)=> state.setChat);
  const user = useStore((state)=> state.user);
  const token = useStore((state)=> state.token);
  let rnavigator = useNavigate();
  let location = useLocation();
  let { id } = useParams();
  const tabs = {
    "clients": <Clients clients={clients} />,
    "chat": <Chat socketRef={socketRef} />
  }
  

  useEffect(()=>{
    if(!location.state){
      (async()=>{
        setRoomLoading(true);
        let res = await useJoinRoom(id,token);
        setRoomLoading(false);
        if(res.error){
          toast.error(res.error);
          rnavigator('/');
        }
        setRoomInfo(res.room);
      })()
    }else{
      setRoomInfo(location.state.room);
    }
    


    const init = async ()=> {
    socketRef.current = await initSocket();
    socketRef.current.on('connect_error', (err)=> handelErrors(err));
    socketRef.current.on('connect_failed', (err)=> handelErrors(err));

    function handelErrors(e){
      console.log('socket error', e);
      toast.error("Socket connection failed");
      rnavigator('/');

    }
    socketRef.current.emit('join', {
      roomId : id,
      username: user.username,
    });

    socketRef.current.on('joined', ({clients, username, socketId})=>{
      if(username != user.username){
        toast.success(`${username} joined the room.`);
      }
      setClients(clients);
    });

    socketRef.current.on('disconnected', ({socketId, username})=>{
      toast.success(`${username} left the room.`);
      setClients((prev)=> {
        return prev.filter((item)=> item.socketId != socketId);
      })
    })

    socketRef.current.on('code-change', ({code})=>{
      if(code !== null){
        setCode(code);
        editorRef.current.setValue(code);
      }
    })

    socketRef.current.on('recivedMessage', (item)=> {
      setChat(item);
    })
  }

  init();

  return ()=>{
    
    socketRef.current.off('joined');
    socketRef.current.off('disconnected');
    socketRef.current.off('code-change');
    socketRef.current.disconnect();
  }
  }, [])



  async function handelRunCode(){
    setLoading(true);
    let res = await useRunCode(language, editorRef.current.getValue(), input);
    setOutput(res.run.output);
    console.log(res)
    setLoading(false);
  }

  async function handelFileChange(e){
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = async (e) => { 
      const text = (e.target.result)
      setCode(text);
      editorRef.current.setValue(text);
    };
    reader.readAsText(file)

  }

  return (
    <>{roomLoading ? <div className="h-full w-full"> Loading</div> :
    <div className="flex h-full text-[#aeaeae]">
      <SideMenu setActiveTab={setActiveTab} activeTab={activeTab} id={id}  />
      <div className="flex h-full  flex-col w-[250px] bg-[#191818] border-r-[2px]  p-3 border-gray-700">
        <h3 className="text-center text-2xl font-semibold p-1 bg-[#aeaeae] text-black rounded-lg">{roomInfo.roomname}</h3>
        <div className="h-full">
          {tabs[activeTab]}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center px-2 h-[5vh] bg-[#151515] shadow-lg">
          <LanguageSelector setlanguage={setLanguage} />
          <div className="flex gap-5">
          <input onChange={handelFileChange} type="file" id="fileUp" className="hidden"/>
          <button className="p-1 for bg-gray-400 px-4 text-black font-semibold" type="button">Draft</button>
          <label htmlFor="fileUp" className="p-1 px-4 bg-yellow-500 text-white font-semibold flex items-center" type="button">Upload</label>
          <RunButton loading={loading} handelRunCode={handelRunCode} />
          </div>
        </div>
        <Editor socketRef={socketRef} roomId={id} editorRef={editorRef} language={language} />

        <div className="flex bg-[#aeaeae] overflow-hidden h-[18vh] gap-3 p-2 text-black">
          <div className="flex-1 border-r-2 border-[#151515]">
            <h4>Inputs</h4>
            <textarea value={input} onChange={(e)=> setInput(e.target.value)} className="w-full h-full bg-transparent focus:outline-none"></textarea>
          </div>
          <div className="flex-1 overflow-auto">
            <h4>Outputs</h4>
            <Output output={output} />
          </div>
        </div>
      </div>
    </div> }
    </>
  )
}

export default IdePage