import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 1000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({children}){
  const [count, setCount] = useState(0);
  return(

      <div>
        <h1>Slow counter?!?</h1>
        <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
         {children}
      </div>
    );

}

export default function Test() {

  ///this trick will prevent from re-rendering the slowComponent because slowCoponent is now a prop in the counter
  return<div>
    <Counter>
      <SlowComponent/>
    </Counter>
  </div>

  //this will rerender slow coponent whin counter chagne
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  //     <SlowComponent />
  //   </div>
  // );
}
