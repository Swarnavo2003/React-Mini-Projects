import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GradientGenerator = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.random() * rgb;
    const int = Math.floor(random);
    const hexCode = int.toString(16);
    const color = hexCode.padStart(6, "0");
    return `#${color}`;
  };

  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;
      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString},${color1},${color2})`,
          css: `background: 'linear-gradient(${degreeString},${color1},${color2})'`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(ellipse,${color1},${color2})`,
          css: `background: 'radial-gradient(ellipse,${color1},${color2})'`,
        });
      }
    }
    setGradients(colors);
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient Code Copied", { position: "top-center" });
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-9/12 mx-auto space-y-8">
        <div
          className="flex justify-between p-2 rounded-xl"
          style={{
            background: getHexColorCode(),
          }}
        >
          <h1 className="text-3xl font-bold">🎨Gradient Generator</h1>
          <div className="flex gap-4">
            <input
              value={num}
              className="border border-slate-300 bg-white rounded-lg w-[100px] p-2"
              placeholder="12"
              onChange={(e) => setNum(Number(e.target.value))}
            />
            <select
              value={type}
              className="border border-slate-300 bg-white rounded-lg w-[100px] p-2"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              className="px-2 py-1 bg-blue-500 rounded-lg text-white font-semibold cursor-pointer"
              onClick={generateGradient}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-[180px] rounded-xl relative group cursor-pointer"
              style={{ background: item.gradient }}
              onClick={() => onCopy(item.css)}
            >
              <button className="bg-black/30 group-hover:bg-black text-white absolute bottom-3 right-3 text-[10px] px-2 py-1 rounded-sm">
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
