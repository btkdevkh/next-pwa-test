"use client";

import { Suspense, use, useState } from "react";
import MessageOutput from "./MessageOutput";
import ButtonClick from "@/components/examples/react_news/react_use_hook_example/message/ButtonClick";

// Asyn funcs
const fetchMessage = (): Promise<string> => {
  return new Promise((resolve) => setTimeout(resolve, 1000, "Hello World!"));
};

// const fetchData = async () => {
//   const res = await fetch("https://api.chucknorris.io/jokes/random");
//   return res.json();
// };

const MessageClient = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [messagePromise, setMessagePromise] = useState<Promise<string> | null>(
    null
  );

  return (
    <>
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        {showMsg && messagePromise ? (
          <>
            <MessageOutput messagePromise={messagePromise} />
            <br />

            <ButtonClick
              title="Hide message"
              handleClicked={() => setShowMsg(false)}
            />
          </>
        ) : (
          <ButtonClick
            title="Show message"
            handleClicked={() => {
              setMessagePromise(fetchMessage());
              setShowMsg(true);
            }}
          />
        )}
      </Suspense>
    </>
  );
};

export default MessageClient;
