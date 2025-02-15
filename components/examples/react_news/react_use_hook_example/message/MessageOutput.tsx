import { Suspense, use } from "react";

const MessageOutput = ({
  messagePromise,
}: {
  messagePromise: Promise<string> | null;
}) => {
  if (!messagePromise) {
    return (
      <div className="text-center">
        <p className="text-center">No data avaailable!</p>
      </div>
    );
  }

  const message = use(messagePromise);

  return (
    <div className="text-center">
      <p className="text-center">Message : {JSON.stringify(message)}</p>
    </div>
  );
};

export default MessageOutput;
