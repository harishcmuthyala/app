import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Ideas from "./components/sections/Ideas";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";

// Main Portfolio Page (public)
const Portfolio = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

// Secret Ideas Page (hidden, accessible via /ideas)
const IdeasPage = () => {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Ideas />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App bg-slate-950 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/ideas" element={<IdeasPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
