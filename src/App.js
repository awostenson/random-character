import './App.css';
import './Figurehead';
import Figurehead from './Figurehead';
import Display from './Display';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  console.log("rendering. " + primaryColor);
  theme = changeTheme(primaryColor);

  return (
    <ThemeProvider theme={theme}>
      <div element class="App">
        <div element class="App-center">
          <div class="header row App-center">
            <Figurehead />
          </div>
          <div class="body row scroll-y App-center">
            <Display 
            setBackground={changeBackground}
            changeTheme={changeTheme}
            />
          </div>
          <div class="footer row App-center">
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

var primaryColor = '#757ce8';
var theme = changeTheme(primaryColor)

function changeTheme(newPrimary) {
  primaryColor = newPrimary;

  return createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: primaryColor,
        dark: '#002884', 
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    }
  });
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
