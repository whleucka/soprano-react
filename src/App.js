import { useEffect } from "react";
const App = () => {

  useEffect(() => {
      fetch('http://hleucka.ddns.net/api/v1/answer')
          .then(res => res.json())
          .then(res => console.log(res))
          .catch(err => console.log(err));
  }, []);

  return (
      <section>
        <p>Hello, world!</p>
      </section>
  );
}

export default App;
