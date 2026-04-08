import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

const Home = React.lazy(() => import("@/pages/Home"));
const Quiz = React.lazy(() => import("@/pages/Quiz"));
const Result = React.lazy(() => import("@/pages/Result"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-primary-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:type" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
