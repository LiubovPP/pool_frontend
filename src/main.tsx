import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter as Router, HashRouter } from "react-router-dom"
import store from "@app/store"
import App from "./App"
import "@styles/App.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Provider store={store}>

      <App />

    </Provider>
  </HashRouter>
)
