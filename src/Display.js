import React from 'react';
import './Display.css';
import './Figurehead.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GenerateNewButton from './GenerateNewButton.js';
import backgroundImages from "./backgroundImages.json"
import {createCharacter, displayCharacter, displayWorld, displayBackstory} from './CharacterCreationService';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "character": createCharacter(),
      "tabValue": 0
    }
  }

  render() {
    return (
      <div>
        <div element class="Display-padding Display">
          <Tabs 
            value={this.state.tabValue} 
            onChange={(event, newValue) => this.setState({"tabValue": newValue})}
            textColor="primary"
            indicatorColor="primary"
          > 
            <Tab label="World"/>
            <Tab label="Backstory"></Tab>
            <Tab label="Character" />
          </Tabs>
          <br />
          {this.display()}
          <br />
        </div>
        <div element class="Display-button">
          <div element class="Display">
            <GenerateNewButton 
              refresh = {() => this.setState( {"character": createCharacter()} )}
            />
          </div>
        </div>
      </div>
    );
  }

  display() {
    this.props.setBackground(backgroundImages[this.state.character.world.geography.borders]);
    this.props.changeTheme(this.state.character.character.favColor.hex);
    switch (this.state.tabValue) {
      case 0:
        return displayWorld(this.state.character);
      case 1:
        return displayBackstory(this.state.character);
      case 2:
        return displayCharacter(this.state.character);
      default:
        return "It seems you've gotten lost."
    }
  }
}
  
export default Display;