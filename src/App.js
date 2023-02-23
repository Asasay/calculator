import "./App.scss";
import React from "react";
import { useState } from "react";

const isNumber = (str) =>
  str.length === str.trim().length && str.length > 0 && Number(str) >= 0;

function App() {
  const [formula, setFormula] = useState("");
  const [display, setDisplay] = useState("");
  const [evaluation, setEvaluation] = useState("");

  function handleClick(e) {
    let btn = e.target;
    let btnValue = btn.firstChild.nodeValue;
    if (btn.nodeName !== "BUTTON") return;
    switch (btn.id) {
      case "equals":
        let clearFormula = formula.replace(/\D+([+*/])/g, "$1");
        clearFormula = clearFormula.replace(/-(-\d)/g, "$1");
        let result = eval(clearFormula);
        setDisplay(result);
        setFormula(clearFormula + "=" + result);
        setEvaluation(result);
        break;
      case "clear":
        setDisplay("0");
        setFormula("");
        setEvaluation("");
        break;
      case "zero":
      case "one":
      case "two":
      case "three":
      case "four":
      case "five":
      case "six":
      case "seven":
      case "eight":
      case "nine":
        if (evaluation !== "") {
          setFormula(btnValue);
          setDisplay(btnValue);
          setEvaluation("");
        } else if (isNumber(display) && display !== "0") {
          setDisplay(display + btnValue);
          setFormula(formula + btnValue);
        } else {
          setDisplay(btnValue);
          setFormula(formula + btnValue);
        }

        break;
      case "decimal":
        if (isNumber(display)) {
          //if not integer break
          if (!/^-?(0|[1-9]\d*)$/.test(display)) break;
          setDisplay(display + ".");
          setFormula(formula + ".");
        } else {
          setDisplay(display + "0.");
          setFormula(formula + "0.");
        }
        break;
      default:
        if (evaluation !== "") {
          setDisplay(btnValue);
          setFormula(evaluation + btnValue);
          setEvaluation("");
        } else {
          setFormula(formula.replace(/\D+([+*/])/g, "$1") + btnValue);
          setDisplay(btnValue);
        }
    }
  }

  return (
    <div className="App">
      <div id="calculator" onClick={handleClick}>
        <div id="formula">{formula}</div>
        <div id="display">{display}</div>
        <button id="clear">AC</button>
        <button id="divide">/</button>
        <button id="multiply">*</button>
        <button id="seven">7</button>
        <button id="eight">8</button>
        <button id="nine">9</button>
        <button id="subtract">-</button>
        <button id="one">1</button>
        <button id="two">2</button>
        <button id="three">3</button>
        <button id="four">4</button>
        <button id="five">5</button>
        <button id="six">6</button>
        <button id="add">+</button>
        <button id="zero">0</button>
        <button id="decimal">.</button>
        <button id="equals">=</button>
      </div>
    </div>
  );
}

export default App;
