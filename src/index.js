import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './components/App/App';
import FeedbackPage from './components/FeedbackPage/FeedbackPage';
import AddFeedBackPage from './components/AddFeedback/AddFeedbackPage';
import EditFeedbackPage from './components/EditFeedbackPage/EditFeedbackPage';
import RoadmapPage from './components/PageRoadmap/RoadmapPage';
import './index.scss';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/add",
    element: <AddFeedBackPage/>
  },
  {
    path: '/:feedbackid/edit',
    element: <EditFeedbackPage/>
  },
  {
    path: `/:feedbackId`,
    element: <FeedbackPage/>
  },
  {
    path: '/roadmap',
    element: <RoadmapPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
);


