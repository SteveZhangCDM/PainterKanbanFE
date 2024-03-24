import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Login from "../../pages/login/Login";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureMockStore();
let store;

describe("Login Component", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it("renders the Sign in button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });
});
