import React from "react";
import ReactDom from "react-dom";

function BoilVerdict(props) {
  if (props.temperature >= 100) {
    return <div>Water would boil</div>;
  } else {
    return <div>Water would NOT boil</div>;
  }
}

const scale = {
  f: "Fahrenheit",
  c: "Celsius"
};

function toCelsius(temperature) {
  return ((temperature - 32) * 5) / 9;
}

function toFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

function convert(temperature, convertFunc) {
  return convertFunc(temperature).toString();
}

class TempInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value, this.props.scale);
  }

  render() {
    const temperature = this.props.temperature;
    return (
      <div>
        {scale[this.props.scale]}:
        <input type="text" value={temperature} onChange={this.handleChange} />
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      temperature: 0,
      scale: "c"
    };
  }

  handleChange(temperature, scale) {
    switch (scale) {
      case "c":
        return this.setState({ scale: "c", temperature });
      case "f":
        return this.setState({ scale: "f", temperature });
      default:
        return;
    }
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? convert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? convert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TempInput
          scale="c"
          onChange={this.handleChange}
          temperature={celsius}
        />
        <TempInput
          scale="f"
          onChange={this.handleChange}
          temperature={fahrenheit}
        />
        <hr />
        <BoilVerdict temperature={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDom.render(<Calculator />, document.getElementById("app"));
