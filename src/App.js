import React, { Component } from 'react';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='flex flex-col font-sans min-h-screen text-grey-darkest'>
              {/* <Helmet
          title='Flight Matrix'
          meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
          <link rel='manifest' href='/favicon/site.webmanifest' />
          <link rel='mask-icon' href='/favicon/safari-pinned-tab.svg' color='#5bbad5' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#ffffff' />
        </Helmet> */}
        <Header />
        <div className='flex flex-col flex-1 md:justify-center max-w-xl mx-auto px-4 py-8 md:p-8 w-full'>
        <div className="text-center max-w-xl">
          <SearchPanel />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
