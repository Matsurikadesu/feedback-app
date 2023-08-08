import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './components/app/App';
import FeedbackPage from './components/feedback/FeedbackPage';
import AddFeedBackPage from './components/add/AddFeedbackPage';
import EditFeedbackPage from './components/edit/EditFeedbackPage';
import RoadmapPage from './components/roadmap/RoadmapPage';
import './index.scss';
import { fetchFeedback, getRoadmap } from './firebase/services';
import ErrorPage from './components/errors/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader: getRoadmap
  },
  {
    path: "/add",
    element: <AddFeedBackPage/>
  },
  {
    path: '/feedbacks/:feedbackId/edit',
    element: <EditFeedbackPage/>,
    loader: ({params}) => fetchFeedback(params.feedbackId)
  },
  {
    path: `/feedbacks/:feedbackId`,
    element: <FeedbackPage/>,
    loader: ({params}) => fetchFeedback(params.feedbackId)
  },
  {
    path: '/roadmap',
    element: <RoadmapPage/>,
    loader: getRoadmap
  },
  {
    path: '*',
    element: <ErrorPage/>
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


