import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import feedbacksReducer from "./feedbacksSlice";

export const renderWithProviders = (ui, { initialState, store = configureStore({ reducer: feedbacksReducer, initialState }), ...renderOptions } = {}) => {
	const Wrapper = ({ children }) => {
		return (
            <Provider store={store}>{children}</Provider>
		);
	};

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}