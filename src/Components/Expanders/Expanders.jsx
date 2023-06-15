import React, { useState } from 'react';
import "./expanders.css";
import {RxCaretDown, RxCaretUp} from "react-icons/rx";
import uniqid from "uniqid";

const questions = [
    {
        qn: "How does Afrimentary work?",
        ans: `We help researchers find respondents for their research studies. `
    },
    {
        qn: "How can one earn with Afrimentary?",
        ans: `Fill out surveys and get paid to do so. `
    },
    {
        qn: "How much does Afrimentary pay per survey?",
        ans: `The amount paid depends on the type of questions, and number of quetions in each survey.`
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
        <div className="faq_container"   onClick={() => toggleExpander(expander.id)} key={uniqid()}>
            <div className="qn_container">
                <div className="question">{questions[expander.id].qn}</div>
                <div className="faq__toggle">
                {expander.expanded ? <RxCaretUp color="white" size={40} /> : <RxCaretDown color="white" size={40} />}
                </div>
            </div>
            {expander.expanded && (
                <div className="answer">
                  <ul>
                    <li>
                      {questions[expander.id].ans}
                    </li>
                  </ul>
                </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default ExpanderSection;