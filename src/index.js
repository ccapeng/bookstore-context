import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CategoryProvider } from './context/CategoryState';
import { PublisherProvider } from './context/PublisherState';
import { AuthorProvider } from './context/AuthorState';
import { BookProvider } from './context/BookState';
import { TabProvider } from './context/TabState';

ReactDOM.render(
  <React.StrictMode>
    <CategoryProvider>
      <PublisherProvider>
        <AuthorProvider>
          <BookProvider>
            <TabProvider>
              <App />
            </TabProvider>
          </BookProvider>
        </AuthorProvider>
      </PublisherProvider>
    </CategoryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);