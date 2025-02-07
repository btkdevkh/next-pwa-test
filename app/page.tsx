"use client";

import DragDropMobileDesktop from "@/components/DragDropMobileDesktop";

const HomePage = () => {
  return (
    <>
      <div className="mx-auto">
        <h1>Tâches</h1>
        <br />

        <div className="flex gap-3 flex-col md:flex-row lg:flex-row">
          <DragDropMobileDesktop />
        </div>
      </div>
    </>
  );
};

export default HomePage;
