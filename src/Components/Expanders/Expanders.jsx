import React, { useState } from 'react';
import "./expanders.css";
import {RxCaretDown, RxCaretUp} from "react-icons/rx";
import uniqid from "uniqid";

const questions = [
    {
        qn: "How does Afrimentary work?",
        ans: `
          Afrimentary works by connecting researchers conducting academic quantitative surveys 
          and survey experiments with Africa-based respondents through our user-friendly online platform. 
          Researchers create surveys tailored to their specific research needs, 
          and respondents participate by providing their insights and opinions on various topics.
        `
    },
    {
        qn: "How can one earn with Afrimentary?",
        ans: `
        Earning with Afrimentary is easy. As a respondent, you can sign up on our platform, create a profile, 
        and indicate your interests and demographics. When a survey matches your profile, 
        you will receive an invitation to participate. By taking part in academic surveys, 
        you contribute valuable data and insights, and in return, you are compensated for your time and effort.
        `
    },
    {
        qn: "How much does Afrimentary pay per survey?",
        ans: `
        The payment per survey on Afrimentary varies depending on factors such as survey length, 
        complexity, and the specific requirements set by the researchers. We strive to ensure fair 
        compensation for our respondents, and the exact payment details for each survey are clearly 
        communicated to you before you decide to participate. Rest assured that Afrimentary values 
        your contributions and believes in rewarding you fairly for your time and insights.
        `
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
                  {questions[expander.id].ans}
                </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default ExpanderSection;