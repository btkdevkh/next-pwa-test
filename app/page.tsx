"use client";

import DragDropMobileDesktop from "@/components/DragDropMobileDesktop";

const HomePage = () => {
  return (
    <>
      <div className="max-w-sm mx-auto">
        <h1>Tâches</h1>
        <br />

        <div className="flex flex-col gap-3">
          <DragDropMobileDesktop />
        </div>
      </div>
    </>
  );
};

export default HomePage;
