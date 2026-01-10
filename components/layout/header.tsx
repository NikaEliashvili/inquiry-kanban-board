import React from "react";
import Logo from "../logo";

const Header = () => {
  return (
    <header className="p-4 bg-background">
      <div className="flex gap-2 items-center">
        <Logo />
        <div className="flex flex-col justify-between">
          <h1 className="font-bold text-xl leading-5">Inquiry Kanban Board</h1>
          <p className="text-muted-foreground text-sm">
            smti ERP • Hotel Inquiry Management
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
