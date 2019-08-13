import React , {Component} from 'react'



class Theme extends Component {

  constructor(props){
    super(props)

    this.state = {
      themes : [
        {id : 1, color : "red", active : false, displayColor : "rgb(146, 43, 33)"},
        {id : 2, color : "blue", active : false, displayColor : "rgb(40,55,71)"},
        {id : 3, color : "green", active : false, displayColor : "rgb(25,111,61)"},
        {id : 4, color : "yellow", active : false, displayColor : "rgb(154, 125, 10)"},
      ],
    }
  }

  componentDidMount(){
    let mytheme = localStorage.getItem('theme');

    let oldthemes = this.state.themes
    let newthemes = []
    oldthemes.map(
      (theme) => {
        if(theme.color === mytheme){
          newthemes.push({id : theme.id, color : theme.color, active : true, displayColor : theme.displayColor})
        }
     else {
        newthemes.push({id : theme.id, color : theme.color, active : false,  displayColor : theme.displayColor})
      }
        }
    )
    this.setState({
      themes : newthemes
    })

  }

  handleThemeChange = (inTheme) => {
    console.log("theme you wantaa", inTheme.id)
    let oldthemes = this.state.themes
    let newthemes = []
    oldthemes.map(
      (theme) => {
        if(theme.id === inTheme.id){
          newthemes.push({id : theme.id, color : theme.color, active : true, displayColor : theme.displayColor})
        }
     else {
        newthemes.push({id : theme.id, color : theme.color, active : false, displayColor : theme.displayColor})
      }
        }
    )
    this.setState({
      themes : newthemes
    })
    localStorage.setItem('theme', inTheme.color)
    window.location.reload()
  }



  render(){

    console.log(this.state.current)

    let color_svgs = [];

    this.state.themes.map(
      (theme, index) => {
        if(theme.active) {
           color_svgs.push(<circle key={index} onClick = {() => this.handleThemeChange(theme)} cx={(index*40)+(20*(index+2))} cy="25" r="20" fill={theme.displayColor} stroke="grey" strokeWidth="3" />)
        } else {
          color_svgs.push(<circle key={index} onClick = {() => this.handleThemeChange(theme)}  cx={(index*40)+(20*(index+2))} cy="25" r="20" fill={theme.displayColor}  />)
        }
        return null;
      }
    )


    return(
      <div>
        <h2 className="boxn">Choose a Theme</h2>
        <div className="boxn">
          <svg width="500" height="50">
             {color_svgs}
          </svg>
        </div>
      </div>
    )

  }


}

export default Theme
