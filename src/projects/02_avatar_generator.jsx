import "remixicon/fonts/remixicon.css";
import "animate.css";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=",
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed=",
  },
  {
    label: "Robots",
    value: "robots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    label: "Art",
    value: "art",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
];

const AvatarGenerator = () => {
  const [src, setSrc] = useState(null);
  const [option, setOption] = useState("illustration");

  const onChangeHandler = (e) => {
    const value = e.target.value;
    setOption(value);
  };

  const generate = () => {
    const obj = data.find((item) => item.value === option);
    const url = obj.url;
    const random = Date.now();
    const updatedUrl = `${url}${random}`;
    setSrc(updatedUrl);
  };

  const download = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${Date.now()}.jpg`;
    a.click();
    a.remove();
  };

  const copy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Image Url Copied", { position: "top-center" });
  };

  useEffect(() => {
    generate();
  }, [option]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center text-white font-mono">
      <div className="animate__animated animate__bounceIn flex flex-col items-center max-w-xl w-full rounded-2xl shadow-xl backdrop-blur-xl border border-slate-500 p-10">
        <img
          src={src || "https://avatar.iran.liara.run/public/3"}
          alt="Avatar-Image"
          className="w-35 h-35 rounded-full border-4 border-slate-700 shadow-lg object-cover"
        />
        <div className="text-center mt-6 space-y-2">
          <h1 className="text-2xl font-medium">Avatar Generator</h1>
          <p className="text-sm text-slate-300">
            Generate unlimited avatar for your website
          </p>
        </div>

        <div className="mt-6 space-y-4 w-full">
          <select
            value={option}
            onChange={onChangeHandler}
            className="bg-slate-900/40 p-3 rounded-xl w-full"
          >
            {data.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="bg-slate-900/40 p-3 rounded-xl">{src}</div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 w-full">
          <button
            onClick={generate}
            className="bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 px-2 hover:scale-105 transition-transform duration-100 cursor-pointer"
          >
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change
          </button>

          <button
            onClick={() => download(src)}
            className="bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg py-2 px-2 hover:scale-105 transition-transform duration-100 cursor-pointer"
          >
            <i className="ri-download-line mr-1"></i>
            Download
          </button>

          <button
            onClick={() => copy(src)}
            className="bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg py-2 px-2 hover:scale-105 transition-transform duration-100 cursor-pointer"
          >
            <i className="ri-file-copy-line mr-1"></i>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarGenerator;
