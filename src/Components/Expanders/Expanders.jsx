import React, { useState } from 'react';
import "./expanders.css";
import {RxCaretDown, RxCaretUp} from "react-icons/rx";

const questions = [
    {
        qn: "How does Afrimentary work",
        ans: `It all begins with an idea. Maybe you want to launch a business. 
        Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. 
        Whatever it is, the way you tell your story online can make all the difference.`
    },
    {
        qn: "How can one earn with Afrimentary",
        ans: `It all begins with an idea. Maybe you want to launch a business. 
        Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. 
        Whatever it is, the way you tell your story online can make all the difference.`
    },
    {
        qn: "How much does Afrimentary pay per survey",
        ans: `It all begins with an idea. Maybe you want to launch a business. 
        Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. `
    }
]

const ExpanderSection = () => {
  const [expanders, setExpanders] = useState([
    { id: 0, expanded: false },
    { id: 1, expanded: false },
    { id: 2, expanded: false }
  ]);
  const toggleExpander = (id) => {
    setExpanders((prevState) =>
      prevState.map((expander) =>
        expander.id === id ? { ...expander, expanded: !expander.expanded } : expander
      )
    );
  };

  return (
    <div className="faq__question">
      {expanders.map((expander) => (
        <div className="faq_container" key={expander.id}>
            <div className="qn_container">
                <div className="question">{questions[expander.id].qn}</div>
                <div className="faq__toggle" onClick={() => toggleExpander(expander.id)}>
                {expander.expanded ? <RxCaretUp color="white" size={40} /> : <RxCaretDown color="white" size={40} />}
                </div>
            </div>
            {expander.expanded && (
                <div className="answer">
                    <p>{questions[expander.id].ans}</p>
                </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default ExpanderSection;