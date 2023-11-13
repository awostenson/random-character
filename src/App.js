import './App.css';
import Figurehead from './Figurehead';
import Display from './Display';
import Footer from './Footer';
import Box from '@mui/material/Box';

function App() {
  return (
      <div element class="App">
        <div element class="App-center">
          <Box 
            sx={{ borderRadius: '16px' }} 
            class="header row App-center"
          >
            <Figurehead />
          </Box>
          <div class="body row scroll-y App-center">
            <Display 
            setBackground={changeBackground}
            />
          </div>
          {/* <div class="footer row App-center">
            <Footer />
          </div> */}
        </div>
      </div>
  );
}

function changeBackground(newBackground) {
  document.body.style.setProperty("--background-url", newBackground);
}

//function parallax() {
  //$.scrollingParallax('img/background-parallax.jpg');
  // var pageOffsetX, pageOffsetY, modifiedOffsetX, modifiedOffsetY;

  // const frame = document.getElementById("frame");
  // const frameDoc = frame.contentDocument;
  // const info = document.getElementById("info");

  // const target = frameDoc.getElementById("overview");
  // frameDoc.scrollingElement.scrollTop = target.offsetTop;

  // info.innerText = `Y offset after scrolling: ${frame.contentWindow.pageYOffset} pixels`;


  // pageOffsetX = frame.contentWindow.pageYOffset;
  // pageOffsetY = frame.contentWindow.pageXOffset;
  // modifiedOffsetX = pageOffsetX * 0.1;
  // modifiedOffsetY = pageOffsetY * 0.1;

  // body.css('background-position', modifiedOffsetX + 'px ' + modifiedOffsetY + 'px');
  // setTimeout(parallax, 100);
//}

//parallax();

export default App;
