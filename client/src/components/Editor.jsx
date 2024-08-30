import React, { useEffect, useRef } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'

const Editor = ({socketRef, roomId, editorRef, language}) => {
  
  
    useEffect(()=>{
        async function init(){
            editorRef.current = CodeMirror.fromTextArea(document.getElementById("realtimeeditor"), {
                mode : {name : language, json : true},
                theme : 'dracula',
                lineNumbers : true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                
            })

            editorRef.current.on('change', (instance, changes)=>{
              const code = instance.getValue();
              const  {origin} = changes;
              if(origin != 'setValue'){
                socketRef.current.emit('code-change', {
                  code,
                  roomId
                })
              }
             
            });

            if(socketRef.current){
              
  
            }
            
        }

        init();

        return ()=>{
            
        }
    },[])

    // useEffect(()=>{
    //   if(socketRef.current){
        
    //   }
    // },[])
  return (
    <textarea id="realtimeeditor" >

    </textarea>
  )
}

export default Editor