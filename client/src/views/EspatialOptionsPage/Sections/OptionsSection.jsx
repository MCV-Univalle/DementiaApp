import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import profile from "assets/img/art2.jpeg";

// react components for routing our app without refresh
import { Link } from "react-router-dom";

import activityStyle from "assets/jss/material-kit-react/views/landingPageSections/espatialOptionsStyle.jsx";

const imgStyle = {
  maxWidth: "15%"
}

class OptionsSection extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
      <div className={classes.container}>
      
        <GridContainer className={classes.textCenter} justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>¿Cuál actividad quieres resolver hoy?</h2>
            <br></br>
            <div>
            <Button size="lg" style={{width:"230px"}} color="success"> Identificación  </Button>
            </div>
            <div>
            <Button size="lg" style={{width:"230px"}} color="success"> Orientación </Button>
            </div>
            <div>
            <Button size="lg" style={{width:"230px"}} color="success"> Memoria </Button>
            </div>
            <div>
            <Button size="lg" style={{width:"230px"}} color="success"> Atención y calculo </Button>
            </div>
            <div>
            <Button size="lg" style={{width:"230px"}} color="success"> Lenguaje </Button>
            </div>


          </GridItem>
        </GridContainer>

        </div>
        </div>
    );
  }
}

OptionsSection.propTypes = {
  classes: PropTypes.object
};

export default withStyles(activityStyle)(OptionsSection);
