import React from "react";

function QuestionItem({ question, handleDelete, handleChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    handleDelete(id);
  }

  function handleOnChange(e){
    handleChange(id, parseInt(e.target.value))
  }

  return (
    <li>
      <h4>Question {question.id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleOnChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
