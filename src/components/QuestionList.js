import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem.js"

function QuestionList() {

  const [Items, setItems] = useState([])

useEffect(() => {
fetch("http://localhost:4000/questions")
.then(resp => resp.json())
.then(data => setItems(data))
}, [])

function deleteQuestion(id){
fetch(`http://localhost:4000/questions/${id}`, {
  method: "DELETE",
})
  .then((r) => r.json())
  .then(() => {
    const updatedItems = Items.filter((q) => q.id !== id);
    setItems(updatedItems);
  })

}

function changeAnswer(id, index){
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      correctIndex: {index}
  })
  })
  .then(resp => resp.json())
  .then(data => {
    const updatedQuestions = Items.map((q) => {
      if (q.id === data.id) return data;
      return q;
    });
    setItems(updatedQuestions);
  });
}

const questionItems = Items.map((q) => (
  <QuestionItem
    key={q.id}
    question={q}
    handleDelete={deleteQuestion}
    handleChange={changeAnswer}
    />
));


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
