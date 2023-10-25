"use client";
import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const register = async () => {
    const res = await fetch(Backend_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.current.name,
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
    console.log({ response });
  };
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="mx-auto my-16 p-4 max-w-md bg-white rounded-lg shadow-md text-center">
      <div className="bg-gradient-to-b from-white to-slate-200 text-slate-600 py-2 rounded-t-lg">
        <h2 className="text-xl font-semibold">Sign up</h2>
      </div>
      <div className="py-6 space-y-4">
        <InputBox
          autoComplete="off"
          name="name"
          labelText="Name"
          required
          onChange={(e) => (data.current.name = e.target.value)}
        />
        <InputBox
          name="email"
          labelText="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="Password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center space-x-4">
          <Button onClick={register}>Submit</Button>
          <Link href={"/"} className="text-blue-500 hover:underline">Cancel</Link>
        </div>
      </div>
    </div>
  );
  
  
};

export default SignupPage;