"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/example`)
      .then((res) => res.json())
      .then((data) => setMessage(data))
      .then((data) => console.log(data))
      .catch(() => setMessage("取得に失敗しました"));
  }, []);

  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <div>{message}</div>
    </main>
  );
}
