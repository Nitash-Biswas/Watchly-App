//Show subscribers and channels subscribed to

import React, { useState } from "react";

function Stats() {
  const username = "username";
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelect = (component) => {
    setSelectedComponent(selectedComponent === component ? null : component);
  };
  return (
    <div className="bg-darkbg min-h-full text-lighttext">
      {/* CoverImage */}
      <div className="bg-cover bg-center h-96 flex justify-center items-center">
        <img
          src="https://placehold.co/600x400"
          alt="coverImage"
          className="w-full h-full object-cover"
        />
      </div>
      {/* AvatarImage */}
      <div className="flex justify-items-start items-center">
        <img
          src="https://placehold.co/150x150"
          alt="avatarImage"
          className="w-36 h-36 ml-4.5 object-cover rounded-full -mt-16 border-4 border-darkbg"
        />
        <div className="ml-4.5">
          <h1 className="text-lighttext text-2xl">Fullname</h1>
          <p className="text-darktext">{`@${username}`}</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex w-full justify-between">
        <div
          className={`hover:bg-highlight hover:text-lighttext w-1/2 text-darktext text-xl flex justify-center items-center m-4 p-4 rounded-lg ${
            selectedComponent === "Playlists"
              ? "bg-highlight text-lighttext"
              : "bg-transparent"
          }`}
          onClick={() => handleSelect("Subscribers")}
        >
          <h1>Subscribers</h1>
        </div>
        <div
          className={`hover:bg-highlight hover:text-lighttext w-1/2 text-darktext text-xl flex justify-center items-center m-4 p-4 rounded-lg ${
            selectedComponent === "Videos"
              ? "bg-highlight text-lighttext"
              : "bg-transparent"
          }`}
          onClick={() => handleSelect("Subcribed")}
        >
          <h1>Subscribed</h1>
        </div>
      </div>
    </div>
  );
}

export default Stats;
