import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../Redux/pasteSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update
      dispatch(updateToPastes(paste));
    } else {
      // Create
      dispatch(addToPastes(paste));
    }

    // After Creation Or Updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <input
      style={{
        flex: 1,
        padding: "0.75rem",
        borderRadius: "0.5rem",
        border: "1px solid #ccc", // Lightened the border color
        fontSize: "1rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadow
        backgroundColor: "#f9f9f9", // Light gray background for a softer look
        color: "#333", // Ensures the text remains readable
      }}
      type="text"
      placeholder="Enter Title Here"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
        <button
          onClick={createPaste}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: pasteId ? "#ff5722" : "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = pasteId ? "#e64a19" : "#388e3c";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = pasteId ? "#ff5722" : "#4caf50";
          }}
        >
          {pasteId ? "Update My Paste" : "Create Paste"}
        </button>
      </div>

      <div style={{ marginTop: "1.5rem" , position:"relative"}}>
        <textarea
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ddd",
            fontSize: "1rem",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            resize: "vertical",
            position:"relative",
          }}
          value={value}
          placeholder="Enter Content Here..."
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />


<button style={{position:"absolute", right:"2%", top:"2%"}}
onClick={() => {
  if(value.trim === ""){
    toast.error("Empty Content Could Not Be Copied");
  }
  else{
navigator.clipboard.writeText(value);
toast.success("Copied to Clipboard")
}
}}>
<FontAwesomeIcon icon={faCopy} />
</button>

        
      </div>
    </div>
  );
};

export default Home;
