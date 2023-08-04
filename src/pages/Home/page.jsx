import React from "react";
import a from "../../assets/b2.jpg";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <header className="text-center font-medium  mt-12 text-slate-950">
        <h1 className="text-7xl ">
          Your <span className="underline decoration-solid">Notes</span>
          <i className="fa-solid fa-note-sticky text-6xl text-fuchsia-500 ml-1 mr-3"></i>
          & <span className="underline decoration-solid">images</span>
          <i className="fa-regular fa-image text-6xl ml-1 mr-1 text-yellow-400"></i>
          <br />
          got
          <span className=" underline decoration-solid ml-4">NOTED</span>
          <i className="fa-solid fa-wand-magic-sparkles text-5xl text-rose-500 ml-1 mr-4 "></i>
          again!
        </h1>
        <h2 className="text-2xl mt-4">Pixy Notes - A web-based note-taking app</h2>
      </header>

      <section className="flex justify-center mt-7 ">
        <button className="btn mr-5">
          <Link to={'/pages/demo'}>View Demo</Link></button>
        <Link to={'/pages/signin'} className="btn btn-primary">Get Started</Link>
      </section>

      <section className="flex justify-center mt-7">
        <img className="w-3/6 max-sm:w-full" src={a} alt="art" />
      </section>
    </>
  );
}
