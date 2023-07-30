import { useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  
  const {unityProvider,isLoaded,sendMessage,requestFullscreen,unload,loadingProgression} = useUnityContext({
    loaderUrl: "/unitybuild/crateclicker.loader.js",
    dataUrl: "/unitybuild/crateclicker.data",
    frameworkUrl: "/unitybuild/crateclicker.framework.js",
    codeUrl: "/unitybuild/crateclicker.wasm",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickStartGame = (time) => {
    if (isLoaded === false || isPlaying === true) {
      return;
    }
    setIsPlaying(true);
    sendMessage("GameController", "StartGame", time);
  };

  const handleClickFullscreen = () => {
    if (isLoaded === false) {
      return;
    }
    requestFullscreen(true);
  };

  const handleClickUnload = async () => {
    if (isLoaded === false) {
      return;
    }
    try {
      await unload();
      console.log("Unload success");
    } catch (error) {
      console.error(`Unable to unload: ${error}`);
    }
  };
  return (
    <>
      <h1 style={{textAlign:'center',fontSize:'24px'}}>Crate Clicker!</h1>
      {/* Unity game div */}
      <div >
        {isLoaded === false && (
          <div >
            <div style={{ width: loadingProgression * 100 }}
            />
          </div>
        )}
        <Unity
          unityProvider={unityProvider}
          style={{width:'100%',height:'70vh'}}
        />
      </div>
      {/* Unity game div end*/}

      {/* game control panel */}
      <p style={{textAlign:'center',marginBottom:'0px'}}>Once you played,You will need to reload to play again</p>

      <div style={{display:'flex',justifyContent:'center',paddingTop:'20px'}}>
        <button style={{marginRight:'8px',backgroundColor:'#C85306',padding:'6px 20px',border:'none',color:'white'}} onClick={() => handleClickStartGame(8)}>
          Start Short Game
        </button>
        <button style={{marginRight:'8px',backgroundColor:'#F2BCBE',padding:'6px 20px',border:'none',color:'black'}} onClick={() => handleClickStartGame(15)}>
          Start Long Game
        </button>
        <button style={{marginRight:'8px',backgroundColor:'#9CCFEF',padding:'6px 20px',border:'none',color:'black'}} onClick={handleClickFullscreen}>Fullscreen</button>
        <button style={{backgroundColor:'#FD3717',padding:'6px 20px',border:'none',color:'white'}} onClick={handleClickUnload}>Unload</button>
      </div>
      {/* game control panel end*/}
    </>

  );
}

export default App;
