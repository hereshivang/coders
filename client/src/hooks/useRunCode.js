import axios from "axios";

const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

let useRunCode = async (language, code, input)=>{
    const url = "https://emkc.org/api/v2/piston/execute";
    try{
    let res =  await axios.post(url, {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: code,
        },
      ],
      stdin : input,
    }, {
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    return res.data;
}catch(err){
    console.log(err);
    return err;
}

}

export default useRunCode