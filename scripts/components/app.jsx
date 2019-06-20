import React from 'react';

const defaults = {
  access: true
};

const has = {
  ...defaults
};
const ALL_DOGS = ['husky', 'dalmatian', 'pug', 'pug', 'bulldog', 'french bulldog'];
const App = () => (
  <main className="content">
    <div>
      <h1>All Dogs</h1>
      <ul>
        {has.access && ALL_DOGS.map(dog => <li>{dog}</li>)}
      </ul>
      <h1>Unique dogs</h1>
      <ul>
        {[...new Set(ALL_DOGS)].map(dog => (
          <li>{dog}</li>
        ))}
      </ul>
    </div>
  </main>
);

export default App;
