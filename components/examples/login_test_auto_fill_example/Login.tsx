"use client";

import { FormEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <form onSubmit={submit} className="max-w-56 mx-auto flex flex-col gap-1">
      <h2 className="text-xl">Login</h2>
      <hr />
      <br />

      <div>
        <input
          type="email"
          name="email"
          className="text-black w-full p-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          className="text-black w-full p-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="bg-blue-700 p-1 text-white">
        Submit
      </button>
    </form>
  );
};

export default Login;
