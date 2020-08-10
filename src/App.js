import React from 'react';
import ProfilePage from './views/profile-page/profile-page';
import './css/reset.css';
import './App.css';

function App() {
  console.log('app');
  return (<div>
      <section>
        <ProfilePage/>
      </section>
    </div>
  );
}

export default App;
