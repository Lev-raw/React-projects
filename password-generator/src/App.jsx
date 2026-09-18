import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'
import previewImage from './assets/password-generator-preview.png'

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*(){}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass);
    
  }, [length, numberallowed, charallowed,setpassword]);
  
  
  useEffect( ()=>{
    passwordgenerator();


  },[length,numberallowed,charallowed,passwordgenerator])


  //useRef hook copying clipboard
  
  const passref = useRef(null)
  const passwordcopytoclipnoard= useCallback(()=>{
    passref.current?.select();
     passref.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password);
  },[password])
     

  return (
    <main className="min-h-screen bg-[#080b14] px-4 py-12 text-slate-300">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">

        <section className="w-full max-w-md rounded-3xl border border-indigo-400/20 bg-[#111827]/90 p-7 text-center shadow-2xl shadow-indigo-950/30 backdrop-blur-xl">

      <div className="mb-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-2xl shadow-lg shadow-indigo-500/10">
          🔐
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white">
          Password Generator
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Create strong passwords instantly.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={password}
          placeholder="Your password"
          readOnly
          ref={passref}
          className="w-full min-w-0 rounded-xl border border-white/10 bg-[#080b14] px-4 py-3 font-mono text-sm text-indigo-300 outline-none transition placeholder:text-slate-600 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10"
        />

        <button
          className="rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-300 transition hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-300 active:scale-95"
          onClick={passwordcopytoclipnoard}
        >
          Copy
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 text-sm text-slate-300">

        <div className="flex items-center gap-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="w-24 cursor-pointer accent-indigo-500"
            onChange={(e) => setlength(Number(e.target.value))}
          />
          <label className="whitespace-nowrap">Length: {length}</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={numberallowed}
            id="numberInput"
            onChange={() => setnumberallowed((prev) => !prev)}
            className="h-4 w-4 cursor-pointer accent-indigo-500"
          />
          <label htmlFor="numberInput" className="cursor-pointer">
            Numbers
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={charallowed}
            id="specialInput"
            onChange={() => setcharallowed((prev) => !prev)}
            className="h-4 w-4 cursor-pointer accent-indigo-500"
          />
          <label htmlFor="specialInput" className="cursor-pointer">
            Special characters
          </label>
        </div>

      </div>
        </section>

        <section className="grid w-full max-w-4xl gap-6 rounded-3xl border border-indigo-400/20 bg-[#111827]/80 p-6 shadow-2xl shadow-indigo-950/20 backdrop-blur-xl md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:p-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080b14]">
            <img
              src={previewImage}
              alt="Password Generator interface preview"
              className="h-full min-h-56 w-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">
              About Me
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
              Building useful interfaces with React
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              I enjoy turning small ideas into polished, accessible web
              experiences. This password generator is a focused React project
              built to make creating strong passwords quick and simple.
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Explore the controls above to customize a password, then copy it
              securely with one click.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;